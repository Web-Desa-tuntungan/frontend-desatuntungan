export const SITE_NAME = "Desa Tuntungan 1"
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://0.0.0.0:8080"

export const NAV_LINKS = [
  { name: "Beranda", href: "/" },
  {
    name: "Profil Desa",
    href: "/profil-desa",
    subLinks: [
      { name: "Sejarah", href: "/profil-desa/sejarah" },
      { name: "Visi & Misi", href: "/profil-desa/visi-misi" },
      { name: "Struktur Organisasi", href: "/profil-desa/struktur-organisasi" },
      { name: "Perangkat Desa", href: "/profil-desa/perangkat-desa" },
      { name: "BUMDes", href: "/profil-desa/bumdes" },
    ],
  },
  {
    name: "Layanan",
    href: "/layanan",
    subLinks: [
      { name: "Permohonan Surat", href: "/layanan/permohonan-surat" },
      { name: "Layanan Kependudukan", href: "/layanan/kependudukan" },
      { name: "Formulir Online", href: "/layanan/formulir-online" },
      { name: "Jadwal Pelayanan", href: "/layanan/jadwal-pelayanan" },
    ],
  },
  { name: "Berita & Kegiatan", href: "/berita-kegiatan" },
  { name: "Galeri", href: "/galeri" },
  { name: "Kontak", href: "/kontak" },
]

export const SOCIAL_MEDIA_LINKS = [
  { name: "Facebook", href: "#", icon: "facebook" }, // Placeholder for icons
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "YouTube", href: "#", icon: "youtube" },
]

export const QUICK_ACCESS_SERVICES = [
  { name: "Permohonan Surat", href: "/layanan/permohonan-surat", icon: "fileText" },
  { name: "Layanan Kependudukan", href: "/layanan/kependudukan", icon: "users" },
  { name: "Formulir Online", href: "/layanan/formulir-online", icon: "form" },
  { name: "Jadwal Pelayanan", href: "/layanan/jadwal-pelayanan", icon: "calendar" },
]
