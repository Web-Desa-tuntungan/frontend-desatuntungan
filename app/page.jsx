import HeroSection from "@/components/hero-section"
import VillageChiefGreeting from "@/components/village-chief-greeting"
import QuickAccessButtons from "@/components/quick-access-buttons"
import SocialLinks from "@/components/social-links"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LatestNews from "@/components/latest-news"

export default function HomePage() {
  // Removed server-side API call to prevent 401 errors
  // News will be fetched on the client side in the LatestNews component

  return (
    <>
      <HeroSection />
      <VillageChiefGreeting />
      <QuickAccessButtons />

      {/* Berita Terbaru Section */}
      <LatestNews />

      {/* Peta Interaktif Section */}
      <section className="py-12 md:py-20 bg-desa-light-green">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-desa-primary mb-8">Peta Interaktif Desa Tuntungan 1</h2>
          <Card className="rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.1000000000004!2d98.65000000000001!3d3.5800000000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f0000000001%3A0x0x0000000000000001!2sDesa%20Tuntungan%201!5e0!3m2!1sen!2sid!4v1678901234567!5m2!1sen!2sid"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Desa Tuntungan 1"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SocialLinks />
    </>
  )
}
