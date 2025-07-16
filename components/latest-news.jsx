"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import NewsCard from "@/components/news-card"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth"

export default function LatestNews() {
  const [latestNews, setLatestNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch news with token if available, otherwise without token
        let data
        try {
          data = await api.get("/public/berita?limit=3", token)
        } catch (apiError) {
          // If token-based request fails, try without token for public news
          if (apiError.message.includes("401") || apiError.message.includes("Unauthorized")) {
            console.log("Trying to fetch public news without authentication...")
            data = await api.get("/public/berita?limit=3")
          } else {
            throw apiError
          }
        }
        
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setLatestNews(data)
        } else if (data && Array.isArray(data.data)) {
          // Handle case where data is wrapped in a data property
          setLatestNews(data.data)
        } else {
          console.warn("API /berita?limit=3 returned non-array data:", data)
          setLatestNews([])
        }
      } catch (error) {
        console.error("Failed to load latest news:", error)
        setError(error.message)
        setLatestNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [token])

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-desa-primary text-center mb-8">
            Berita & Kegiatan Terbaru
          </h2>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary"></div>
            <p className="mt-4 text-muted-foreground">Memuat berita terbaru...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-desa-primary text-center mb-8">
          Berita & Kegiatan Terbaru
        </h2>
        
        {error ? (
          <div className="text-center">
            <p className="text-red-600 mb-4">Gagal memuat berita: {error}</p>
            <p className="text-muted-foreground">Silakan coba lagi nanti atau hubungi administrator.</p>
          </div>
        ) : latestNews.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Belum ada berita atau kegiatan terbaru.
          </p>
        ) : (
          <div className="grid gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button
            asChild
            className="bg-desa-primary hover:bg-desa-primary/90 text-white text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/berita-kegiatan">Lihat Semua Berita</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
