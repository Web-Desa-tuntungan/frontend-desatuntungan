"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { ImageIcon, VideoIcon, PlusCircleIcon, Trash2Icon, UploadIcon } from "lucide-react"
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
import Image from "next/image"

export default function AdminGaleriPage() {
  const { token } = useAuth()
  const [galeri, setGaleri] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    tipe: "",
    deskripsi: ""
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)

  useEffect(() => {
    fetchGaleri()
  }, [])

  const fetchGaleri = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.get("/lihat/galeri", token)
      setGaleri(data)
    } catch (err) {
      setError(err.message || "Gagal memuat galeri.")
      toast({
        title: "Gagal Memuat Galeri",
        description: err.message || "Terjadi kesalahan saat memuat galeri.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

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
      tipe: value
    }))
    // Reset file when changing type
    setSelectedFile(null)
    setFilePreview(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validasi berdasarkan tipe
      if (formData.tipe === 'foto') {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        const maxSize = 5 * 1024 * 1024 // 5MB
        
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Format File Tidak Valid",
            description: "Hanya file JPG, PNG, atau WebP yang diizinkan untuk foto.",
            variant: "destructive",
          })
          return
        }
        
        if (file.size > maxSize) {
          toast({
            title: "Ukuran File Terlalu Besar",
            description: "Ukuran foto maksimal 5MB.",
            variant: "destructive",
          })
          return
        }
      } else if (formData.tipe === 'video') {
        const allowedTypes = ['video/mp4']
        const maxSize = 20 * 1024 * 1024 // 20MB
        
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Format File Tidak Valid",
            description: "Hanya file MP4 yang diizinkan untuk video.",
            variant: "destructive",
          })
          return
        }
        
        if (file.size > maxSize) {
          toast({
            title: "Ukuran File Terlalu Besar",
            description: "Ukuran video maksimal 20MB.",
            variant: "destructive",
          })
          return
        }
      }
      
      setSelectedFile(file)
      
      // Create preview
      if (formData.tipe === 'foto') {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview(e.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        setFilePreview(URL.createObjectURL(file))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.tipe || !selectedFile) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon pilih tipe dan file yang akan diupload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const submitData = new FormData()
      submitData.append('tipe', formData.tipe)
      submitData.append('file', selectedFile)
      if (formData.deskripsi) {
        submitData.append('deskripsi', formData.deskripsi)
      }

      await api.postFormData("/tambah/galeri", submitData, token)
      
      toast({
        title: "Upload Berhasil",
        description: "Media berhasil ditambahkan ke galeri.",
      })
      
      // Reset form
      setFormData({ tipe: "", deskripsi: "" })
      setSelectedFile(null)
      setFilePreview(null)
      
      // Refresh galeri
      fetchGaleri()
    } catch (error) {
      toast({
        title: "Gagal Upload",
        description: error.message || "Terjadi kesalahan saat upload media.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.del(`/lihat/galeri/${id}`, token)
      toast({
        title: "Media Dihapus",
        description: "Media berhasil dihapus dari galeri.",
      })
      fetchGaleri()
    } catch (error) {
      toast({
        title: "Gagal Menghapus",
        description: error.message || "Terjadi kesalahan saat menghapus media.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-desa-primary">Kelola Galeri</h1>
        <p className="text-muted-foreground">Upload dan kelola foto serta video galeri desa</p>
      </div>

      {/* Upload Form */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-5 w-5" />
            Upload Media Baru
          </CardTitle>
          <CardDescription>
            Upload foto (JPG, PNG, WebP, max 5MB) atau video (MP4, max 20MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tipe">Tipe Media *</Label>
              <Select value={formData.tipe} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe media" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foto">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Foto
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <VideoIcon className="h-4 w-4" />
                      Video
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.tipe && (
              <div className="space-y-2">
                <Label htmlFor="file">
                  File {formData.tipe === 'foto' ? 'Foto' : 'Video'} *
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept={formData.tipe === 'foto' ? 'image/jpeg,image/png,image/webp' : 'video/mp4'}
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  {formData.tipe === 'foto' 
                    ? 'Format: JPG, PNG, WebP. Maksimal 5MB.'
                    : 'Format: MP4. Maksimal 20MB.'
                  }
                </p>
                
                {filePreview && (
                  <div className="mt-4">
                    {formData.tipe === 'foto' ? (
                      <div className="relative inline-block">
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-48 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    ) : (
                      <video
                        src={filePreview}
                        controls
                        className="w-48 h-32 rounded-lg border"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                placeholder="Tambahkan deskripsi untuk media ini..."
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={uploading || !formData.tipe || !selectedFile}
              className="bg-desa-primary hover:bg-desa-primary/90"
            >
              {uploading ? "Mengupload..." : "Upload Media"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Gallery List */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Galeri Media</CardTitle>
          <CardDescription>
            Daftar semua foto dan video yang telah diupload
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
              <p>Memuat galeri...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchGaleri}>Coba Lagi</Button>
            </div>
          ) : galeri.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Belum ada media di galeri.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galeri.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    {item.tipe === 'foto' ? (
                      <Image
                        src={item.url}
                        alt={item.deskripsi || "Foto galeri"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge variant={item.tipe === 'foto' ? 'default' : 'secondary'}>
                        {item.tipe === 'foto' ? (
                          <><ImageIcon className="h-3 w-3 mr-1" /> Foto</>
                        ) : (
                          <><VideoIcon className="h-3 w-3 mr-1" /> Video</>
                        )}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Media</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus media ini? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  {item.deskripsi && (
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.deskripsi}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
