"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { ArrowLeftIcon, EditIcon, Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const KATEGORI_LABELS = {
  artikel: "Artikel",
  agenda: "Agenda", 
  pengumuman: "Pengumuman"
}

const KATEGORI_COLORS = {
  artikel: "bg-blue-100 text-blue-800",
  agenda: "bg-green-100 text-green-800",
  pengumuman: "bg-orange-100 text-orange-800"
}

export default function BeritaByKategoriPage() {
  const { token } = useAuth()
  const params = useParams()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const kategori = params.kategori
  const kategoriLabel = KATEGORI_LABELS[kategori] || kategori

  const fetchNewsByKategori = async () => {
    if (!token) {
      setLoading(false)
      setError("Token autentikasi tidak ditemukan. Silakan login kembali.")
      return
    }

    // Validasi kategori
    if (!['artikel', 'agenda', 'pengumuman'].includes(kategori)) {
      setError("Kategori tidak valid")
      setLoading(false)
      return
    }

    try {
      const data = await api.get(`/berita/kategori/${kategori}`, token)
      setNews(data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching news by kategori:", err)
      if (process.env.NODE_ENV === 'development' && err.message.includes('Network error')) {
        // Mock data untuk development
        const mockData = [
          {
            id: 1,
            judul: `Contoh ${kategoriLabel} 1`,
            konten: `Ini adalah contoh konten ${kategoriLabel.toLowerCase()} untuk testing.`,
            kategori: kategori,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            judul: `Contoh ${kategoriLabel} 2`,
            konten: `Ini adalah contoh konten ${kategoriLabel.toLowerCase()} kedua untuk testing.`,
            kategori: kategori,
            created_at: new Date(Date.now() - 86400000).toISOString()
          }
        ]
        setNews(mockData)
        setError(null)
      } else {
        setError(err.message || "Gagal memuat daftar berita.")
        toast({
          title: "Gagal Memuat Berita",
          description: err.message || "Terjadi kesalahan saat memuat daftar berita.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!token) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk menghapus berita.",
        variant: "destructive",
      })
      return
    }
    try {
      await api.del(`/hapus/berita/${id}`, token)
      setNews(prevNews => prevNews.filter((item) => item.id !== id))
      toast({
        title: "Berita Berhasil Dihapus",
        description: "Berita telah berhasil dihapus dari daftar.",
      })
    } catch (err) {
      console.error("Error deleting news:", err)
      if (process.env.NODE_ENV === 'development' && err.message.includes('Network error')) {
        setNews(prevNews => prevNews.filter((item) => item.id !== id))
        toast({
          title: "Berita Berhasil Dihapus",
          description: "Berita telah berhasil dihapus dari daftar (mode development).",
        })
      } else {
        toast({
          title: "Gagal Menghapus Berita",
          description: err.message || "Terjadi kesalahan saat menghapus berita.",
          variant: "destructive",
        })
      }
    }
  }

  useEffect(() => {
    fetchNewsByKategori()
  }, [token, kategori])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Memuat berita...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/admin/berita">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-desa-primary">
              Berita Kategori: {kategoriLabel}
            </h1>
            <p className="text-muted-foreground">
              Daftar berita dengan kategori {kategoriLabel.toLowerCase()}
            </p>
          </div>
        </div>
        <Button asChild className="bg-desa-primary hover:bg-desa-primary/90">
          <Link href="/dashboard/admin/berita/create">
            Tambah Berita
          </Link>
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Daftar Berita - {kategoriLabel}</CardTitle>
          <CardDescription>
            Kelola berita dan kegiatan desa dengan kategori {kategoriLabel.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {news.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Belum ada berita dengan kategori {kategoriLabel.toLowerCase()}.
              </p>
              <Button asChild className="mt-4 bg-desa-primary hover:bg-desa-primary/90">
                <Link href="/dashboard/admin/berita/create">
                  Tambah Berita Pertama
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{item.judul}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.konten?.substring(0, 100)}...
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={KATEGORI_COLORS[item.kategori] || "bg-gray-100 text-gray-800"}>
                        {KATEGORI_LABELS[item.kategori] || item.kategori}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at || item.createdAt).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/dashboard/admin/berita/edit/${item.id}`}>
                            <EditIcon className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Berita</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus berita "{item.judul}"? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
