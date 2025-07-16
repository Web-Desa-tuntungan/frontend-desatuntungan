"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NewsCard from "@/components/news-card"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BeritaKegiatanPage() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all") // 'all', 'artikel', 'agenda', 'pengumuman'

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      try {
        let path = "/public/berita"
        if (categoryFilter !== "all") {
          path = `/public/berita/kategori/${categoryFilter}`
        }
        const data = await api.get(path)
        setNews(data)
      } catch (err) {
        setError(err.message || "Gagal memuat berita dan kegiatan.")
        toast({
          title: "Gagal Memuat Data",
          description: err.message || "Terjadi kesalahan saat memuat berita dan kegiatan.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [categoryFilter])

  const filteredNews = news.filter(
    (item) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.konten.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-desa-primary mb-8 text-center">Berita & Kegiatan Desa</h1>

      <Card className="rounded-2xl shadow-md p-6 mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-desa-primary">Filter Berita</CardTitle>
          <CardDescription>Cari berita berdasarkan judul atau filter berdasarkan kategori.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Cari berita berdasarkan judul atau isi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="rounded-md">
              <SelectValue placeholder="Filter Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="artikel">Artikel Desa</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
              <SelectItem value="pengumuman">Pengumuman</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-center text-lg text-muted-foreground">Memuat berita dan kegiatan...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : filteredNews.length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">Tidak ada berita atau kegiatan yang ditemukan.</p>
      ) : (
        <div className="grid gap-6">
          {filteredNews.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </div>
      )}
    </div>
  )
}
