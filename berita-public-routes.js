// File: routes/berita-public.js
// Routes PUBLIC untuk berita (tanpa authentication)

import {
  getAllBerita,
  getBeritaById,
  getBeritaByKategori
} from '../handlers/berita.js';

export default [
  // GET /berita - Endpoint public untuk list semua berita (tanpa auth)
  {
    method: 'GET',
    path: '/berita',
    options: {
      cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
        credentials: true
      },
      handler: getAllBerita // Tanpa auth untuk akses public
    }
  },

  // GET /berita/{id} - Endpoint public untuk detail berita (tanpa auth)
  {
    method: 'GET',
    path: '/berita/{id}',
    options: {
      cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
        credentials: true
      },
      handler: getBeritaById // Tanpa auth untuk akses public
    }
  },

  // GET /berita/kategori/{kategori} - Berita berdasarkan kategori (public)
  {
    method: 'GET',
    path: '/berita/kategori/{kategori}',
    options: {
      cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
        credentials: true
      },
      handler: getBeritaByKategori // Tanpa auth untuk akses public
    }
  }
];

// Catatan:
// - Endpoint ini untuk akses PUBLIC (tanpa authentication)
// - Menggunakan handler yang sama dengan admin, tapi tanpa middleware auth
// - CORS dikonfigurasi untuk frontend development
// - Endpoint /lihat/* tetap untuk admin (dengan auth)
// - Endpoint /berita/* untuk public (tanpa auth)
