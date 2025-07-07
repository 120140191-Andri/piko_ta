const express = require('express');
const router = express.Router();
const path = require('path');

// Route untuk halaman login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/adm/login.html'));
});

// Route untuk halaman antrian cuci adm
router.get('/antrian-cuci', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/adm/antrian-cuci.html'));
});

// Route untuk halaman antrian cuci adm
router.get('/manage-menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/adm/manage-menu.html'));
});

// Route untuk halaman registrasi
router.get('/registrasi', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/user-registrasi.html'));
});

// Middleware validasi login dan role admin
function checkLogin(req, res, next) {
  const user = req.session.admin;

  if (!user) {
    return res.status(401).json({ error: 'Anda harus login terlebih dahulu' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Akses ditolak.' });
  }

  next();
}

// Contoh route yang butuh login
router.get('/dashboard', checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/adm/dash.html'));
  // res.json({ message: `Selamat datang, ${req.session.pelanggan.nama}` });
});

router.get('/pesan-makanan', checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/user-pesan.html'));
  // res.json({ message: `Selamat datang, ${req.session.pelanggan.nama}` });
});

module.exports = router;