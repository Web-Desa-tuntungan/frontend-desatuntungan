import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkIcon, DownloadIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FormulirOnlinePage() {
  const forms = [
    {
      name: "Formulir Permohonan KTP",
      description: "Formulir untuk pengajuan atau perpanjangan Kartu Tanda Penduduk.",
      downloadLink: "#", // Placeholder link
    },
    {
      name: "Formulir Permohonan KK",
      description: "Formulir untuk pengajuan Kartu Keluarga baru atau perubahan data.",
      downloadLink: "#", // Placeholder link
    },
    {
      name: "Formulir Surat Pengantar",
      description: "Formulir umum untuk berbagai jenis surat pengantar desa.",
      downloadLink: "#", // Placeholder link
    },
    {
      name: "Formulir Pengajuan Bantuan Sosial",
      description: "Formulir untuk mengajukan permohonan bantuan sosial dari desa.",
      downloadLink: "#", // Placeholder link
    },
  ]

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Formulir Online</CardTitle>
        <CardDescription>Unduh berbagai formulir administrasi desa yang dapat diisi secara mandiri.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <p>
          Untuk mempermudah warga dalam mengurus berbagai keperluan administrasi, kami menyediakan beberapa formulir
          yang dapat diunduh dan dicetak secara mandiri. Setelah diisi, formulir dapat diserahkan ke Kantor Desa
          Tuntungan 1 beserta dokumen pendukung yang diperlukan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forms.map((form, index) => (
            <Card key={index} className="rounded-xl shadow-sm p-4 bg-desa-light-green/30 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-desa-primary mb-2 flex items-center gap-2">
                  <LinkIcon className="h-6 w-6" /> {form.name}
                </h3>
                <p className="text-sm text-gray-700">{form.description}</p>
              </div>
              <div className="mt-4">
                <Button asChild className="bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md">
                  <Link href={form.downloadLink} download>
                    <DownloadIcon className="mr-2 h-4 w-4" /> Unduh Formulir
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <p>
          Pastikan Anda mengunduh formulir yang sesuai dengan kebutuhan Anda. Jika ada pertanyaan atau kesulitan, jangan
          ragu untuk menghubungi petugas pelayanan desa.
        </p>
      </CardContent>
    </Card>
  )
}
