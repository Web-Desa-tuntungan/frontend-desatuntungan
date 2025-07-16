"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileTextIcon } from "lucide-react"

export default function UserDashboardOverviewPage() {
  const { user } = useAuth()

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-desa-primary">
          Selamat Datang, {user?.name || "Pengguna"}!
        </CardTitle>
        <CardDescription>Ringkasan aktivitas dan akses cepat ke layanan Anda.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-700">
        <p>
          Di sini Anda dapat melihat status permohonan layanan Anda, mengajukan permohonan baru, dan mengelola informasi
          akun Anda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <FileTextIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Layanan Saya</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Lihat daftar dan status semua permohonan layanan yang telah Anda ajukan.</p>
              <Button asChild className="mt-4 bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md">
                <Link href="/dashboard/user/layanan-saya">Lihat Layanan</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm p-4 bg-desa-light-green/30">
            <CardHeader className="flex-row items-center gap-4 p-0 pb-2">
              <FileTextIcon className="h-8 w-8 text-desa-primary" />
              <CardTitle className="text-xl font-semibold text-desa-primary">Ajukan Layanan Baru</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              <p>Ajukan permohonan surat atau layanan kependudukan lainnya dengan mudah.</p>
              <Button asChild className="mt-4 bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md">
                <Link href="/layanan/permohonan-surat">Ajukan Sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Jika Anda memiliki pertanyaan atau membutuhkan bantuan, silakan hubungi petugas desa.
        </p>
      </CardContent>
    </Card>
  )
}
