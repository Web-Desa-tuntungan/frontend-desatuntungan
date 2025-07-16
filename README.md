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

## 📦 Instalasi

### Prerequisites
- Node.js 18+
- npm atau yarn

### Setup Project

1. **Clone repository**
```bash
git clone <repository-url>
cd my-v0-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Backend**
```bash
cd backend
npm install
```

4. **Environment Variables**
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (backend/.env)
JWT_SECRET=your-jwt-secret
PORT=3001
```

## 🚀 Menjalankan Aplikasi

### Development Mode


**Frontend saja:**
```bash
npm run dev
```


### Production Mode

**Build aplikasi:**
```bash
npm run build
```

**Start production:**
```bash
npm start
```

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

### Navigasi
Menu navigasi dapat diubah di `lib/constants.js`:

```javascript
export const NAV_LINKS = [
  { name: "Beranda", href: "/" },
  // ... tambah menu lainnya
]
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /public/berita` - Daftar berita publik
- `GET /public/berita/{id}` - Detail berita

### Admin Endpoints (Requires Auth)
- `GET /lihat/berita` - Daftar semua berita
- `POST /tambah/berita` - Tambah berita baru
- `PUT /edit/berita/{id}` - Edit berita
- `DELETE /hapus/berita/{id}` - Hapus berita

### Authentication
- `POST /auth/login` - Login admin
- `POST /auth/register` - Register admin

## 🧪 Testing

**Test backend endpoints:**
```bash
node test-backend-endpoints.js
```

**Test berita handler:**
```bash
node test-berita-handler.js
```

## 📝 Scripts

- `npm run dev` - Development frontend
- `npm run dev:backend` - Development backend
- `npm run dev:full` - Development full stack
- `npm run build` - Build production
- `npm run start` - Start production
- `npm run lint` - ESLint check

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Kontak

**Desa Tuntungan 1**
- Website: [Website Desa](https://desa-tuntungan1.com)
- Email: info@desa-tuntungan1.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)