"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { EyeIcon } from "lucide-react"

export default function LayananSayaPage() {
  const { token } = useAuth()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      if (!token) {
        setLoading(false)
        setError("Token autentikasi tidak ditemukan. Silakan login kembali.")
        return
      }
      try {
        const data = await api.get("/layanan/user", token)
        setServices(data)
      } catch (err) {
        setError(err.message || "Gagal memuat daftar layanan Anda.")
        toast({
          title: "Gagal Memuat Layanan",
          description: err.message || "Terjadi kesalahan saat memuat daftar layanan Anda.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [token])

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "diterima":
        return "default"
      case "ditolak":
        return "destructive"
      case "pending":
      default:
        return "secondary"
    }
  }

  const getJenisLayananLabel = (jenis) => {
    switch (jenis) {
      case "surat":
        return "Permohonan Surat"
      case "kependudukan":
        return "Layanan Kependudukan"
      case "formulir":
        return "Formulir Online"
      case "jadwal":
        return "Jadwal Pelayanan"
      default:
        return jenis
    }
  }

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Layanan Saya</CardTitle>
        <CardDescription>Lihat status permohonan layanan yang telah Anda ajukan.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center">Memuat daftar layanan...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : services.length === 0 ? (
          <p className="text-center text-muted-foreground">Anda belum mengajukan permohonan layanan.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jenis Layanan</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Pengajuan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{getJenisLayananLabel(service.jenis)}</TableCell>
                    <TableCell>{service.isi}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(service.status)}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(service.created_at || service.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="rounded-md bg-transparent">
                        <EyeIcon className="h-4 w-4" />
                        <span className="sr-only">Lihat Detail</span>
                      </Button>
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
