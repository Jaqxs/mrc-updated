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
} from "lucide-react"

export default function JobSeekerDashboard() {
  const [activeTab, setActiveTab] = useState("applications")
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("accessToken")
        const refresh = localStorage.getItem("refreshToken")

        let response = await fetch("https://16564f45d94b.ngrok-free.app/api/accounts/profile/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        })

        if (response.status === 401 && refresh) {
          const refreshResponse = await fetch("https://16564f45d94b.ngrok-free.app/api/accounts/refresh/", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
          })

          if (refreshResponse.ok) {
            const newData = await refreshResponse.json()
            localStorage.setItem("accessToken", newData.access)
            token = newData.access

            response = await fetch("https://16564f45d94b.ngrok-free.app/api/accounts/profile/", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            })
          } else {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            window.location.href = "/login"
            return
          }
        }

        if (!response.ok) throw new Error(`Error: ${response.status}`)

        const data = await response.json()
        setProfile(data)
      } catch (err) {
        console.error("Profile fetch error:", err)
      }
    }

    fetchProfile()
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
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("accessToken")
                  localStorage.removeItem("refreshToken")
                  window.location.href = "/login"
                }}
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

                {/* ✅ Updated: Go to jobs page */}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "http://localhost:3000/jobs")}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Jobs
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
            {activeTab === "applications" && (
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">My Applications</h2>
                <p className="text-slate-600">You have not applied to any jobs yet.</p>
              </div>
            )}

            {activeTab === "profile" && profile && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-slate-800">My Profile</h2>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</p>
                      <p><strong>Email:</strong> {profile.email}</p>
                      <p><strong>Phone:</strong> {profile.phone}</p>
                      <p><strong>Location:</strong> {profile.current_location}</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle>Professional Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p><strong>Current Role:</strong> {profile.role}</p>
                      <p><strong>Experience:</strong> {profile.experience}</p>
                      <p><strong>Education:</strong> {profile.education}</p>
                      <p><strong>Expected Salary:</strong> {profile.expected_salary}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
