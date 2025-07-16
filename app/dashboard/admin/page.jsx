"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NewspaperIcon, ImageIcon, FileTextIcon } from "lucide-react"

export default function AdminDashboardOverviewPage() {
  const { user } = useAuth()

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">
          Selamat Datang, Admin {user?.name || ""}!
        </CardTitle>
        <CardDescription>Ringkasan dan akses cepat ke alat administrasi desa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <p>
          Di sini Anda dapat mengelola berita dan kegiatan, mengelola galeri, serta memvalidasi permohonan layanan dari
          warga.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <NewspaperIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Kelola Berita & Kegiatan</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Tambah, edit, atau hapus berita dan agenda desa.</p>
              <Button asChild className="mt-4 bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md">
                <Link href="/dashboard/admin/berita">Kelola Berita</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <ImageIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Kelola Galeri</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Unggah dan kelola foto serta video galeri desa.</p>
              <Button asChild className="mt-4 bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md">
                <Link href="/dashboard/admin/galeri">Kelola Galeri</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <FileTextIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Validasi Layanan</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Tinjau dan setujui permohonan layanan dari warga.</p>
              <Button asChild className="mt-4 bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md">
                <Link href="/dashboard/admin/layanan">Validasi Layanan</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground mt-8">Pastikan Anda selalu menjaga keamanan akun dan data desa.</p>
      </CardContent>
    </Card>
  )
}
