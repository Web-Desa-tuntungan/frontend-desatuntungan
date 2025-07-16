"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export default function CreateBeritaPage() {
  const { token } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    kategori: ""
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

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
    setImagePreview(null)
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

      await api.postFormData("/tambah/berita", submitData, token)
      toast({
        title: "Berita Berhasil Dibuat",
        description: "Berita baru telah berhasil ditambahkan.",
      })
      router.push("/dashboard/admin/berita")
    } catch (error) {
      toast({
        title: "Gagal Membuat Berita",
        description: error.message || "Terjadi kesalahan saat membuat berita.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-desa-primary">Tambah Berita Baru</h1>
          <p className="text-muted-foreground">Buat berita atau kegiatan baru untuk desa</p>
        </div>
      </div>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Form Berita Baru</CardTitle>
          <CardDescription>
            Isi form di bawah ini untuk menambahkan berita atau kegiatan baru
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
              <Label htmlFor="image">Gambar Berita (Opsional)</Label>
              <div className="space-y-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Format: JPG, PNG, WebP. Maksimal 5MB.
                </p>

                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      ✕
                    </Button>
                  </div>
                )}
              </div>
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
                {loading ? "Menyimpan..." : "Simpan Berita"}
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
