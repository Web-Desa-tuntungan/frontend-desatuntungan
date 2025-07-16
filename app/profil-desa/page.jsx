import { redirect } from "next/navigation"

export default function ProfilDesaRootPage() {
  // Redirect to the Sejarah page as the default for /profil-desa
  redirect("/profil-desa/sejarah")
  return null // This component will not render
}
