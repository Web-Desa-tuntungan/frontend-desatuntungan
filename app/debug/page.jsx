"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { API_BASE_URL } from "@/lib/constants"

export default function DebugPage() {
  const [testResult, setTestResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "Test User",
    email: "test@example.com",
    password: "password123"
  })

  const [layananData, setLayananData] = useState({
    jenis: "surat",
    isi: "Test permohonan surat keterangan domisili"
  })

  const testBackendConnection = async () => {
    setLoading(true)
    setTestResult("Testing backend connection...\n")
    
    try {
      // Test basic connection
      const response = await fetch(`${API_BASE_URL}/health`)
      setTestResult(prev => prev + `✅ Backend reachable at ${API_BASE_URL}\n`)
      setTestResult(prev => prev + `Response status: ${response.status}\n`)
    } catch (error) {
      setTestResult(prev => prev + `❌ Backend not reachable: ${error.message}\n`)
    }
    
    // Test register endpoint
    try {
      setTestResult(prev => prev + "\nTesting /auth/register endpoint...\n")
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.text()
      setTestResult(prev => prev + `Register response (${response.status}): ${data}\n`)
    } catch (error) {
      setTestResult(prev => prev + `❌ Register endpoint error: ${error.message}\n`)
    }
    
    // Test login endpoint
    try {
      setTestResult(prev => prev + "\nTesting /auth/login endpoint...\n")
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      })
      
      const data = await response.text()
      setTestResult(prev => prev + `Login response (${response.status}): ${data}\n`)
    } catch (error) {
      setTestResult(prev => prev + `❌ Login endpoint error: ${error.message}\n`)
    }
    
    setLoading(false)
  }

  const testFrontendAPI = async () => {
    setLoading(true)
    setTestResult("Testing frontend API client...\n")
    
    try {
      setTestResult(prev => prev + "Attempting registration via frontend API...\n")
      const response = await api.post("/auth/register", formData)
      setTestResult(prev => prev + `✅ Frontend API register success: ${JSON.stringify(response)}\n`)
    } catch (error) {
      setTestResult(prev => prev + `❌ Frontend API register error: ${error.message}\n`)
    }
    
    setLoading(false)
  }

  const testLayananEndpoints = async () => {
    setLoading(true)
    setTestResult("Testing layanan endpoints...\n")

    try {
      // Test create layanan
      setTestResult(prev => prev + "\nTesting POST /tambah/layanan...\n")
      const response = await fetch(`${API_BASE_URL}/tambah/layanan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock_token'
        },
        body: JSON.stringify(layananData)
      })

      const data = await response.text()
      setTestResult(prev => prev + `Create layanan response (${response.status}): ${data}\n`)
    } catch (error) {
      setTestResult(prev => prev + `❌ Create layanan error: ${error.message}\n`)
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Backend Integration Debug</CardTitle>
          <CardDescription>
            Tool untuk debugging koneksi frontend-backend dan testing endpoints
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={testBackendConnection}
              disabled={loading}
              variant="outline"
            >
              Test Backend Direct
            </Button>
            <Button
              onClick={testFrontendAPI}
              disabled={loading}
              className="bg-desa-primary hover:bg-desa-primary/90"
            >
              Test Frontend API
            </Button>
            <Button
              onClick={testLayananEndpoints}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Test Layanan API
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Test Results:</Label>
            <div className="bg-gray-100 p-4 rounded-md min-h-[200px] font-mono text-sm whitespace-pre-wrap">
              {testResult || "Click a test button to see results..."}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-semibold text-blue-800 mb-2">Current Configuration:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div><strong>API Base URL:</strong> {API_BASE_URL}</div>
              <div><strong>Environment:</strong> {process.env.NODE_ENV}</div>
              <div><strong>Frontend URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-md">
            <h4 className="font-semibold text-yellow-800 mb-2">Expected Backend Setup:</h4>
            <div className="text-sm text-yellow-700 space-y-1">
              <div>• Backend running at: http://0.0.0.0:8080</div>
              <div>• Routes: POST /auth/register, POST /auth/login</div>
              <div>• CORS enabled for frontend ports</div>
              <div>• Database connected with users table</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
