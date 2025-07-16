import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, TagIcon } from "lucide-react"

export default function NewsCard({ news }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  return (
    <Card className="rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-lg">
      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
        {news.gambar ? (
          <Image
            src={news.gambar}
            alt={news.judul}
            layout="fill"
            objectFit="cover"
            className="rounded-l-2xl"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-desa-primary/20 to-desa-secondary/20 flex items-center justify-center rounded-l-2xl">
            <div className="text-center">
              <TagIcon className="h-12 w-12 text-desa-primary/50 mx-auto mb-2" />
              <p className="text-sm text-desa-primary/70 font-medium">Berita Desa</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between md:w-2/3">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-xl font-bold text-desa-primary line-clamp-2">{news.judul}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4" /> {formatDate(news.created_at || news.createdAt)}
            <TagIcon className="h-4 w-4 ml-4" /> {news.kategori}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 text-gray-700 text-sm line-clamp-3 flex-grow">{news.konten}</CardContent>
        <CardFooter className="p-0 pt-4">
          <Button
            asChild
            variant="outline"
            className="bg-desa-secondary hover:bg-desa-secondary/90 text-white rounded-md"
          >
            <Link href={`/berita-kegiatan/${news.id}`}>Baca Selengkapnya</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
