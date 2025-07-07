const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const midtransClient = require('midtrans-client');

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next(); // Lanjutkan jika pengguna sudah login
    } else {
        res.status(401).json({ message: "Tidak terotentikasi" });
    }
}

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

// Login Pelanggan
router.post('/login-pelanggan', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password harus diisi' });
  }

  try {
    const pelanggan = await prisma.pelanggan.findUnique({ where: { email } });

    if (!pelanggan) {
      return res.status(401).json({ error: 'Email tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, pelanggan.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Password salah' });
    }

    // Simpan status login di session
    req.session.pelanggan = {
      id_pelanggan: pelanggan.id_pelanggan,
      email: pelanggan.email,
      nama: pelanggan.nama,
      role: 'pelanggan'
    };

    res.json({
      message: 'Login berhasil',
      data: req.session.pelanggan
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk mengambil info dashboard
// GET request untuk informasi dashboard yang tidak memerlukan body
router.get('/dashboard-infos', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    const user = users.find(u => u.id === userId); // Ambil data lengkap pengguna dari 'database'

    if (user) {
        // Kirim hanya data yang relevan untuk dashboard
        res.json({
            nama: user.nama,
            email: user.email,
            total_pesanan: user.total_pesanan,
            total_cuci: user.total_cuci,
            diskon_akun: user.diskon_akun
        });
    } else {
        res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
});

// Endpoint untuk logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Gagal logout" });
        }
        res.clearCookie('connect.sid'); // Hapus cookie session
        res.json({ message: "Logout berhasil" });
    });
});

// Get all Pelanggan
router.get('/pelanggan', async (req, res) => {
  const pelanggan = await prisma.pelanggan.findMany();
  res.json(pelanggan);
});

router.get("/dashboard-info", async (req, res) => {
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

// Misal pakai Express dan session middleware sudah di-setup sebelumnya
router.get('/diskon', async (req, res) => {
  try {
    const { pelanggan } = req.session;

    if (!pelanggan || !pelanggan.id_pelanggan) {
      return res.status(401).json({ error: 'Unauthorized: pelanggan belum login' });
    }

    const id_pelanggan = pelanggan.id_pelanggan;
    const today = new Date();

    const diskon = await prisma.diskon.findFirst({
      where: {
        id_pelanggan,
        aktif: true,
      },
      orderBy: {
        id_diskon: 'desc'  // ambil diskon dengan id_diskon paling besar dulu (yang paling baru)
      }
    });


    if (!diskon) {
      return res.json({ persen: 0, nama: null });
    }

    res.json(diskon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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

//PaymentGateaway////////////////////////////////////////////////////

let snap = new midtransClient.Snap({
  isProduction: false, // ubah jadi true di production
  serverKey: 'SB-Mid-server-1Bc84-WZEI_Tvq8jH3dC9B1X'
});

router.post('/payment', async (req, res) => {
  const { id_pelanggan, nama, email, orders, useDiscount } = req.body;

  try {
    let total = 0;
    const itemDetails = [];

    for (const order of orders) {
      const menu = await prisma.menu_kafe.findUnique({ where: { id_menu: order.id_menu } });
      const subtotal = menu.harga_menu * order.qty;
      total += subtotal;

      itemDetails.push({
        id: 'menu-' + menu.id_menu,
        price: menu.harga_menu,
        quantity: order.qty,
        name: menu.nama_menu
      });
    }

    let diskonDb = null;
    let diskon = 0;

    if (useDiscount) {
      diskonDb = await prisma.diskon.findFirst({
        where: {
          aktif: true,
          id_pelanggan: id_pelanggan
        }
      });

      if (diskonDb) {
        diskon = diskonDb.persen;
        const potongan = Math.floor(total * (diskon / 100));
        total = total - potongan;

        // Tambahkan item diskon ke itemDetails
        itemDetails.push({
          id: 'diskon',
          price: -potongan, // nilai diskon harus negatif
          quantity: 1,
          name: `Diskon ${diskon}%`
        });
      }
    }

    const pembayaran = await prisma.pembayaran.create({
      data: {
        id_pelanggan,
        id_diskon: useDiscount ? diskonDb?.id_diskon : null,
        metode_pembayaran: 'transfer',
        gross_amount: total,
        payment_type: 'midtrans',
        transaction_status: 'pending',
        transaction_time: new Date()
      }
    });

    // Simpan pesanan ke DB
    const pesananData = orders.map(order => ({
      id_menu: order.id_menu,
      id_pembayaran: pembayaran.id_pembayaran,
      jumlah: order.qty
    }));

    await prisma.pesanan_kafe.createMany({
      data: pesananData
    });

    // Kirim ke Midtrans dengan item_details
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${pembayaran.id_pembayaran}`,
        gross_amount: total
      },
      item_details: itemDetails,
      // customer_details: {
      //   first_name: nama,
      //   email: 'email@gmail.com'
      // }
    };

    const snapResponse = await snap.createTransaction(parameter);
    res.json({ token: snapResponse.token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memproses pembayaran' });
  }
});

router.post('/payment/callback', async (req, res) => {
    const { order_id, transaction_status } = req.body;

    const id_pembayaran = parseInt(order_id.replace('ORDER-', ''));

    await prisma.pembayaran.update({
        where: { id_pembayaran },
        data: {
            transaction_status: transaction_status || 'pending',
            transaction_time: new Date()
        }
    });

    console.log(id_pembayaran);
    console.log(transaction_status);

    res.status(200).send('OK');
});

// --- API for Order History ---
router.get('/order-history', async (req, res) => {
    const { pelanggan } = req.session;
    console.log('GET /order-history request received.');

    if (!pelanggan || !pelanggan.id_pelanggan) {
        console.log('Unauthorized: No pelanggan session found for order history.');
        return res.status(401).json({ error: 'Unauthorized: pelanggan belum login' });
    }

    const id_pelanggan = pelanggan.id_pelanggan;
    console.log('Fetching order history for pelanggan ID:', id_pelanggan);

    try {
        const orderHistory = await prisma.pembayaran.findMany({
            where: {
                id_pelanggan: Number(id_pelanggan),
            },
            orderBy: {
                transaction_time: 'desc', // Sort from newest to oldest
            },
            include: {
                // Include pesanan_kafe and its related menu details
                pesanan_kafe: {
                    select: {
                        jumlah: true,
                        // Select the entire 'menu' object, if it exists
                        menu: true // Change from 'select: { nama_menu: true, harga_menu: true }'
                    }
                },
                // Include antrian_cuci if any
                antrian_cuci: {
                    select: {
                        plat_nomor: true,
                        merek_mobil: true,
                        status: true,
                    }
                },
                // Include diskon if it was applied
                diskon: {
                    select: {
                        persen: true,
                        nama: true,
                    }
                }
            },
        });

        // Format data to be easily consumed by the frontend
        const formattedHistory = orderHistory.map(pembayaran => ({
            pembayaran: {
                id_pembayaran: pembayaran.id_pembayaran,
                gross_amount: pembayaran.gross_amount,
                transaction_status: pembayaran.transaction_status,
                transaction_time: pembayaran.transaction_time,
                metode_pembayaran: pembayaran.metode_pembayaran,
            },
            // Ensure pesanan_kafe items always have a 'menu' property, even if null
            pesanan_kafe: pembayaran.pesanan_kafe.map(pk => ({
                nama_menu: pk.menu ? pk.menu.nama_menu : 'Menu Dihapus', // Provide fallback
                harga_menu: pk.menu ? parseInt(pk.menu.harga_menu) : 0, // Provide fallback
                jumlah: pk.jumlah,
            })),
            antrian_cuci: pembayaran.antrian_cuci.map(ac => ({
                plat_nomor: ac.plat_nomor,
                merek_mobil: ac.merek_mobil,
                status: ac.status,
            })),
            diskon: pembayaran.diskon ? { persen: pembayaran.diskon.persen, nama: pembayaran.diskon.nama } : null,
        }));

        // console.log('Successfully fetched and formatted order history for pelanggan ID:', id_pelanggan, '. Count:', formattedHistory.length);
        res.json(formattedHistory);

    } catch (error) {
        console.log('Error fetching order history for pelanggan ID:', id_pelanggan, error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil riwayat pesanan.' });
    }
});

module.exports = router;
