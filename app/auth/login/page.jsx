"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { MountainIcon } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

// Tambahkan script Google di head
const GoogleAuthScript = () => {
  useEffect(() => {
    // Load Google Sign-In API script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Clean up
      document.head.removeChild(script)
    }
  }, [])

  return null
}

export default function LoginPage() {
  const [email, setEmail] = useState("admin@desa.com")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login, loginWithGoogle, isAuthenticated, user } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/dashboard/admin")
      } else {
        router.push("/dashboard/user")
      }
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const success = await login(email, password)
    setLoading(false)

    if (success) {
      // Redirect will be handled by useEffect when user state updates
      // No need to manually redirect here as the useEffect will handle it
    }
  }

  // Handle Google login callback
  const handleGoogleCallback = useCallback(async (response) => {
    try {
      setError(null)
      setLoading(true)
      const token = response.credential
      
      if (!token) {
        throw new Error("Token Google tidak valid")
      }
      
      const success = await loginWithGoogle(token)
      setLoading(false)
      
      if (!success) {
        setError("Login dengan Google gagal. Silakan coba lagi.")
      }
    } catch (err) {
      setLoading(false)
      setError(err.message || "Login dengan Google gagal. Silakan coba lagi.")
      console.error("Google login error:", err)
    }
  }, [loginWithGoogle])

  // Initialize Google button when component mounts
  useEffect(() => {
    // Check if Google API is loaded
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback
      })

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { 
          theme: 'outline', 
          size: 'large',
          width: '100%',
          text: 'signin_with',
          shape: 'rectangular'
        }
      )
    } else {
      // If not loaded yet, wait and try again
      const checkGoogleInterval = setInterval(() => {
        if (window.google && window.google.accounts) {
          clearInterval(checkGoogleInterval)
          
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback
          })

          window.google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { 
              theme: 'outline', 
              size: 'large',
              width: '100%',
              text: 'signin_with',
              shape: 'rectangular'
            }
          )
        }
      }, 100)

      // Clean up interval
      return () => clearInterval(checkGoogleInterval)
    }
  }, [handleGoogleCallback])

  return (
    <>
      <GoogleAuthScript />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-desa-light-green p-4">
        <Card className="w-full max-w-md rounded-2xl shadow-lg p-6">
          <CardHeader className="text-center pb-6">
            <Link href="/" className="flex items-center justify-center gap-2 text-desa-primary font-bold text-2xl mb-4">
              <MountainIcon className="h-10 w-10" />
              <span>{SITE_NAME}</span>
            </Link>
            <CardTitle className="text-3xl font-bold text-desa-primary">Login</CardTitle>
            <CardDescription className="text-gray-600">Masuk ke akun Anda untuk mengakses layanan desa.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-desa-primary hover:bg-desa-primary/90 text-white rounded-md py-3"
                disabled={loading}
              >
                {loading ? "Memuat..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Atau login dengan
                  </span>
                </div>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <div className="flex flex-col items-center">
              {loading ? (
                <div className="w-full py-2 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-desa-primary"></div>
                  <span className="ml-2 text-sm text-gray-600">Memproses login...</span>
                </div>
              ) : (
                <div id="googleSignInButton" className="w-full"></div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-2 bg-red-50 text-red-600 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            <div className="text-center text-sm">
              Belum punya akun?{" "}
              <Link href="/auth/register" className="text-desa-primary hover:underline">
                Daftar Sekarang
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
