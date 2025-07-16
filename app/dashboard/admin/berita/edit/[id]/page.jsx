"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export default function EditBeritaPage() {
  const { token } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    kategori: "",
    gambar: ""
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    const fetchBerita = async () => {
      if (!params.id || !token) return
      
      try {
        const data = await api.get(`/lihat/berita/${params.id}`, token)
        setFormData(data)

        // Set existing image preview if available
        if (data.gambar) {
          setImagePreview(data.gambar)
        }
      } catch (error) {
        toast({
          title: "Gagal Memuat Data",
          description: error.message || "Terjadi kesalahan saat memuat data berita.",
          variant: "destructive",
        })
        router.push("/dashboard/admin/berita")
      } finally {
        setLoadingData(false)
      }
    }

    fetchBerita()
  }, [params.id, token, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      kategori: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validasi file sesuai backend
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Format File Tidak Valid",
          description: "Hanya file JPG, PNG, atau WebP yang diizinkan.",
          variant: "destructive",
        })
        return
      }

      if (file.size > maxSize) {
        toast({
          title: "Ukuran File Terlalu Besar",
          description: "Ukuran gambar maksimal 5MB.",
          variant: "destructive",
        })
        return
      }

      setSelectedImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(formData.gambar || null) // Kembali ke gambar asli jika ada
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.judul || !formData.konten || !formData.kategori) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi.",
        variant: "destructive",
      })
      return
    }

    // Validasi kategori sesuai backend
    if (!['artikel', 'agenda', 'pengumuman'].includes(formData.kategori)) {
      toast({
        title: "Kategori Tidak Valid",
        description: "Kategori harus salah satu dari: artikel, agenda, atau pengumuman.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Create FormData for multipart upload
      const submitData = new FormData()
      submitData.append('judul', formData.judul)
      submitData.append('konten', formData.konten)
      submitData.append('kategori', formData.kategori)

      if (selectedImage) {
        submitData.append('image', selectedImage)
      }

      await api.putFormData(`/edit/berita/${params.id}`, submitData, token)
      toast({
        title: "Berita Berhasil Diperbarui",
        description: "Perubahan berita telah berhasil disimpan.",
      })
      router.push("/dashboard/admin/berita")
    } catch (error) {
      toast({
        title: "Gagal Memperbarui Berita",
        description: error.message || "Terjadi kesalahan saat memperbarui berita.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Memuat data berita...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/admin/berita">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-desa-primary">Edit Berita</h1>
          <p className="text-muted-foreground">Perbarui informasi berita atau kegiatan</p>
        </div>
      </div>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Form Edit Berita</CardTitle>
          <CardDescription>
            Ubah informasi berita sesuai kebutuhan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul Berita *</Label>
              <Input
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                placeholder="Masukkan judul berita"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori *</Label>
              <Select value={formData.kategori} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori berita" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artikel">Artikel</SelectItem>
                  <SelectItem value="agenda">Agenda</SelectItem>
                  <SelectItem value="pengumuman">Pengumuman</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="konten">Konten Berita *</Label>
              <Textarea
                id="konten"
                name="konten"
                value={formData.konten}
                onChange={handleInputChange}
                placeholder="Tulis konten berita di sini..."
                rows={8}
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-desa-primary hover:bg-desa-primary/90"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/admin/berita")}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
