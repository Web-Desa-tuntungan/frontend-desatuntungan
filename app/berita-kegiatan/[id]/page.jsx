import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, TagIcon } from "lucide-react"
import { api } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function BeritaDetailPage({ params }) {
  const { id } = params
  let newsItem = null

  try {
    newsItem = await api.get(`/public/berita/${id}`)
  } catch (error) {
    console.error(`Failed to fetch news item with ID ${id}:`, error)
    notFound() // Show 404 page if news item not found or API error
  }

  if (!newsItem) {
    notFound() // Double check in case API returns null without throwing
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <Card className="rounded-2xl shadow-md p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl md:text-4xl font-bold text-desa-primary mb-2">{newsItem.judul}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" /> {formatDate(newsItem.created_at || newsItem.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <TagIcon className="h-4 w-4" /> {newsItem.kategori}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700">
          {/* Display image from Cloudinary if available */}
          {newsItem.gambar ? (
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={newsItem.gambar}
                alt={newsItem.judul}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-desa-primary/10 to-desa-secondary/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <TagIcon className="h-16 w-16 text-desa-primary/30 mx-auto mb-4" />
                <p className="text-lg text-desa-primary/50 font-medium">Berita Desa</p>
                <p className="text-sm text-desa-primary/40">Tidak ada gambar</p>
              </div>
            </div>
          )}
          <div className="prose max-w-none">
            {/* Render content with proper formatting */}
            <div className="text-base leading-relaxed whitespace-pre-wrap">
              {newsItem.konten}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
