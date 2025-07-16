import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NAV_LINKS } from "@/lib/constants"

export default function LayananLayout({ children }) {
  const layananLinks = NAV_LINKS.find((link) => link.name === "Layanan")?.subLinks || []

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="text-4xl font-bold text-desa-primary mb-8 text-center">Layanan Desa</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <Card className="rounded-2xl shadow-md h-fit lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-desa-primary">Menu Layanan</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {layananLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-desa-light-green hover:text-desa-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  )
}
