import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export default function JadwalPelayananPage() {
  const schedules = [
    { day: "Senin", time: "08:00 - 15:00 WIB" },
    { day: "Selasa", time: "08:00 - 15:00 WIB" },
    { day: "Rabu", time: "08:00 - 15:00 WIB" },
    { day: "Kamis", time: "08:00 - 15:00 WIB" },
    { day: "Jumat", time: "08:00 - 11:30 WIB" },
    { day: "Sabtu", time: "Tutup" },
    { day: "Minggu", time: "Tutup" },
  ]

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Jadwal Pelayanan Desa</CardTitle>
        <CardDescription>Informasi jam operasional dan lokasi Kantor Desa Tuntungan 1.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <p>
          Kantor Desa Tuntungan 1 siap melayani kebutuhan administrasi dan informasi bagi seluruh warga. Berikut adalah
          jadwal operasional pelayanan kami:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <ClockIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Jam Operasional</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <table className="w-full text-left mt-2">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-1 font-medium">Hari</th>
                    <th className="py-1 font-medium">Jam</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((item, index) => (
                    <tr key={index} className={item.time === "Tutup" ? "text-red-500" : ""}>
                      <td className="py-1">{item.day}</td>
                      <td className="py-1">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <MapPinIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Lokasi Kantor Desa</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm space-y-2">
              <p>
                Kantor Desa Tuntungan 1 berlokasi di:
                <br />
                Jl. Raya Tuntungan No. 1, Desa Tuntungan 1,
                <br />
                Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten],
                <br />
                [Kode Pos]
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" /> Telepon: (061) 12345678
              </p>
              <p>
                Kami sarankan untuk datang pada jam operasional yang telah ditentukan untuk memastikan pelayanan
                optimal.
              </p>
            </CardContent>
          </Card>
        </div>

        <p>
          Untuk pertanyaan di luar jam kerja atau informasi mendesak, Anda dapat menghubungi kontak perangkat desa yang
          tersedia di halaman Kontak.
        </p>
      </CardContent>
    </Card>
  )
}
