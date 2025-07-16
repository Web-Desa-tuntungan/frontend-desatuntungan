"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { api } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, CheckIcon, XIcon } from "lucide-react"

const JENIS_LAYANAN_LABELS = {
  surat: "Permohonan Surat",
  kependudukan: "Layanan Kependudukan", 
  formulir: "Formulir Online",
  jadwal: "Jadwal Pelayanan"
}

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  diterima: "bg-green-100 text-green-800",
  ditolak: "bg-red-100 text-red-800"
}

export default function AdminLayananPage() {
  const { token, user, isAdmin } = useAuth()
  const [layanan, setLayanan] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState({})

  const fetchLayanan = async () => {
    if (!token) {
      setLoading(false)
      setError("Token autentikasi tidak ditemukan. Silakan login kembali.")
      return
    }

    if (!isAdmin) {
      setLoading(false)
      setError("Anda tidak memiliki akses admin. Silakan login sebagai admin.")
      return
    }

    console.log("🔍 Fetching layanan with token:", token?.substring(0, 20) + "...")
    console.log("👤 User role:", user?.role)
    try {
      const data = await api.get("/lihat/layanan", token)
      setLayanan(data || [])
      setError(null)
    } catch (err) {
      console.error("❌ Error fetching layanan:", err)

      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        setError("Token tidak valid atau sudah expired. Silakan logout dan login kembali sebagai admin.")
        toast({
          title: "Token Expired",
          description: "Silakan logout dan login kembali sebagai admin.",
          variant: "destructive",
        })
      } else if (process.env.NODE_ENV === 'development' && err.message.includes('Network error')) {
        console.warn("API not available, using mock data")
        setError(null)
      } else {
        setError(err.message || "Gagal memuat daftar layanan.")
        toast({
          title: "Gagal Memuat Layanan",
          description: err.message || "Terjadi kesalahan saat memuat daftar layanan.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    if (!token) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk mengubah status layanan.",
        variant: "destructive",
      })
      return
    }

    setUpdatingStatus(prev => ({ ...prev, [id]: true }))
    try {
      await api.patch(`/layanan/${id}/status`, { status: newStatus }, token)
      
      // Update local state
      setLayanan(prevLayanan => 
        prevLayanan.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        )
      )
      
      toast({
        title: "Status Berhasil Diperbarui",
        description: `Status layanan telah diubah menjadi ${newStatus}.`,
      })
    } catch (err) {
      console.error("Error updating status:", err)
      if (process.env.NODE_ENV === 'development' && err.message.includes('Network error')) {
        // Update local state for development
        setLayanan(prevLayanan => 
          prevLayanan.map(item => 
            item.id === id ? { ...item, status: newStatus } : item
          )
        )
        toast({
          title: "Status Berhasil Diperbarui",
          description: `Status layanan telah diubah menjadi ${newStatus} (mode development).`,
        })
      } else {
        toast({
          title: "Gagal Mengubah Status",
          description: err.message || "Terjadi kesalahan saat mengubah status layanan.",
          variant: "destructive",
        })
      }
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [id]: false }))
    }
  }

  useEffect(() => {
    console.log("🔄 useEffect triggered - token:", token ? "exists" : "null")
    console.log("🔄 useEffect triggered - user:", user)
    console.log("🔄 useEffect triggered - isAdmin:", isAdmin)
    fetchLayanan()
  }, [token, user, isAdmin])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Memuat layanan...</p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <p className="font-semibold">🔍 Debug Info:</p>
              <p>Token: {token ? "✅ Ada" : "❌ Tidak ada"}</p>
              <p>User: {user ? `✅ ${user.name} (${user.role})` : "❌ Tidak ada"}</p>
              <p>isAdmin: {isAdmin ? "✅ Ya" : "❌ Tidak"}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">Kelola Layanan</CardTitle>
        <CardDescription>Kelola dan ubah status permohonan layanan dari warga.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-600 mb-2">{error}</p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-3 p-3 bg-gray-100 rounded text-sm space-y-1">
                <p className="font-semibold">🔍 Debug Info:</p>
                <p>Token: {token ? `✅ ${token.substring(0, 20)}...` : "❌ Tidak ada"}</p>
                <p>User: {user ? `✅ ${user.name} (${user.role})` : "❌ Tidak ada"}</p>
                <p>isAdmin: {isAdmin ? "✅ Ya" : "❌ Tidak"}</p>
                <p>API URL: {process.env.NEXT_PUBLIC_API_URL || "❌ Tidak diset"}</p>
              </div>
            )}
            <div className="mt-3 space-x-2">
              <Button onClick={fetchLayanan} variant="outline" size="sm">
                Coba Lagi
              </Button>
              <Button onClick={() => window.location.href = '/auth/login'} variant="destructive" size="sm">
                Login Ulang
              </Button>
            </div>
          </div>
        )}

        {layanan.length === 0 ? (
          <p className="text-center text-muted-foreground">Belum ada permohonan layanan.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Jenis Layanan</TableHead>
                  <TableHead>Isi Permohonan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {layanan.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">#{item.id}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        {JENIS_LAYANAN_LABELS[item.jenis] || item.jenis}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={item.isi}>
                        {item.isi}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[item.status] || "bg-gray-100 text-gray-800"}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at || item.createdAt).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {item.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateStatus(item.id, 'diterima')}
                              disabled={updatingStatus[item.id]}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateStatus(item.id, 'ditolak')}
                              disabled={updatingStatus[item.id]}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Select
                          value={item.status}
                          onValueChange={(value) => updateStatus(item.id, value)}
                          disabled={updatingStatus[item.id]}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="diterima">Diterima</SelectItem>
                            <SelectItem value="ditolak">Ditolak</SelectItem>
                          </SelectContent>
                        </Select>
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
