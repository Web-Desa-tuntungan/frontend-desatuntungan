"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { PlayCircleIcon, ImageIcon } from "lucide-react"

export default function GaleriPage() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterType, setFilterType] = useState("all") // 'all', 'foto', 'video'
  const [selectedMedia, setSelectedMedia] = useState(null)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await api.get("/lihat/galeri")
        setGalleryItems(data)
      } catch (err) {
        setError(err.message || "Gagal memuat item galeri.")
        toast({
          title: "Gagal Memuat Galeri",
          description: err.message || "Terjadi kesalahan saat memuat item galeri.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const filteredItems = galleryItems.filter((item) => {
    if (filterType === "all") return true
    return item.tipe === filterType
  })

  const openModal = (item) => {
    setSelectedMedia(item)
  }

  const closeModal = () => {
    setSelectedMedia(null)
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-desa-primary mb-8 text-center">Galeri Desa Tuntungan 1</h1>

      <Card className="rounded-2xl shadow-md p-6 mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-desa-primary">Filter Galeri</CardTitle>
          <CardDescription>Tampilkan foto atau video.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => setFilterType("all")}
            className={`rounded-md ${filterType === "all" ? "bg-desa-primary text-white hover:bg-desa-primary/90" : "border-desa-primary text-desa-primary hover:bg-desa-light-green"}`}
          >
            Semua
          </Button>
          <Button
            variant={filterType === "foto" ? "default" : "outline"}
            onClick={() => setFilterType("foto")}
            className={`rounded-md ${filterType === "foto" ? "bg-desa-primary text-white hover:bg-desa-primary/90" : "border-desa-primary text-desa-primary hover:bg-desa-light-green"}`}
          >
            <ImageIcon className="mr-2 h-4 w-4" /> Foto
          </Button>
          <Button
            variant={filterType === "video" ? "default" : "outline"}
            onClick={() => setFilterType("video")}
            className={`rounded-md ${filterType === "video" ? "bg-desa-primary text-white hover:bg-desa-primary/90" : "border-desa-primary text-desa-primary hover:bg-desa-light-green"}`}
          >
            <PlayCircleIcon className="mr-2 h-4 w-4" /> Video
          </Button>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-center text-lg text-muted-foreground">Memuat galeri...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">
          Tidak ada item galeri yang ditemukan untuk filter ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl shadow-md overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => openModal(item)}
            >
              <CardContent className="p-0">
                {item.tipe === "foto" ? (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.deskripsi || "Foto galeri"}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-48 bg-black flex items-center justify-center">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                      aria-label={item.deskripsi}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircleIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}
                {item.deskripsi && (
                  <div className="p-4">
                    <p className="text-sm text-foreground line-clamp-2">{item.deskripsi}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal untuk preview media */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              onClick={closeModal}
            >
              ✕
            </Button>

            {selectedMedia.tipe === 'foto' ? (
              <div className="relative w-full h-full">
                <Image
                  src={selectedMedia.url}
                  alt={selectedMedia.deskripsi || "Foto galeri"}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            ) : (
              <video
                src={selectedMedia.url}
                controls
                className="w-full h-auto max-h-[80vh] rounded-lg"
                autoPlay
              />
            )}

            {selectedMedia.deskripsi && (
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-gray-700">{selectedMedia.deskripsi}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Ditambahkan: {new Date(selectedMedia.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
