"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { UserIcon, MailIcon, PhoneIcon } from "lucide-react"
import Image from "next/image"

export default function PerangkatDesaPage() {
  const [perangkatDesa, setPerangkatDesa] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPerangkatDesa = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await api.get("/lihat/perangkat-desa")
        setPerangkatDesa(data)
      } catch (err) {
        setError(err.message || "Gagal memuat data perangkat desa.")
        toast({
          title: "Gagal Memuat Data",
          description: err.message || "Terjadi kesalahan saat memuat data perangkat desa.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPerangkatDesa()
  }, [])

  // Group perangkat by jabatan hierarchy
  const groupedPerangkat = perangkatDesa.reduce((acc, perangkat) => {
    const jabatan = perangkat.jabatan.toLowerCase()

    if (jabatan.includes('kepala desa') || jabatan.includes('kades')) {
      acc.kepalaDesa.push(perangkat)
    } else if (jabatan.includes('sekretaris')) {
      acc.sekretaris.push(perangkat)
    } else if (jabatan.includes('kaur') || jabatan.includes('kepala urusan')) {
      acc.kaur.push(perangkat)
    } else if (jabatan.includes('kasi') || jabatan.includes('kepala seksi')) {
      acc.kasi.push(perangkat)
    } else {
      acc.lainnya.push(perangkat)
    }

    return acc
  }, {
    kepalaDesa: [],
    sekretaris: [],
    kaur: [],
    kasi: [],
    lainnya: []
  })

  const PerangkatCard = ({ perangkat, isKepala = false }) => (
    <Card className={`rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${isKepala ? 'border-2 border-desa-primary' : ''}`}>
      <div className="relative">
        {perangkat.foto ? (
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={perangkat.foto}
              alt={perangkat.nama}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-desa-primary/20 to-desa-secondary/20 flex items-center justify-center">
            <UserIcon className="h-20 w-20 text-desa-primary/50" />
          </div>
        )}
        {isKepala && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-desa-primary text-white">
              Kepala Desa
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-desa-primary">{perangkat.nama}</h3>
          <p className="text-lg font-medium text-gray-700">{perangkat.jabatan}</p>
          {perangkat.bio && (
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {perangkat.bio}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-desa-primary mb-4">Perangkat Desa Tuntungan 1</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Berkenalan dengan perangkat desa yang siap melayani masyarakat dengan dedikasi dan profesionalisme
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Memuat data perangkat desa...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-lg text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-desa-primary text-white rounded-md hover:bg-desa-primary/90"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Kepala Desa */}
          {groupedPerangkat.kepalaDesa.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-desa-primary mb-6 text-center">Kepala Desa</h2>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  {groupedPerangkat.kepalaDesa.map((perangkat) => (
                    <PerangkatCard key={perangkat.id} perangkat={perangkat} isKepala={true} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Sekretaris Desa */}
          {groupedPerangkat.sekretaris.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-desa-primary mb-6 text-center">Sekretaris Desa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPerangkat.sekretaris.map((perangkat) => (
                  <PerangkatCard key={perangkat.id} perangkat={perangkat} />
                ))}
              </div>
            </section>
          )}

          {/* Kepala Urusan (Kaur) */}
          {groupedPerangkat.kaur.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-desa-primary mb-6 text-center">Kepala Urusan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPerangkat.kaur.map((perangkat) => (
                  <PerangkatCard key={perangkat.id} perangkat={perangkat} />
                ))}
              </div>
            </section>
          )}

          {/* Kepala Seksi (Kasi) */}
          {groupedPerangkat.kasi.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-desa-primary mb-6 text-center">Kepala Seksi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPerangkat.kasi.map((perangkat) => (
                  <PerangkatCard key={perangkat.id} perangkat={perangkat} />
                ))}
              </div>
            </section>
          )}

          {/* Perangkat Lainnya */}
          {groupedPerangkat.lainnya.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-desa-primary mb-6 text-center">Perangkat Desa Lainnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedPerangkat.lainnya.map((perangkat) => (
                  <PerangkatCard key={perangkat.id} perangkat={perangkat} />
                ))}
              </div>
            </section>
          )}

          {/* Jika tidak ada data */}
          {perangkatDesa.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Data perangkat desa belum tersedia.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Contact Info */}
      <div className="mt-16 bg-gradient-to-r from-desa-primary/10 to-desa-secondary/10 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-desa-primary mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 mb-6">
            Untuk informasi lebih lanjut atau keperluan administrasi, silakan hubungi kantor desa
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <MailIcon className="h-5 w-5 text-desa-primary" />
              <span>desa.tuntungan1@email.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-desa-primary" />
              <span>(021) 1234-5678</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
