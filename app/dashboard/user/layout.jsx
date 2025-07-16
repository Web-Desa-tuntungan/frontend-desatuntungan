"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard, useAuth } from "@/lib/auth"
import { LayoutDashboardIcon, FileTextIcon } from "lucide-react"

export default function UserDashboardLayout({ children }) {
  const { user } = useAuth()

  const dashboardLinks = [
    { name: "Ringkasan", href: "/dashboard/user", icon: LayoutDashboardIcon },
    { name: "Layanan Saya", href: "/dashboard/user/layanan-saya", icon: FileTextIcon },
    { name: "Ajukan Layanan Baru", href: "/layanan/permohonan-surat", icon: FileTextIcon }, // Link to public service form
  ]

  return (
    <AuthGuard roles={["user", "admin"]}>
      {" "}
      {/* Admin can also access user dashboard */}
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-4xl font-bold text-desa-primary mb-8 text-center">Dashboard Pengguna</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <Card className="rounded-2xl shadow-md h-fit lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-desa-primary">Menu Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {dashboardLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-desa-light-green hover:text-desa-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" /> {link.name}
                  </Link>
                )
              })}
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </AuthGuard>
  )
}
