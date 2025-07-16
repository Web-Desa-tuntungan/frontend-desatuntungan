"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { api } from "./api"
import { toast } from "@/hooks/use-toast"

const AuthContext = createContext(null)

// Utility functions for safe localStorage operations
const safeGetLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key)
    return value && value !== "undefined" && value !== "null" ? value : null
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return null
  }
}

const safeSetLocalStorage = (key, value) => {
  try {
    if (value && value !== "undefined") {
      localStorage.setItem(key, value)
    }
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error)
  }
}

const safeRemoveLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null) // { id, name, email, role }
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = safeGetLocalStorage("desa_tuntungan_token")
    const storedUser = safeGetLocalStorage("desa_tuntungan_user")

    // Set token if valid
    if (storedToken) {
      setToken(storedToken)
    }

    // Parse and set user data if valid
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        // Additional check to ensure parsed data is a valid object
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser)
        } else {
          // Clear invalid user data
          safeRemoveLocalStorage("desa_tuntungan_user")
        }
      } catch (error) {
        console.error("Failed to parse stored user data:", error)
        // Clear invalid user data from localStorage
        safeRemoveLocalStorage("desa_tuntungan_user")
        safeRemoveLocalStorage("desa_tuntungan_token")
      }
    }

    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      let data

      // Try to make API call
      try {
        data = await api.post("/auth/login", { email, password })
      } catch (apiError) {
        // Mock data removed - will show real connection status
        console.error("❌ Backend connection failed:", apiError.message)
        throw apiError
      }

      // Handle different possible response formats
      let newToken, userData

      if (typeof data === 'string') {
        // If response is just a token string
        newToken = data
        userData = { email } // Create minimal user object
      } else if (data && typeof data === 'object') {
        // If response is an object, try different property names
        newToken = data.token || data.access_token || data.accessToken
        userData = data.user || data.userData || data.profile || {
          email,
          name: data.name || email.split('@')[0],
          id: data.id || data.userId || Date.now()
        }
      } else {
        throw new Error("Unexpected response format from server")
      }

      // Validate that we have at least a token
      if (!newToken || newToken === "undefined" || newToken === "null") {
        throw new Error("No valid authentication token received from server")
      }

      // Ensure userData is a valid object
      if (!userData || typeof userData !== 'object') {
        userData = {
          email,
          name: email.split('@')[0],
          id: Date.now()
        }
      }

      // Ensure userData has required fields
      if (!userData.email) userData.email = email
      if (!userData.name) userData.name = email.split('@')[0]
      if (!userData.id) userData.id = Date.now()
      if (!userData.role) userData.role = email.toLowerCase().includes('admin') ? 'admin' : 'user'

      // Set authentication state
      setToken(newToken)
      setUser(userData)

      // Save to localStorage for persistence
      safeSetLocalStorage("desa_tuntungan_token", newToken)
      safeSetLocalStorage("desa_tuntungan_user", JSON.stringify(userData))

      toast({
        title: "Login Berhasil",
        description: `Selamat datang, ${userData.name || userData.email}!`,
      })

      return true
    } catch (error) {
      console.error("Login error:", error)

      let errorMessage = "Email atau password salah."

      // Handle different types of errors
      if (error.message) {
        if (error.message.includes("fetch")) {
          errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
        } else if (error.message.includes("API Error")) {
          errorMessage = error.message
        } else if (error.message.includes("JSON")) {
          errorMessage = "Server mengembalikan respons yang tidak valid."
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: "Login Gagal",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }, [])

  const register = useCallback(async (name, email, password) => {
    try {
      console.log("🚀 Attempting registration with:", { name, email, password: "***" })
      console.log("🌐 API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL)

      const response = await api.post("/auth/register", { name, email, password })
      console.log("✅ Registration response:", response)

      toast({
        title: "Registrasi Berhasil",
        description: "Akun Anda berhasil dibuat. Silakan login.",
      })
      return true
    } catch (error) {
      console.error("❌ Registration error:", error)
      console.log("🔍 Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      })

      toast({
        title: "Registrasi Gagal",
        description: error.message || "Terjadi kesalahan saat registrasi.",
        variant: "destructive",
      })
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)

    // Safely clear localStorage
    safeRemoveLocalStorage("desa_tuntungan_token")
    safeRemoveLocalStorage("desa_tuntungan_user")

    toast({
      title: "Logout Berhasil",
      description: "Anda telah berhasil keluar.",
    })
    router.push("/auth/login")
  }, [router])

  const loginWithGoogle = useCallback(async (googleToken) => {
    try {
      console.log("🚀 Attempting Google login with token:", googleToken.substring(0, 15) + "...");
      
      let data;
      try {
        data = await api.post("/auth/google", { token: googleToken });
      } catch (apiError) {
        console.error("❌ Google login failed:", apiError.message);
        throw apiError;
      }
      
      // Handle response
      let newToken, userData;
      
      if (typeof data === 'string') {
        newToken = data;
        userData = { email: 'google-user@example.com' }; // Minimal user object
      } else if (data && typeof data === 'object') {
        newToken = data.token || data.access_token || data.accessToken;
        userData = data.user || data.userData || data.profile || {};
      } else {
        throw new Error("Unexpected response format from server");
      }
      
      // Validate token
      if (!newToken || newToken === "undefined" || newToken === "null") {
        throw new Error("No valid authentication token received from server");
      }
      
      // Ensure userData is valid
      if (!userData || typeof userData !== 'object') {
        userData = {
          email: 'google-user@example.com',
          name: 'Google User',
          id: Date.now()
        };
      }
      
      // Ensure required fields
      if (!userData.email) userData.email = 'google-user@example.com';
      if (!userData.name) userData.name = userData.email.split('@')[0];
      if (!userData.id) userData.id = Date.now();
      if (!userData.role) userData.role = 'user';
      
      // Set auth state
      setToken(newToken);
      setUser(userData);
      
      // Save to localStorage
      safeSetLocalStorage("desa_tuntungan_token", newToken);
      safeSetLocalStorage("desa_tuntungan_user", JSON.stringify(userData));
      
      toast({
        title: "Login Google Berhasil",
        description: `Selamat datang, ${userData.name}!`,
      });
      
      // Redirect berdasarkan role
      if (userData.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
      
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      
      let errorMessage = "Login dengan Google gagal.";
      
      if (error.message) {
        if (error.message.includes("fetch")) {
          errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
        } else if (error.message.includes("API Error")) {
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Login Google Gagal",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  }, [router]);

  const value = {
    token,
    user,
    loading,
    login,
    register,
    logout,
    loginWithGoogle, // Tambahkan fungsi login Google
    isAuthenticated: !!token,
    isAdmin: user && user.role === "admin",
    isUser: user && user.role === "user",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthGuard({ children, roles = [] }) {
  const { isAuthenticated, isAdmin, isUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Don't do anything while still loading
    if (loading) return

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Akses Ditolak",
        description: "Silakan login terlebih dahulu untuk mengakses halaman ini.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    // Check role requirements
    let hasRequiredRole = false
    if (roles.length === 0) {
      // No specific role required, just need to be authenticated
      hasRequiredRole = true
    } else {
      // Check if user has any of the required roles
      if (roles.includes("admin") && isAdmin) hasRequiredRole = true
      if (roles.includes("user") && isUser) hasRequiredRole = true
    }

    if (!hasRequiredRole) {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk mengakses halaman ini.",
        variant: "destructive",
      })
      router.push("/auth/login")
    }
  }, [isAuthenticated, isAdmin, isUser, loading, roles, router])

  // Show loading while authentication is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  // Show loading if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Mengarahkan ke halaman login...</p>
        </div>
      </div>
    )
  }

  // Check role requirements for rendering
  if (roles.length > 0) {
    const hasRequiredRole = (roles.includes("admin") && isAdmin) || (roles.includes("user") && isUser)
    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-desa-primary mb-4"></div>
            <p className="text-lg text-muted-foreground">Mengarahkan...</p>
          </div>
        </div>
      )
    }
  }

  return children
}
