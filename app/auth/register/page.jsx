"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { MountainIcon } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const success = await register(name, email, password)
    setLoading(false)
    if (success) {
      router.push("/auth/login") // Redirect to login page after successful registration
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-desa-light-green p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg p-6">
        <CardHeader className="text-center pb-6">
          <Link href="/" className="flex items-center justify-center gap-2 text-desa-primary font-bold text-2xl mb-4">
            <MountainIcon className="h-10 w-10" />
            <span>{SITE_NAME}</span>
          </Link>
          <CardTitle className="text-3xl font-bold text-desa-primary">Daftar Akun Baru</CardTitle>
          <CardDescription className="text-gray-600">Buat akun untuk mengakses layanan desa.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-md"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-desa-primary hover:bg-desa-primary/90 text-white rounded-md py-3"
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="font-semibold text-desa-secondary hover:underline">
              Login di sini
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
