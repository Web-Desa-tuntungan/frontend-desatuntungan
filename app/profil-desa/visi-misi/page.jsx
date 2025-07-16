import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircleIcon } from "lucide-react"

export default function VisiMisiPage() {
  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Visi & Misi Desa Tuntungan 1</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 text-gray-700">
        <div>
          <h3 className="text-xl font-semibold text-desa-secondary mb-3">Visi</h3>
          <p className="text-lg leading-relaxed">
            &quot;Mewujudkan Desa Tuntungan 1 yang Mandiri, Sejahtera, Berbudaya, dan Berkelanjutan Berbasis
            Digital.&quot;
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-desa-secondary mb-3">Misi</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <p>
                Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan yang relevan dengan kebutuhan
                desa.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <p>
                Mengembangkan potensi ekonomi lokal melalui pemberdayaan UMKM, pertanian, dan pariwisata berbasis
                digital.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <p>
                Membangun infrastruktur desa yang memadai dan berkelanjutan untuk mendukung aktivitas sosial dan
                ekonomi.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <p>Melestarikan nilai-nilai budaya dan kearifan lokal sebagai identitas desa yang kuat.</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <p>
                Meningkatkan tata kelola pemerintahan desa yang transparan, akuntabel, dan partisipatif dengan
                memanfaatkan teknologi informasi.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <p>Menciptakan lingkungan desa yang bersih, sehat, aman, dan nyaman bagi seluruh warga.</p>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
