import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileTextIcon, UsersIcon, FormInputIcon, CalendarDaysIcon } from "lucide-react"
import { QUICK_ACCESS_SERVICES } from "@/lib/constants"

const IconMap = {
  fileText: FileTextIcon,
  users: UsersIcon,
  form: FormInputIcon,
  calendar: CalendarDaysIcon,
}

export default function QuickAccessButtons() {
  return (
    <section className="py-12 md:py-20 bg-desa-light-blue">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-desa-primary mb-8">Akses Layanan Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACCESS_SERVICES.map((service) => {
            const IconComponent = IconMap[service.icon]
            return (
              <Button
                key={service.name}
                asChild
                className="flex flex-col items-center justify-center h-36 w-full bg-white text-desa-primary rounded-2xl shadow-md transition-all duration-300 hover:bg-desa-primary hover:text-white hover:shadow-lg group"
              >
                <Link href={service.href}>
                  {IconComponent && (
                    <IconComponent className="h-10 w-10 mb-2 group-hover:text-white transition-colors" />
                  )}
                  <span className="text-lg font-semibold text-center group-hover:text-white transition-colors">
                    {service.name}
                  </span>
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
