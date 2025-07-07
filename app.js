const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');
const cors = require('cors');

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));

// Tambahkan ini di awal file
app.use(session({
  secret: 'rahasia-super-aman', // bebas, tapi jangan kosong
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false // true kalau kamu pakai HTTPS
  }
}));

// Biar Express bisa akses folder assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router
const dashboardApi = require('./routes/api/api');
const dashboardPage = require('./routes/pages/pages');
const dashboardApiAdm = require('./routes/api-adm/api-adm');
const dashboardPageAdm = require('./routes/pages-adm/pages-adm');

app.use('/api', dashboardApi);         // akses POST /api/dashboard-info
app.use('/', dashboardPage);           // akses GET /dashboard

app.use('/api-adm', dashboardApiAdm);
app.use('/admin', dashboardPageAdm); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server berjalan di http://0.0.0.0:${PORT}`));
