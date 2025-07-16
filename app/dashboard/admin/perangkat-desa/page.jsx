"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { UserIcon, PlusCircleIcon, Trash2Icon, EditIcon, UploadIcon } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

export default function AdminPerangkatDesaPage() {
  const { token } = useAuth()
  const [perangkatDesa, setPerangkatDesa] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    bio: "",
    urutan: 0
  })
  const [selectedFoto, setSelectedFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)

  useEffect(() => {
    fetchPerangkatDesa()
  }, [])

  const fetchPerangkatDesa = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.get("/lihat/perangkat-desa", token)
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

  const resetForm = () => {
    setFormData({
      nama: "",
      jabatan: "",
      bio: "",
      urutan: 0
    })
    setSelectedFoto(null)
    setFotoPreview(null)
    setEditingId(null)
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'urutan' ? parseInt(value) || 0 : value
    }))
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validasi file
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
          description: "Ukuran foto maksimal 5MB.",
          variant: "destructive",
        })
        return
      }
      
      setSelectedFoto(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setFotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nama || !formData.jabatan) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Nama dan jabatan wajib diisi.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const submitData = new FormData()
      submitData.append('nama', formData.nama)
      submitData.append('jabatan', formData.jabatan)
      submitData.append('bio', formData.bio)
      submitData.append('urutan', formData.urutan.toString())
      
      if (selectedFoto) {
        submitData.append('foto', selectedFoto)
      }

      if (editingId) {
        await api.putFormData(`/edit/perangkat-desa/${editingId}`, submitData, token)
        toast({
          title: "Data Berhasil Diperbarui",
          description: "Data perangkat desa telah berhasil diperbarui.",
        })
      } else {
        await api.postFormData("/tambah/perangkat-desa", submitData, token)
        toast({
          title: "Data Berhasil Ditambahkan",
          description: "Perangkat desa baru telah berhasil ditambahkan.",
        })
      }
      
      resetForm()
      fetchPerangkatDesa()
    } catch (error) {
      toast({
        title: "Gagal Menyimpan Data",
        description: error.message || "Terjadi kesalahan saat menyimpan data.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (perangkat) => {
    setFormData({
      nama: perangkat.nama,
      jabatan: perangkat.jabatan,
      bio: perangkat.bio || "",
      urutan: perangkat.urutan || 0
    })
    setFotoPreview(perangkat.foto)
    setEditingId(perangkat.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.del(`/hapus/perangkat-desa/${id}`, token)
      toast({
        title: "Data Dihapus",
        description: "Perangkat desa berhasil dihapus.",
      })
      fetchPerangkatDesa()
    } catch (error) {
      toast({
        title: "Gagal Menghapus",
        description: error.message || "Terjadi kesalahan saat menghapus data.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-desa-primary">Kelola Perangkat Desa</h1>
          <p className="text-muted-foreground">Tambah, edit, atau hapus data perangkat desa</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button className="bg-desa-primary hover:bg-desa-primary/90">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Tambah Perangkat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Perangkat Desa" : "Tambah Perangkat Desa"}
              </DialogTitle>
              <DialogDescription>
                {editingId ? "Perbarui data perangkat desa" : "Tambahkan perangkat desa baru"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap *</Label>
                  <Input
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jabatan">Jabatan *</Label>
                  <Input
                    id="jabatan"
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kepala Desa"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urutan">Urutan Tampil</Label>
                <Input
                  id="urutan"
                  name="urutan"
                  type="number"
                  value={formData.urutan}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
                <p className="text-sm text-muted-foreground">
                  Urutan tampil di halaman (semakin kecil semakin atas)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="foto">Foto (Opsional)</Label>
                <Input
                  id="foto"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFotoChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Format: JPG, PNG, WebP. Maksimal 5MB.
                </p>
                
                {fotoPreview && (
                  <div className="mt-4">
                    <img
                      src={fotoPreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografi (Opsional)</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tulis biografi singkat..."
                  rows={4}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-desa-primary hover:bg-desa-primary/90"
                >
                  {submitting ? "Menyimpan..." : editingId ? "Perbarui" : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data List */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Daftar Perangkat Desa</CardTitle>
          <CardDescription>
            Kelola data perangkat desa yang akan ditampilkan di halaman public
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
              <p>Memuat data perangkat desa...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchPerangkatDesa}>Coba Lagi</Button>
            </div>
          ) : perangkatDesa.length === 0 ? (
            <div className="text-center py-8">
              <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Belum ada data perangkat desa.
              </p>
              <Button onClick={() => setShowForm(true)} className="bg-desa-primary hover:bg-desa-primary/90">
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                Tambah Perangkat Pertama
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perangkatDesa.map((perangkat) => (
                <Card key={perangkat.id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    {perangkat.foto ? (
                      <Image
                        src={perangkat.foto}
                        alt={perangkat.nama}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-desa-primary/20 to-desa-secondary/20 flex items-center justify-center">
                        <UserIcon className="h-16 w-16 text-desa-primary/50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(perangkat)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Perangkat Desa</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus {perangkat.nama}? 
                              Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(perangkat.id)}>
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    {perangkat.urutan !== undefined && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary">#{perangkat.urutan}</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-desa-primary">{perangkat.nama}</h3>
                    <p className="text-sm text-gray-600 mb-2">{perangkat.jabatan}</p>
                    {perangkat.bio && (
                      <p className="text-xs text-gray-500 line-clamp-2">{perangkat.bio}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
