import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SejarahPage() {
  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Sejarah Desa Tuntungan 1</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <p>
          Desa Tuntungan 1, sebuah permata tersembunyi di [Nama Kabupaten/Kota], memiliki sejarah panjang yang kaya akan
          cerita dan perjuangan. Berawal dari sebuah pemukiman kecil di tepi [Nama Sungai/Gunung/Hutan], desa ini tumbuh
          dan berkembang seiring waktu, membentuk identitasnya yang unik.
        </p>
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm">
          <Image
            src="/placeholder.svg?height=400&width=600" // Ganti dengan gambar sejarah desa
            alt="Sejarah Desa Tuntungan 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p>
          Nama &quot;Tuntungan 1&quot; sendiri memiliki makna filosofis yang mendalam, mencerminkan harapan dan
          cita-cita para pendiri desa untuk mencapai kemakmuran dan keharmonisan. Sejak didirikan pada tahun [Tahun
          Pendirian], desa ini telah melewati berbagai fase pembangunan, dari era pertanian tradisional hingga kini
          menjadi desa yang mulai merambah ke sektor pariwisata dan ekonomi kreatif.
        </p>
        <p>
          Para sesepuh desa sering bercerita tentang bagaimana semangat gotong royong dan kebersamaan menjadi pondasi
          utama dalam setiap langkah pembangunan. Dari pembangunan jalan desa, irigasi, hingga fasilitas umum, semuanya
          dilakukan dengan swadaya masyarakat. Tradisi ini terus dipertahankan hingga kini, menjadi ciri khas yang
          membanggakan bagi warga Desa Tuntungan 1.
        </p>
        <p>
          Perkembangan teknologi dan informasi juga turut membentuk wajah baru desa. Dengan adanya website ini, Desa
          Tuntungan 1 siap menyongsong masa depan yang lebih cerah, tanpa melupakan akar sejarah dan nilai-nilai luhur
          yang telah diwariskan oleh para leluhur.
        </p>
      </CardContent>
    </Card>
  )
}
