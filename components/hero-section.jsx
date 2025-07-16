import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-b-2xl shadow-lg">
      <Image
        src="/placeholder.svg?height=700&width=1920" // Ganti dengan gambar lanskap desa
        alt="Lanskap Desa Tuntungan 1"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 flex items-end justify-center p-8 text-center">
        <div className="max-w-3xl text-white space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Selamat Datang di Website Resmi Desa Tuntungan 1
          </h1>
          <p className="text-lg md:text-xl">
            Pusat informasi dan layanan digital untuk kemajuan dan kesejahteraan warga Desa Tuntungan 1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              className="bg-desa-secondary hover:bg-desa-secondary/90 text-white text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/layanan">Akses Layanan Digital</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white/20 text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/profil-desa">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
