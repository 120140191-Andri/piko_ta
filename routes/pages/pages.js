const express = require('express');
const router = express.Router();
const path = require('path');

// Route untuk halaman login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/user-login.html'));
});

// Route untuk halaman registrasi
router.get('/registrasi', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/user-registrasi.html'));
});

// Middleware validasi login dan role pelanggan
function checkLogin(req, res, next) {
  const user = req.session.pelanggan;

  if (!user) {
    return res.status(401).json({ error: 'Anda harus login terlebih dahulu' });
  }

  if (user.role !== 'pelanggan') {
    return res.status(403).json({ error: 'Akses ditolak.' });
  }

  next();
}

// Contoh route yang butuh login
router.get('/dashboard', checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/user-dashboard.html'));
  // res.json({ message: `Selamat datang, ${req.session.pelanggan.nama}` });
});

router.get('/pesan-makanan', checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/user-pesan.html'));
  // res.json({ message: `Selamat datang, ${req.session.pelanggan.nama}` });
});

router.get('/riwayat-pesan', checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/user-riwayat-pesan.html'));
  // res.json({ message: `Selamat datang, ${req.session.pelanggan.nama}` });
});

module.exports = router;