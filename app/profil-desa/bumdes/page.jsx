import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

export default function BumdesPage() {
  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Badan Usaha Milik Desa (BUMDes)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <p>
          Badan Usaha Milik Desa (BUMDes) &quot;Maju Bersama&quot; Desa Tuntungan 1 adalah pilar ekonomi desa yang
          bertujuan untuk meningkatkan kesejahteraan masyarakat melalui pengelolaan potensi lokal secara profesional dan
          berkelanjutan.
        </p>
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm">
          <Image
            src="/placeholder.svg?height=400&width=600" // Ganti dengan gambar kegiatan BUMDes
            alt="Kegiatan BUMDes Desa Tuntungan 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p>BUMDes &quot;Maju Bersama&quot; memiliki beberapa unit usaha strategis, antara lain:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            **Unit Pertanian Organik:** Mengelola lahan desa untuk produksi sayuran dan buah-buahan organik, serta
            menyediakan pelatihan bagi petani lokal.
          </li>
          <li>
            **Unit Pariwisata Desa:** Mengembangkan potensi wisata alam dan budaya desa, termasuk pengelolaan homestay
            dan paket tur.
          </li>
          <li>
            **Unit Pengelolaan Sampah:** Mengelola sampah rumah tangga menjadi produk bernilai ekonomis seperti pupuk
            kompos dan kerajinan daur ulang.
          </li>
          <li>
            **Unit Jasa Peminjaman Modal:** Memberikan akses permodalan bagi UMKM dan warga desa dengan bunga rendah.
          </li>
        </ul>
        <p>
          Melalui berbagai unit usaha ini, BUMDes tidak hanya menciptakan lapangan kerja, tetapi juga menggerakkan roda
          perekonomian desa, serta memberikan kontribusi nyata terhadap Pendapatan Asli Desa (PAD).
        </p>
        <p>
          Kami mengajak seluruh warga dan pihak terkait untuk mendukung dan berpartisipasi dalam setiap program BUMDes
          &quot;Maju Bersama&quot; demi kemajuan ekonomi Desa Tuntungan 1.
        </p>
        <div className="pt-4">
          <Button asChild className="bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Kunjungi Website BUMDes <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
