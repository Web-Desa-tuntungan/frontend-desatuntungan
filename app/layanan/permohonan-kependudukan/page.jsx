"use client"

import { useState } from "react"
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

export default function PermohonanKependudukanPage() {
  const { token } = useAuth()
  const [jenisLayanan, setJenisLayanan] = useState("")
  const [isi, setIsi] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!token) {
      toast({
        title: "Akses Ditolak",
        description: "Anda harus login terlebih dahulu untuk mengajukan layanan.",
        variant: "destructive",
      })
      return
    }

    if (!jenisLayanan || !isi) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua kolom yang diperlukan.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await api.post("/tambah/layanan", { 
        jenis: "kependudukan", 
        isi: `${jenisLayanan}: ${isi}` 
      }, token)
      
      toast({
        title: "Permohonan Berhasil Dikirim",
        description: "Permohonan layanan kependudukan Anda telah berhasil dikirim dan akan diproses oleh petugas.",
      })
      
      setJenisLayanan("")
      setIsi("")
    } catch (error) {
      toast({
        title: "Gagal Mengirim Permohonan",
        description: error.message || "Terjadi kesalahan saat mengirim permohonan.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link href="/layanan">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Kembali ke Layanan
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-desa-primary mb-2">Permohonan Layanan Kependudukan</h1>
          <p className="text-muted-foreground">
            Ajukan permohonan layanan kependudukan seperti KTP, KK, dan dokumen lainnya.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto rounded-2xl shadow-lg">
          <CardHeader className="bg-gradient-to-r from-desa-primary to-desa-secondary text-white rounded-t-2xl">
            <CardTitle className="text-xl">Form Permohonan Layanan Kependudukan</CardTitle>
            <CardDescription className="text-blue-100">
              Isi form di bawah ini untuk mengajukan layanan kependudukan
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="jenisLayanan">Jenis Layanan Kependudukan</Label>
                <Select value={jenisLayanan} onValueChange={setJenisLayanan} required>
                  <SelectTrigger className="rounded-md">
                    <SelectValue placeholder="Pilih jenis layanan kependudukan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KTP Baru">Pembuatan KTP Baru</SelectItem>
                    <SelectItem value="KTP Hilang">Penggantian KTP Hilang</SelectItem>
                    <SelectItem value="KK Baru">Pembuatan Kartu Keluarga Baru</SelectItem>
                    <SelectItem value="KK Perubahan">Perubahan Data Kartu Keluarga</SelectItem>
                    <SelectItem value="Akta Kelahiran">Pembuatan Akta Kelahiran</SelectItem>
                    <SelectItem value="Akta Kematian">Pembuatan Akta Kematian</SelectItem>
                    <SelectItem value="Surat Pindah">Surat Pindah Penduduk</SelectItem>
                    <SelectItem value="Surat Datang">Surat Pindah Datang</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="isi">Detail Permohonan</Label>
                <Textarea
                  id="isi"
                  placeholder="Jelaskan detail permohonan Anda, dokumen yang diperlukan, dan informasi tambahan lainnya..."
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  rows={6}
                  required
                  className="rounded-md"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-semibold text-blue-800 mb-2">Informasi Penting:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Pastikan data yang diisi sudah benar dan sesuai</li>
                  <li>• Siapkan dokumen pendukung yang diperlukan</li>
                  <li>• Proses verifikasi membutuhkan waktu 1-3 hari kerja</li>
                  <li>• Anda akan dihubungi jika ada dokumen yang kurang</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-desa-primary hover:bg-desa-primary/90 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Mengirim..." : "Kirim Permohonan"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 max-w-2xl mx-auto">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Dokumen yang Biasanya Diperlukan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Untuk KTP:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Kartu Keluarga asli</li>
                    <li>• Akta Kelahiran</li>
                    <li>• Surat Nikah (jika sudah menikah)</li>
                    <li>• Pas foto 3x4 (2 lembar)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Untuk Kartu Keluarga:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• KTP semua anggota keluarga</li>
                    <li>• Akta Kelahiran anak</li>
                    <li>• Surat Nikah</li>
                    <li>• Surat Keterangan Pindah (jika ada)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
