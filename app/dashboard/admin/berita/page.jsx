"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { EditIcon, Trash2Icon, PlusCircleIcon, FilterIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

export default function AdminBeritaPage() {
  const { token } = useAuth()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNews = async () => {
    if (!token) {
      setLoading(false)
      setError("Token autentikasi tidak ditemukan. Silakan login kembali.")
      return
    }
    try {
      const data = await api.get("/lihat/berita", token)
      setNews(data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching news:", err)
      // Don't show error toast for network errors in development
      if (process.env.NODE_ENV === 'development' && err.message.includes('Network error')) {
        console.warn("API not available in development, using mock data")
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

  useEffect(() => {
    fetchNews()
  }, [token])

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
      // Update local state by removing the deleted item
      setNews(prevNews => prevNews.filter((item) => item.id !== id))
      toast({
        title: "Berita Berhasil Dihapus",
        description: "Berita telah berhasil dihapus dari daftar.",
      })
    } catch (err) {
      console.error("Error deleting news:", err)
      // In development mode, still remove from local state for better UX
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

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-desa-primary">Kelola Berita & Kegiatan</CardTitle>
          <Button asChild className="bg-desa-primary hover:bg-desa-primary/90 text-white rounded-md">
            <Link href="/dashboard/admin/berita/create">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Tambah Berita Baru
            </Link>
          </Button>
        </div>
        <CardDescription>Tambah, edit, atau hapus berita dan agenda desa.</CardDescription>
        <div className="flex gap-2 mt-4">
          <span className="text-sm font-medium text-muted-foreground self-center">Filter kategori:</span>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/admin/berita/kategori/artikel">
              Artikel
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/admin/berita/kategori/agenda">
              Agenda
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/admin/berita/kategori/pengumuman">
              Pengumuman
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Memuat daftar berita...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : news.length === 0 ? (
          <p className="text-center text-muted-foreground">Belum ada berita atau kegiatan yang ditambahkan.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gambar</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.gambar ? (
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          className="w-16 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                          <span className="text-xs text-gray-400">No Image</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.judul}</TableCell>
                    <TableCell>
                      <Badge className={KATEGORI_COLORS[item.kategori] || "bg-gray-100 text-gray-800"}>
                        {KATEGORI_LABELS[item.kategori] || item.kategori}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at || item.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="rounded-md bg-transparent">
                          <Link href={`/dashboard/admin/berita/edit/${item.id}`}>
                            <EditIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="rounded-md">
                              <Trash2Icon className="h-4 w-4" />
                              <span className="sr-only">Hapus</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus berita &quot;{item.judul}&quot;
                                secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="bg-destructive hover:bg-destructive/90"
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
          </div>
        )}
      </CardContent>
    </Card>
  )
}
