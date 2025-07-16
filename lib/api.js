import { API_BASE_URL } from "./constants"

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type")
  const isJson = contentType && contentType.includes("application/json")

  let data = null
  let rawText = ""

  // Always try to get the raw text first, as it's safer and can be used for debugging.
  try {
    rawText = await response.text()
  } catch (e) {
    // If reading response body as text fails, throw an error immediately.
    throw new Error(`Failed to read response body as text: ${e.message}. Status: ${response.status}.`)
  }

  // Handle empty responses
  if (!rawText || rawText.trim() === "") {
    if (response.ok) {
      return null; // Return null for empty successful responses
    } else {
      throw new Error(`API Error (Status ${response.status}): Empty response`)
    }
  }

  // Now, if it's supposed to be JSON, try to parse it.
  if (isJson) {
    try {
      data = JSON.parse(rawText) // Explicitly use JSON.parse on the raw text
    } catch (e) {
      // This is the specific point where "Unexpected token 'I'" (or similar JSON parsing errors) would be caught.
      console.error("JSON parsing failed for response:", rawText, e)

      // If the response is OK but not valid JSON, return the raw text instead of throwing
      if (response.ok) {
        console.warn("Response was OK but not valid JSON, returning raw text")
        return rawText;
      }

      // Throw a detailed error message including the problematic raw response.
      throw new Error(
        `API response was not valid JSON (status: ${response.status}, content-type: ${contentType}). ` +
          `Original JSON parsing error: ${e.message}. ` +
          `Raw response (first 100 chars): "${rawText.substring(0, 100)}..."`,
      )
    }
  } else {
    // If not JSON, the raw text is the data.
    data = rawText
  }

  // Check if the response status is not OK (e.g., 4xx, 5xx)
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`
    if (isJson && data && (data.message || data.error)) {
      errorMessage = data.message || data.error
    } else if (rawText) {
      errorMessage = rawText // Use raw text if not JSON or no specific message in JSON
    }
    throw new Error(`API Error (Status ${response.status}): ${errorMessage}`)
  }

  // If response.ok is true, return the successfully parsed/read body
  return data
}

export const api = {
  async get(path, token = null) {
    const headers = {
      "Content-Type": "application/json",
    }
    if (token && token !== "null" && token !== "undefined") {
      headers["Authorization"] = `Bearer ${token}`
    }
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers,
      })
      return handleResponse(response)
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // Mock data removed - will show real connection status
        console.error("❌ Backend connection failed:", error.message)
        throw new Error(`Network error: Unable to connect to server at ${API_BASE_URL}`)
      }
      throw error
    }
  },

  async post(path, data, token = null) {
    const headers = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    console.log(`🌐 POST ${API_BASE_URL}${path}`)
    console.log("📤 Request data:", data)
    console.log("📋 Headers:", headers)

    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      })

      console.log("📥 Response status:", response.status)
      console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()))

      return handleResponse(response)
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // In development mode, simulate auth endpoints
        if (process.env.NODE_ENV === 'development' && path === '/auth/login') {
          console.warn("API not available, simulating login for development")

          // Mock login validation
          if (data.email === 'admin@desa.com' && data.password === 'admin123') {
            return {
              message: "Login berhasil",
              token: `mock_admin_token_${Date.now()}`
            }
          } else if (data.email === 'user@desa.com' && data.password === 'user123') {
            return {
              message: "Login berhasil",
              token: `mock_user_token_${Date.now()}`
            }
          } else {
            throw new Error('Email atau password salah')
          }
        }

        if (process.env.NODE_ENV === 'development' && path === '/auth/register') {
          console.warn("API not available, simulating register for development")

          // Mock email validation
          if (data.email === 'admin@desa.com' || data.email === 'user@desa.com') {
            throw new Error('Email sudah terdaftar')
          }

          return {
            message: "Registrasi berhasil"
          }
        }

        // In development mode, simulate layanan creation
        if (process.env.NODE_ENV === 'development' && path === '/tambah/layanan') {
          console.warn("API not available, simulating layanan creation for development")

          // Validasi jenis layanan seperti di backend
          if (!['surat', 'kependudukan', 'formulir', 'jadwal'].includes(data.jenis)) {
            throw new Error('Jenis layanan tidak valid')
          }

          return {
            message: "Pengajuan layanan berhasil dibuat"
          }
        }

        // Mock data removed - will show real connection status
        console.error("❌ Backend connection failed:", error.message)
        throw new Error(`Network error: Unable to connect to server at ${API_BASE_URL}`)
      }
      throw error
    }
  },

  async postFormData(path, formData, token = null) {
    const headers = {} // FormData handles its own Content-Type
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: formData,
    })
    return handleResponse(response)
  },

  async put(path, data, token = null) {
    const headers = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      })
      return handleResponse(response)
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // Mock data removed - will show real connection status
        console.error("❌ Backend connection failed:", error.message)
        throw new Error(`Network error: Unable to connect to server at ${API_BASE_URL}`)
      }
      throw error
    }
  },

  async patch(path, data, token = null) {
    const headers = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
      })
      return handleResponse(response)
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // In development mode, simulate layanan status update
        if (process.env.NODE_ENV === 'development' && path.includes('/layanan/') && path.includes('/status')) {
          console.warn("API not available, simulating layanan status update for development")

          // Validasi status seperti di backend
          if (!['pending', 'diterima', 'ditolak'].includes(data.status)) {
            throw new Error('Status tidak valid')
          }

          return {
            message: "Status layanan berhasil diperbarui"
          }
        }

        // Mock data removed - will show real connection status
        console.error("❌ Backend connection failed:", error.message)
        throw new Error(`Network error: Unable to connect to server at ${API_BASE_URL}`)
      }
      throw error
    }
  },

  async del(path, token = null) {
    const headers = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "DELETE",
        headers,
      })
      return handleResponse(response)
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // Mock data removed - will show real connection status
        console.error("❌ Backend connection failed:", error.message)
        throw new Error(`Network error: Unable to connect to server at ${API_BASE_URL}`)
      }
      throw error
    }
  },

  async putFormData(path, formData, token = null) {
    const headers = {} // FormData handles its own Content-Type
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "PUT",
        headers,
        body: formData
      })
      return handleResponse(response)
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // Mock data removed - will show real connection status
        console.error("❌ Backend connection failed:", error.message)
        throw new Error(`Network error: Unable to connect to server at ${API_BASE_URL}`)
      }
      throw error
    }
  },
}
