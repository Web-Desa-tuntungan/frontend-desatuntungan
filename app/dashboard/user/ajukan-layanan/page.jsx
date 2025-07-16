import { redirect } from "next/navigation"

export default function AjukanLayananPage() {
  // Redirect to the public Permohonan Surat page
  redirect("/layanan/permohonan-surat")
  return null // This component will not render
}
