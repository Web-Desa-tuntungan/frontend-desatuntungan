# Website Desa Tuntungan 1

Website resmi Desa Tuntungan 1 yang menyediakan informasi dan layanan digital untuk kemajuan dan kesejahteraan warga.

## 🚀 Fitur Utama

- **Profil Desa**: Sejarah, visi misi, struktur organisasi, dan informasi BUMDes
- **Layanan Digital**: Permohonan surat, layanan kependudukan, formulir online
- **Berita & Pengumuman**: Informasi terkini dari desa
- **Dashboard Admin**: Pengelolaan konten dan layanan
- **Responsive Design**: Optimal di semua perangkat

## 🛠️ Teknologi

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Radix UI** - Headless components
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Hapi.js** - Web framework
- **JWT** - Authentication
- **MySQL** - Database

## 📁 Struktur Project

```
├── app/                    # Next.js app directory
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Homepage
│   ├── profil-desa/       # Village profile pages
│   ├── layanan/           # Services pages
│   └── berita/            # News pages
├── components/            # React components
│   ├── ui/                # Shadcn UI components
│   ├── layout/            # Layout components
│   └── hero-section.jsx   # Hero component
├── lib/                   # Utilities
│   ├── auth.js           # Authentication
│   ├── constants.js      # App constants
│   └── utils.js          # Helper functions
├── backend/              # Backend API
│   ├── routes/           # API routes
│   ├── handlers/         # Route handlers
│   └── server.js         # Server setup
└── styles/               # Global styles
```

## 🎨 Kustomisasi

### Warna Tema
Warna utama desa dapat diubah di `tailwind.config.js`:

```javascript
colors: {
  "desa-primary": "#0f766e",    // Hijau Tua
  "desa-secondary": "#38bdf8",  // Biru Langit
  "desa-light-blue": "#e0f2fe", // Biru Muda
  "desa-light-green": "#ecfdf5" // Hijau Muda
}
```
