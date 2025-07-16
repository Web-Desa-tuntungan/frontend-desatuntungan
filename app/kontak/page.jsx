"use client"

import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MapPinIcon, PhoneIcon, MailIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function KontakPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call or form submission
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih! Pesan Anda telah kami terima.",
      })
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-desa-primary mb-8 text-center">Kontak Kami</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card className="rounded-2xl shadow-md p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-desa-primary">Informasi Kontak</CardTitle>
            <CardDescription>Hubungi kami melalui informasi di bawah ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <MapPinIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Lokasi Desa</h3>
                <p>
                  Kantor Desa Tuntungan 1
                  <br />
                  Jl. Raya Tuntungan No. 1, Desa Tuntungan 1,
                  <br />
                  Kecamatan [Nama Kecamatan], Kabupaten [Nama Kabupaten], [Kode Pos]
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <PhoneIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Telepon</h3>
                <p>(061) 12345678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MailIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p>info@desatuntungan1.go.id</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <UserIcon className="h-6 w-6 text-desa-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Kontak Perangkat Desa</h3>
                <p>
                  Untuk kontak langsung perangkat desa, silakan kunjungi halaman{" "}
                  <Link href="/profil-desa/perangkat-desa" className="text-desa-secondary hover:underline">
                    Perangkat Desa
                  </Link>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="rounded-2xl shadow-md p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-desa-primary">Kirim Pesan</CardTitle>
            <CardDescription>Isi formulir di bawah ini untuk mengirimkan pesan kepada kami.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama Anda"
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
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subjek</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subjek pesan Anda"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Pesan Anda</Label>
                <Textarea
                  id="message"
                  placeholder="Tulis pesan Anda di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
