// File: routes/berita.js
// Routes untuk berita yang sesuai dengan handler Anda

import {
  createBerita,
  getAllBerita,
  getBeritaById,
  getBeritaByKategori,
  updateBerita,
  deleteBerita
} from '../handlers/berita.js';

import { authenticate, authorize } from '../middlewares/auth.js';

export default [
  // GET /lihat/berita - Mendapatkan semua berita (Admin only)
  {
    method: 'GET',
    path: '/lihat/berita',
    options: {
      pre: [authenticate, authorize(['admin'])],
      handler: getAllBerita
    }
  },

  // GET /lihat/berita/{id} - Mendapatkan berita berdasarkan ID (Admin only)
  {
    method: 'GET',
    path: '/lihat/berita/{id}',
    options: {
      pre: [authenticate, authorize(['admin'])],
      handler: getBeritaById
    }
  },

  // POST /tambah/berita - Membuat berita baru (Admin only)
  {
    method: 'POST',
    path: '/tambah/berita',
    options: {
      pre: [authenticate, authorize(['admin'])],
      handler: createBerita
    }
  },

  // PUT /edit/berita/{id} - Update berita (Admin only)
  {
    method: 'PUT',
    path: '/edit/berita/{id}',
    options: {
      pre: [authenticate, authorize(['admin'])],
      handler: updateBerita
    }
  },

  // DELETE /hapus/berita/{id} - Hapus berita (Admin only)
  {
    method: 'DELETE',
    path: '/hapus/berita/{id}',
    options: {
      pre: [authenticate, authorize(['admin'])],
      handler: deleteBerita
    }
  },

  // GET /berita/kategori/{kategori} - Berita berdasarkan kategori (Public atau Admin)
  {
    method: 'GET',
    path: '/berita/kategori/{kategori}',
    options: {
      // Bisa diakses tanpa auth untuk public, atau dengan auth untuk admin
      // Uncomment baris berikut jika ingin require auth:
      // pre: [authenticate],
      handler: getBeritaByKategori
    }
  },

  // GET /berita - Endpoint public untuk frontend public (tanpa auth)
  {
    method: 'GET',
    path: '/berita',
    options: {
      handler: getAllBerita // Tanpa auth untuk akses public
    }
  },

  // GET /berita/{id} - Endpoint public untuk detail berita (tanpa auth)
  {
    method: 'GET',
    path: '/berita/{id}',
    options: {
      handler: getBeritaById // Tanpa auth untuk akses public
    }
  }
];

// Catatan:
// - Endpoint /lihat/* untuk admin dashboard (require auth)
// - Endpoint /berita/* untuk public access (tanpa auth)
// - Endpoint /tambah, /edit, /hapus hanya untuk admin
// - Validasi kategori sudah ada di handler: ['artikel', 'agenda', 'pengumuman']
