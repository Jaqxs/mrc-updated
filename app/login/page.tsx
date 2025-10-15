"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Eye,
  EyeOff,
  Shield,
  Users,
  ChevronRight,
  Phone,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("jobseeker")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://16564f45d94b.ngrok-free.app/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, user_type: userType }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(`❌ Login failed: ${data.detail || "Invalid credentials"}`)
        return
      }

      localStorage.setItem("accessToken", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      localStorage.setItem("role", data.role)
      localStorage.setItem("email", data.email)
      localStorage.setItem("first_name", data.first_name)

      window.location.href = data.redirect || "/"
    } catch (error) {
      console.error("Login error:", error)
      alert("⚠️ Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MRC CAREERS
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  International Recruitment Agency
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left: Login Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <CardTitle className="text-3xl flex items-center">
                  <Lock className="w-8 h-8 mr-3" />
                  Sign In to MRC Careers
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  Access your account to manage job applications and track your career journey
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <Tabs value={userType} onValueChange={setUserType} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-slate-100 rounded-2xl">
                    <TabsTrigger value="jobseeker" className="flex items-center text-sm font-medium rounded-xl">
                      <Users className="w-4 h-4 mr-2" />
                      Job Seeker
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="flex items-center text-sm font-medium rounded-xl">
                      <Shield className="w-4 h-4 mr-2" />
                      Administrator
                    </TabsTrigger>
                  </TabsList>

                  {/* Job Seeker */}
                  <TabsContent value="jobseeker" className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-center">
                        <Users className="w-6 h-6 text-blue-600 mr-3" />
                        <span className="font-semibold text-blue-900 text-lg">Job Seeker Portal</span>
                      </div>
                      <p className="text-blue-700 mt-2">
                        Access your personal dashboard, browse jobs, and track your applications
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-14 text-lg rounded-2xl"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 text-lg rounded-2xl pr-14"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold rounded-2xl"
                      >
                        {loading ? "Signing In..." : "Sign In to Dashboard"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Admin */}
                  <TabsContent value="admin" className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                      <div className="flex items-center">
                        <Shield className="w-6 h-6 text-purple-600 mr-3" />
                        <span className="font-semibold text-purple-900 text-lg">Admin Portal</span>
                      </div>
                      <p className="text-purple-700 mt-2">
                        Access full system controls and manage all recruitment activities
                      </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="admin-email">Admin Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@mrc.go.tz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-14 text-lg rounded-2xl"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="admin-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="admin-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 text-lg rounded-2xl pr-14"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-lg font-semibold rounded-2xl"
                      >
                        {loading ? "Signing In..." : "Sign In as Admin"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Register link */}
                {userType === "jobseeker" && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-slate-600 mb-4">Don't have an account?</p>
                      <Button
                        variant="outline"
                        className="w-full h-14 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
                        asChild
                      >
                        <Link href="/register">
                          Create Job Seeker Account
                          <ChevronRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Help & Support */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Career Support</h4>
                    <p className="text-sm text-green-700 mb-3">24/7 career guidance and job search assistance</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full rounded-xl">
                      <Phone className="w-4 h-4 mr-2" />
                      Call +255 800 JOBS
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Link href="/help/login" className="flex items-center text-sm text-blue-600 hover:underline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Login Help & Troubleshooting
                    </Link>
                    <Link href="/help/account" className="flex items-center text-sm text-blue-600 hover:underline">
                      <User className="w-4 h-4 mr-2" />
                      Account Recovery
                    </Link>
                    <Link href="/help/contact" className="flex items-center text-sm text-blue-600 hover:underline">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Recruiters
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Portal Status</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Jobs</span>
                    <span className="text-sm text-gray-900 font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm text-gray-900 font-medium">&lt; 2 seconds</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-8 mt-16">
        <div className="text-center text-sm text-blue-200">
          © 2024 MRC Careers. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}
