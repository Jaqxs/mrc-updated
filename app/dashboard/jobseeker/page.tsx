"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Search,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Download,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function JobSeekerDashboard() {
  const [activeTab, setActiveTab] = useState("applications")
  const [profile, setProfile] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [loadingApps, setLoadingApps] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    current_location: "",
    nationality: "",
    education: "",
    experience: "",
    skills: "",
  })

  // ✅ Helper function to get status display
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "accepted":
        return {
          label: "Accepted",
          icon: CheckCircle,
          className: "bg-green-100 text-green-800 border-green-200",
          iconColor: "text-green-600"
        }
      case "rejected":
        return {
          label: "Rejected", 
          icon: XCircle,
          className: "bg-red-100 text-red-800 border-red-200",
          iconColor: "text-red-600"
        }
      case "under_review":
        return {
          label: "Under Review",
          icon: AlertCircle,
          className: "bg-blue-100 text-blue-800 border-blue-200", 
          iconColor: "text-blue-600"
        }
      default:
        return {
          label: "Pending",
          icon: Clock,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          iconColor: "text-yellow-600"
        }
    }
  }

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      
      // Call backend logout endpoint
      if (refreshToken) {
        await fetch("https://eedf83f6497e.ngrok-free.app/api/accounts/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Continue with frontend logout even if backend fails
    } finally {
      // Clear frontend storage
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("role")
      localStorage.removeItem("email")
      localStorage.removeItem("first_name")
      window.location.href = "/login"
    }
  }

  // ✅ Fetch user profile (works fine)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("accessToken")
        const refresh = localStorage.getItem("refreshToken")

        let response = await fetch("http://localhost:8000/api/accounts/profile/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        // 🔁 Token refresh logic
        if (response.status === 401 && refresh) {
          const refreshResponse = await fetch("http://localhost:8000/api/accounts/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
          })

          if (refreshResponse.ok) {
            const newTokens = await refreshResponse.json()
            localStorage.setItem("accessToken", newTokens.access)
            token = newTokens.access

            // Retry fetch
            response = await fetch("http://localhost:8000/api/accounts/profile/", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
          } else {
            throw new Error("Session expired")
          }
        }

        if (!response.ok) throw new Error(`Error: ${response.status}`)

        const data = await response.json()
        setProfile(data)
        setProfileForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          current_location: data.current_location || "",
          nationality: data.nationality || "",
          education: data.education || "",
          experience: data.experience || "",
          skills: data.skills || "",
        })
      } catch (err) {
        console.error("Profile fetch error:", err)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
      }
    }

    fetchProfile()
  }, [])

  // ✅ Update profile
  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if (!token) return

      const res = await fetch("https://eedf83f6497e.ngrok-free.app/api/accounts/profile/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileForm),
      })

      if (res.ok) {
        const updatedProfile = await res.json()
        setProfile(updatedProfile)
        setEditingProfile(false)
        setMessage("✅ Profile updated successfully!")
      } else {
        setMessage("❌ Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage("❌ Error updating profile")
    }
  }

  // ✅ Fetch user job applications (updated with same refresh logic)
  const fetchApplications = async (isRefresh = false) => {
      try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoadingApps(true)
      }
      
        let token = localStorage.getItem("accessToken")
        const refresh = localStorage.getItem("refreshToken")

        let res = await fetch("http://localhost:8000/api/jobs/applications/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        })

        // 🔁 Refresh token if unauthorized
        if (res.status === 401 && refresh) {
          const refreshResponse = await fetch("http://localhost:8000/api/accounts/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
          })

          if (refreshResponse.ok) {
            const newTokens = await refreshResponse.json()
            localStorage.setItem("accessToken", newTokens.access)
            token = newTokens.access

            // Retry applications fetch
            res = await fetch("http://localhost:8000/api/jobs/applications/", {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            })
          } else {
            throw new Error("Session expired")
          }
        }

        if (!res.ok) throw new Error(`Error: ${res.status}`)

        const data = await res.json()
        setApplications(data)
      } catch (error) {
        console.error("Applications fetch error:", error)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
      } finally {
        setLoadingApps(false)
      setRefreshing(false)
      }
    }

  useEffect(() => {
    fetchApplications()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MRC CAREERS
                </h1>
                <p className="text-xs text-slate-500">Job Seeker Dashboard</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = "/"}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = "/jobs"}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Search className="w-4 h-4 mr-2" />
                Browse Jobs
              </Button>
              {activeTab === "applications" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fetchApplications(true)}
                  disabled={refreshing}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {refreshing ? "Refreshing..." : "Refresh Status"}
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
                    </h3>
                    <p className="text-blue-100">{profile?.role || "Fetching role..."}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-2">
                <Button
                  variant={activeTab === "applications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("applications")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  My Applications
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/jobs">
                  <Search className="w-4 h-4 mr-2" />
                  Find Jobs
                  </Link>
                </Button>

                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* ✅ My Applications Tab */}
            {activeTab === "applications" && (
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">My Applications</h2>
                
                {/* Application Statistics */}
                {applications.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-yellow-800">
                        {applications.filter(app => !app.status || app.status === "pending").length}
                      </p>
                      <p className="text-sm text-yellow-700">Pending</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <AlertCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-800">
                        {applications.filter(app => app.status === "under_review").length}
                      </p>
                      <p className="text-sm text-blue-700">Under Review</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-800">
                        {applications.filter(app => app.status === "accepted").length}
                      </p>
                      <p className="text-sm text-green-700">Accepted</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-red-800">
                        {applications.filter(app => app.status === "rejected").length}
                      </p>
                      <p className="text-sm text-red-700">Rejected</p>
                    </div>
                  </div>
                )}

                {loadingApps ? (
                  <p className="text-slate-500">Loading your applications...</p>
                ) : applications.length === 0 ? (
                  <p className="text-slate-600">You have not applied to any jobs yet.</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => {
                      const statusDisplay = getStatusDisplay(app.status || "pending")
                      const StatusIcon = statusDisplay.icon
                      
                      return (
                      <Card
                        key={app.id}
                        className="border border-blue-100 hover:shadow-md transition-shadow"
                      >
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-slate-800 text-lg">{app.job_title}</h3>
                                  <Badge className={`${statusDisplay.className} flex items-center gap-1`}>
                                    <StatusIcon className={`w-3 h-3 ${statusDisplay.iconColor}`} />
                                    {statusDisplay.label}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{app.job_company}</p>
                                <p className="text-xs text-gray-500 mb-3">
                              Submitted on {new Date(app.submitted_at).toLocaleDateString()}
                            </p>
                                
                                {/* Status-specific messages */}
                                {app.status === "accepted" && (
                                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-green-800 font-medium">
                                      🎉 Congratulations! Your application has been accepted. 
                                      You should receive further instructions soon.
                                    </p>
                                  </div>
                                )}
                                
                                {app.status === "rejected" && (
                                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-red-800">
                                      Unfortunately, your application was not selected for this position. 
                                      Don't give up - keep applying to other opportunities!
                                    </p>
                                  </div>
                                )}
                                
                                {app.status === "under_review" && (
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-blue-800">
                                      Your application is currently being reviewed by our team. 
                                      We'll get back to you with an update soon.
                                    </p>
                                  </div>
                                )}
                                
                                {(!app.status || app.status === "pending") && (
                                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-yellow-800">
                                      Your application has been received and is pending review. 
                                      We'll update you on the status soon.
                                    </p>
                                  </div>
                                )}
                          </div>
                              
                              <div className="flex flex-col gap-2 ml-4">
                                {app.resume && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(app.resume, "_blank")}
                                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                  >
                                    <Download className="w-4 h-4 mr-1" /> Download Resume
                                  </Button>
                                )}
                                
                                {/* Show cover letter if available */}
                                {app.cover_letter && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(app.cover_letter, "_blank")}
                                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                                  >
                                    <Download className="w-4 h-4 mr-1" /> Download Cover Letter
                            </Button>
                                )}
                              </div>
                          </div>
                        </CardContent>
                      </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ✅ Profile Tab */}
            {activeTab === "profile" && profile && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-slate-800">My Profile</h2>
                  <Button 
                    variant="outline"
                    onClick={() => setEditingProfile(!editingProfile)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {editingProfile ? "Cancel Edit" : "Edit Profile"}
                  </Button>
                </div>

                {editingProfile ? (
                  <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            value={profileForm.first_name}
                            onChange={(e) => setProfileForm({...profileForm, first_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            value={profileForm.last_name}
                            onChange={(e) => setProfileForm({...profileForm, last_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                          <input
                            type="text"
                            value={profileForm.current_location}
                            onChange={(e) => setProfileForm({...profileForm, current_location: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                          <input
                            type="text"
                            value={profileForm.nationality}
                            onChange={(e) => setProfileForm({...profileForm, nationality: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                          <input
                            type="text"
                            value={profileForm.education}
                            onChange={(e) => setProfileForm({...profileForm, education: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                          <input
                            type="text"
                            value={profileForm.experience}
                            onChange={(e) => setProfileForm({...profileForm, experience: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                        <textarea
                          value={profileForm.skills}
                          onChange={(e) => setProfileForm({...profileForm, skills: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="List your skills..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={updateProfile} className="bg-blue-600 hover:bg-blue-700">
                          Save Changes
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="shadow-lg rounded-2xl">
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</p>
                      <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>
                        <p><strong>Location:</strong> {profile.current_location || "Not provided"}</p>
                        <p><strong>Nationality:</strong> {profile.nationality || "Not provided"}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle>Professional Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>Education:</strong> {profile.education || "Not provided"}</p>
                        <p><strong>Experience:</strong> {profile.experience || "Not provided"}</p>
                        <p><strong>Skills:</strong> {profile.skills || "Not provided"}</p>
                        <p><strong>Member Since:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
