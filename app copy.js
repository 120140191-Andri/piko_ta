// Install dependencies:
// npm init -y
// npm install express prisma @prisma/client

// Prisma setup:
// npx prisma init
// npx prisma migrate dev --name init

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     next();
// });

// Get all Pelanggan
app.get('/pelanggan', async (req, res) => {
  const pelanggan = await prisma.pelanggan.findMany();
  res.json(pelanggan);
});

// Create a Pelanggan
app.post('/pelanggan', async (req, res) => {
  const { email, password, nama } = req.body;
  if (!email || !password || !nama) {
    return res.status(400).json({ error: 'Semua field (email, password, nama) harus diisi' });
  }
  try {
    const pelanggan = await prisma.pelanggan.create({
      data: { email, password, nama }
    });
    res.json(pelanggan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Pelanggan by ID
app.get('/pelanggan/:id', async (req, res) => {
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
app.put('/pelanggan/:id', async (req, res) => {
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
app.delete('/pelanggan/:id', async (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
