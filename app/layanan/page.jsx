import { redirect } from "next/navigation"

export default function LayananRootPage() {
  // Redirect to the Permohonan Surat page as the default for /layanan
  redirect("/layanan/permohonan-surat")
  return null // This component will not render
}
