import Link from "next/link"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react"
import { SOCIAL_MEDIA_LINKS } from "@/lib/constants"

const IconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
}

export default function SocialLinks() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-desa-primary mb-8">Ikuti Kami di Media Sosial</h2>
        <div className="flex justify-center gap-8">
          {SOCIAL_MEDIA_LINKS.map((link) => {
            const IconComponent = IconMap[link.icon]
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-desa-primary hover:text-desa-secondary transition-colors"
                aria-label={`Ikuti kami di ${link.name}`}
              >
                {IconComponent && <IconComponent className="h-12 w-12" />}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
