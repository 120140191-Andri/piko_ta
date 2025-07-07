const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();

// Registrasi Pelanggan
router.post('/registrasi-pelanggan', async (req, res) => {
  const { email, password, nama } = req.body;
  if (!email || !password || !nama) {
    return res.status(400).json({ error: 'Semua field (email, password, nama) harus diisi' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const pelanggan = await prisma.pelanggan.create({
      data: { email, password: hashedPassword, nama }
    });
    res.json(pelanggan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Admin
router.post('/login-admin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password harus diisi' });
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Email tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password salah' });
    }

    // Simpan status login di session
    req.session.admin = {
      id_admin: admin.id_admin,
      email: admin.email,
      nama: admin.nama,
      role: 'admin'
    };

    res.json({
      message: 'Login berhasil',
      data: req.session.admin
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET semua data antrian cuci
router.get('/antrian-cuci', async (req, res) => {
  try {
    const data = await prisma.antrian_cuci.findMany({
    select: {
      id_antrian: false,
      no_antrian: true,
      plat_nomor: true,
      merek_mobil: true,
      status: true,
      tgl_waktu: true,
    },
    orderBy: {
      tgl_waktu: 'desc'
    }
  });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data antrian' });
  }
});

// Konfigurasi multer untuk menyimpan file dengan ekstensi asli
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // pastikan folder ini ada
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// API endpoint untuk menambah menu
router.post('/menu-kafe', upload.single('foto_menu'), async (req, res) => {
  const { nama_menu, harga_menu } = req.body;
  const fotoMenu = req.file;

  if (!nama_menu || !harga_menu || !fotoMenu) {
    return res.status(400).json({ error: 'Nama menu, harga menu, dan foto menu harus diisi' });
  }

  try {
    // Menyimpan data menu ke database
    const newMenu = await prisma.menu_kafe.create({
      data: {
        nama_menu: nama_menu,
        harga_menu: harga_menu,
        foto_menu: fotoMenu.filename, // Simpan nama file gambar di database
      },
    });

    res.status(201).json(newMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// GET menu-kafe
router.get('/menu-kafe', async (req, res) => {
  try {
    const data = await prisma.menu_kafe.findMany({
      orderBy: { id_menu: 'asc' },
      select: {
        id_menu: true,
        nama_menu: true,
        harga_menu: true,
        foto_menu: true
      }
    });
    res.json(data);
  } catch (err) {
    console.error('Gagal mengambil data menu:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data menu.' });
  }
});

// DELETE /menu-kafe/:id
router.delete('/menu-kafe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menu_kafe.delete({
      where: { id_menu: Number(id) }
    });
    res.status(200).json({ message: 'Menu berhasil dihapus' });
  } catch (err) {
    console.error('Gagal menghapus menu:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus menu' });
  }
});


// Get all Pelanggan
router.get('/pelanggan', async (req, res) => {
  const pelanggan = await prisma.pelanggan.findMany();
  res.json(pelanggan);
});

router.post("/dashboard-info", async (req, res) => {
  const { pelanggan } = req.session;

  if (!pelanggan || !pelanggan.id_pelanggan) {
    return res.status(401).json({ error: 'Unauthorized: pelanggan belum login' });
  }

  const id_pelanggan = pelanggan.id_pelanggan;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  try {
    const user = await prisma.pelanggan.findUnique({
      where: { id_pelanggan: Number(id_pelanggan) },
      select: { nama: true, email: true },
    });

    if (!user) return res.status(404).json({ error: "Pelanggan tidak ditemukan." });

    const pembayaranIds = await prisma.pembayaran.findMany({
      where: {
        id_pelanggan: Number(id_pelanggan),
        transaction_time: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: { id_pembayaran: true }
    });

    const ids = pembayaranIds.map(p => p.id_pembayaran);
    if (ids.length === 0) {
      return res.json({ ...user, total_pesanan: 0, total_cuci: 0 });
    }

    const pesananKafe = await prisma.pesanan_kafe.aggregate({
      _sum: { jumlah: true },
      where: { id_pembayaran: { in: ids } }
    });

    const jumlahCuci = await prisma.antrian_cuci.count({
      where: {
        id_pembayaran: { in: ids },
        tgl_waktu: { gte: startOfMonth, lte: endOfMonth }
      }
    });

    res.json({
      ...user,
      total_pesanan: pesananKafe._sum.jumlah || 0,
      total_cuci: jumlahCuci
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});

// Get Pelanggan by ID
router.get('/pelanggan/:id', async (req, res) => {
  const { id } = req.params;
  const pelanggan = await prisma.pelanggan.findUnique({
    where: { id_pelanggan: Number(id) }
  });
  if (pelanggan) {
    res.json(pelanggan);
  } else {
    res.status(404).json({ message: 'Pelanggan not found' });
  }
});
  
// Update Pelanggan
router.put('/pelanggan/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, nama } = req.body;
  try {
    const pelanggan = await prisma.pelanggan.update({
      where: { id_pelanggan: Number(id) },
      data: { email, password, nama }
    });
    res.json(pelanggan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
  
// Delete Pelanggan
router.delete('/pelanggan/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pelanggan.delete({
      where: { id_pelanggan: Number(id) }
    });
    res.json({ message: 'Pelanggan deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
