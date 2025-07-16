"use client"

import Link from "next/link"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function PermohonanSuratPage() {
  const { isAuthenticated, token } = useAuth()
  const router = useRouter()
  const [jenisSurat, setJenisSurat] = useState("")
  const [isi, setIsi] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast({
        title: "Login Diperlukan",
        description: "Anda harus login untuk mengajukan permohonan surat.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    if (!jenisSurat || !isi) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua kolom yang diperlukan.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await api.post("/tambah/layanan", { jenis: "surat", isi: `${jenisSurat}: ${isi}` }, token)
      toast({
        title: "Permohonan Berhasil Diajukan",
        description: "Permohonan surat Anda telah berhasil diajukan. Silakan cek status di dashboard Anda.",
      })
      setJenisSurat("")
      setIsi("")
    } catch (err) {
      toast({
        title: "Gagal Mengajukan Permohonan",
        description: err.message || "Terjadi kesalahan saat mengajukan permohonan.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Permohonan Surat Online</CardTitle>
        <CardDescription>Ajukan berbagai jenis surat keterangan dan permohonan lainnya secara online.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="jenisSurat">Jenis Surat yang Diajukan</Label>
            <Select value={jenisSurat} onValueChange={setJenisSurat}>
              <SelectTrigger className="rounded-md">
                <SelectValue placeholder="Pilih Jenis Surat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Surat Pengantar">Surat Pengantar</SelectItem>
                <SelectItem value="Surat Keterangan Usaha">Surat Keterangan Usaha</SelectItem>
                <SelectItem value="Surat Keterangan Domisili">Surat Keterangan Domisili</SelectItem>
                <SelectItem value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</SelectItem>
                <SelectItem value="Surat Keterangan Kematian">Surat Keterangan Kematian</SelectItem>
                <SelectItem value="Lainnya">Lainnya (Sebutkan di Keterangan)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isi">Keterangan / Keperluan</Label>
            <Textarea
              id="isi"
              placeholder="Contoh: Untuk keperluan melamar pekerjaan di PT. ABC"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              rows={5}
              required
              className="rounded-md"
            />
          </div>
          <Button
            type="submit"
            className="bg-desa-primary hover:bg-desa-primary/90 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Mengajukan..." : "Ajukan Permohonan"}
          </Button>
        </form>
        {!isAuthenticated && (
          <p className="mt-4 text-center text-sm text-gray-600">
            Anda harus{" "}
            <Link href="/auth/login" className="font-semibold text-desa-secondary hover:underline">
              login
            </Link>{" "}
            untuk mengajukan permohonan.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
