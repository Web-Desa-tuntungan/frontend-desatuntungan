import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { SITE_NAME } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: SITE_NAME,
  description: "Website Resmi Desa Tuntungan 1",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
