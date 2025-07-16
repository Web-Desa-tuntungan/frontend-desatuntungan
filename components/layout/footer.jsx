import Link from "next/link"
import { MountainIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react"
import { SITE_NAME, NAV_LINKS, SOCIAL_MEDIA_LINKS } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-desa-primary text-white py-8 px-4 md:px-8 rounded-t-2xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <MountainIcon className="h-8 w-8" />
            <span>{SITE_NAME}</span>
          </Link>
          <p className="text-sm text-desa-light-green">
            Website resmi Desa Tuntungan 1. Menyediakan informasi dan layanan digital untuk kemajuan desa.
          </p>
          <div className="flex gap-4">
            {SOCIAL_MEDIA_LINKS.map((link) => (
              <Link key={link.name} href={link.href} className="text-white hover:text-desa-secondary transition-colors">
                {link.icon === "facebook" && <FacebookIcon className="h-6 w-6" />}
                {link.icon === "instagram" && <InstagramIcon className="h-6 w-6" />}
                {link.icon === "youtube" && <YoutubeIcon className="h-6 w-6" />}
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-desa-light-green hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Profil Desa</h3>
          <ul className="space-y-1">
            {NAV_LINKS.find((link) => link.name === "Profil Desa")?.subLinks.map((subLink) => (
              <li key={subLink.name}>
                <Link href={subLink.href} className="text-sm text-desa-light-green hover:text-white transition-colors">
                  {subLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Layanan</h3>
          <ul className="space-y-1">
            {NAV_LINKS.find((link) => link.name === "Layanan")?.subLinks.map((subLink) => (
              <li key={subLink.name}>
                <Link href={subLink.href} className="text-sm text-desa-light-green hover:text-white transition-colors">
                  {subLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-desa-light-green/30 mt-8 pt-6 text-center text-sm text-desa-light-green">
        &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  )
}
