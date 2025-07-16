import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersIcon, FileTextIcon, HomeIcon, CalendarIcon } from "lucide-react"

export default function LayananKependudukanPage() {
  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Layanan Kependudukan</CardTitle>
        <CardDescription>Informasi dan prosedur terkait layanan administrasi kependudukan.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 text-gray-700">
        <p>
          Pemerintah Desa Tuntungan 1 berkomitmen untuk memberikan pelayanan administrasi kependudukan yang cepat,
          mudah, dan akurat bagi seluruh warga. Berikut adalah beberapa layanan kependudukan yang tersedia:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <UsersIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Pembuatan Kartu Keluarga (KK)</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Prosedur dan persyaratan untuk pembuatan Kartu Keluarga baru, perubahan data, atau pecah KK.</p>
              <ul className="list-disc list-inside mt-2 pl-4">
                <li>Fotokopi KTP</li>
                <li>Surat Nikah/Akta Nikah</li>
                <li>Surat Pindah (jika dari luar desa)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <FileTextIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">
                Pembuatan Akta Kelahiran/Kematian
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Panduan lengkap untuk mengurus Akta Kelahiran bagi bayi baru lahir atau Akta Kematian.</p>
              <ul className="list-disc list-inside mt-2 pl-4">
                <li>Surat Keterangan Lahir/Meninggal dari bidan/rumah sakit</li>
                <li>Fotokopi KK & KTP orang tua/pelapor</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <HomeIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Surat Pindah Datang/Keluar</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Prosedur pengurusan surat pindah datang ke Desa Tuntungan 1 atau pindah keluar desa.</p>
              <ul className="list-disc list-inside mt-2 pl-4">
                <li>Surat Pengantar RT/RW</li>
                <li>Fotokopi KK & KTP</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <CalendarIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Perubahan Data Kependudukan</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Mengurus perubahan data pada dokumen kependudukan seperti nama, alamat, status, dll.</p>
              <ul className="list-disc list-inside mt-2 pl-4">
                <li>Dokumen pendukung perubahan (misal: Akta Nikah, Putusan Pengadilan)</li>
                <li>Fotokopi KK & KTP</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <p>
          Untuk informasi lebih lanjut mengenai persyaratan dan prosedur, silakan datang langsung ke Kantor Desa
          Tuntungan 1 pada jam kerja atau hubungi kontak kami.
        </p>
      </CardContent>
    </Card>
  )
}
