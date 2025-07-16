import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StrukturOrganisasiPage() {
  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Struktur Organisasi Desa Tuntungan 1</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <p>
          Struktur organisasi Desa Tuntungan 1 dirancang untuk memastikan tata kelola pemerintahan yang efektif,
          efisien, dan responsif terhadap kebutuhan masyarakat. Setiap bagian memiliki peran dan tanggung jawab yang
          jelas dalam menjalankan roda pemerintahan desa.
        </p>
        <div className="relative w-full h-auto min-h-[300px] rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gray-50 p-4">
          <Image
            src="/placeholder.svg?height=500&width=800" // Ganti dengan gambar struktur organisasi
            alt="Struktur Organisasi Desa Tuntungan 1"
            width={800}
            height={500}
            layout="responsive"
            objectFit="contain"
            className="max-h-[500px]"
          />
        </div>
        <p>
          Struktur ini dipimpin oleh Kepala Desa, dibantu oleh Sekretaris Desa, Kepala Urusan (Kaur), dan Kepala Seksi
          (Kasi) yang membawahi bidang-bidang tertentu. Selain itu, terdapat juga Badan Permusyawaratan Desa (BPD)
          sebagai lembaga legislatif desa yang mengawasi kinerja pemerintah desa.
        </p>
        <p>
          Setiap perangkat desa bekerja sama untuk mencapai visi dan misi desa, melayani masyarakat dengan sepenuh hati,
          dan memastikan setiap program pembangunan berjalan sesuai rencana.
        </p>
      </CardContent>
    </Card>
  )
}
