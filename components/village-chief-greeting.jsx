import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VillageChiefGreeting() {
  return (
    <section className="py-12 md:py-20 bg-desa-light-green">
      <div className="container mx-auto px-4 md:px-8">
        <Card className="rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center bg-white">
          <div className="md:w-1/3 w-full h-64 md:h-auto relative">
            <Image
              src="/placeholder.svg?height=400&width=300" // Ganti dengan foto Kepala Desa
              alt="Foto Kepala Desa"
              layout="fill"
              objectFit="cover"
              className="rounded-l-2xl"
            />
          </div>
          <div className="md:w-2/3 w-full p-6 md:p-10 space-y-4">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-3xl font-bold text-desa-primary">Sambutan Kepala Desa Tuntungan 1</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-gray-700">
              <p>Assalamu&apos;alaikum Warahmatullahi Wabarakatuh.</p>
              <p>
                Dengan rasa syukur kehadirat Allah SWT, kami menyambut Anda di website resmi Desa Tuntungan 1. Website
                ini adalah wujud komitmen kami dalam menyediakan informasi yang transparan, akuntabel, dan mudah diakses
                oleh seluruh masyarakat.
              </p>
              <p>
                Melalui platform ini, kami berharap dapat meningkatkan partisipasi aktif warga dalam pembangunan desa,
                serta mempermudah akses terhadap berbagai layanan administrasi dan informasi penting. Mari bersama-sama
                kita bangun Desa Tuntungan 1 yang lebih maju, sejahtera, dan berdaya saing.
              </p>
              <p className="font-semibold text-desa-primary">
                Hormat kami,
                <br />
                [Nama Kepala Desa]
                <br />
                Kepala Desa Tuntungan 1
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
