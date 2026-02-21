"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { authService, UserProfile } from "@/lib/services/auth-service"
import { jobService, JobApplication } from "@/lib/services/job-service"
import { ApiError } from "@/lib/api-client"

export default function JobSeekerDashboard() {
  const [activeTab, setActiveTab] = useState("applications")
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loadingApps, setLoadingApps] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState<Partial<UserProfile>>({
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
  const [message, setMessage] = useState<string | null>(null)

  const handleApiError = (err: any, action: string) => {
    console.error(`Error during ${action}:`, err)
    if (err instanceof ApiError) {
      if (err.status === 401) {
        window.location.href = "/login"
        return
      }
      setMessage(`❌ Failed in ${action}: ${err.message}`)
    } else {
      setMessage(`⚠️ Something went wrong while trying to ${action}.`)
    }
  }

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
      if (refreshToken) {
        await authService.logout(refreshToken)
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.clear()
      window.location.href = "/login"
    }
  }

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile()
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
        handleApiError(err, "load profile")
      }
    }

    fetchProfile()
  }, [])

  // ✅ Update profile
  const updateProfile = async () => {
    try {
      const updatedProfile = await authService.updateProfile(profileForm)
      setProfile(updatedProfile)
      setEditingProfile(false)
      setMessage("✅ Profile updated successfully!")
    } catch (err) {
      handleApiError(err, "update profile")
    }
  }

  // ✅ Fetch user job applications
  const fetchApplications = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      else setLoadingApps(true)

      const data = await jobService.getApplications()
      setApplications(data)
    } catch (err) {
      handleApiError(err, "load applications")
    } finally {
      setLoadingApps(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/4 -right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  HRN RECRUITMENT AGENCY
                </h1>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Dashboard</p>
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
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/20 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl tracking-tight">
                      {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
                    </h3>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30 mt-1 uppercase tracking-widest text-[10px] font-bold">
                      {profile?.role || "Fetching..."}
                    </Badge>
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
              <div className="p-8 sm:p-10 glass border-white/20 shadow-2xl rounded-3xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">My Applications</h2>
                  {refreshing && <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />}
                </div>

                {/* Application Statistics */}
                {applications.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div className="glass-dark border-white/10 p-6 rounded-2xl text-center group hover:scale-105 transition-all">
                      <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                      <p className="text-3xl font-extrabold text-white">
                        {applications.filter(app => !app.status || app.status === "pending").length}
                      </p>
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">Pending</p>
                    </div>
                    <div className="glass-dark border-white/10 p-6 rounded-2xl text-center group hover:scale-105 transition-all">
                      <AlertCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <p className="text-3xl font-extrabold text-white">
                        {applications.filter(app => app.status === "under_review").length}
                      </p>
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">Review</p>
                    </div>
                    <div className="glass-dark border-white/10 p-6 rounded-2xl text-center group hover:scale-105 transition-all">
                      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <p className="text-3xl font-extrabold text-white">
                        {applications.filter(app => app.status === "accepted").length}
                      </p>
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">Accepted</p>
                    </div>
                    <div className="glass-dark border-white/10 p-6 rounded-2xl text-center group hover:scale-105 transition-all">
                      <XCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                      <p className="text-3xl font-extrabold text-white">
                        {applications.filter(app => app.status === "rejected").length}
                      </p>
                      <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">Rejected</p>
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
                          className="glass border-white/20 hover:border-blue-500/30 transition-all duration-300 rounded-2xl overflow-hidden group"
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
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">My Profile</h2>
                  <Button
                    variant={editingProfile ? "outline" : "gradient"}
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="rounded-xl px-6 font-bold"
                  >
                    {editingProfile ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Cancel Edit
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                {editingProfile ? (
                  <Card className="glass border-white/20 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl">
                    <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
                      <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
                      <CardDescription className="text-blue-50">Keep your professional information up to date</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">First Name</Label>
                          <Input
                            type="text"
                            value={profileForm.first_name}
                            onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                            className="h-12 border-2 rounded-xl focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">Last Name</Label>
                          <Input
                            type="text"
                            value={profileForm.last_name}
                            onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                            className="h-12 border-2 rounded-xl focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">Email</Label>
                          <Input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">Phone</Label>
                          <Input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="h-12 border-2 rounded-xl focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">Current Location</Label>
                          <Input
                            type="text"
                            value={profileForm.current_location}
                            onChange={(e) => setProfileForm({ ...profileForm, current_location: e.target.value })}
                            className="h-12 border-2 rounded-xl focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">Nationality</Label>
                          <Input
                            type="text"
                            value={profileForm.nationality}
                            onChange={(e) => setProfileForm({ ...profileForm, nationality: e.target.value })}
                            className="h-12 border-2 rounded-xl focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">Education</Label>
                          <Input
                            type="text"
                            value={profileForm.education}
                            onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                            className="h-12 border-2 rounded-xl focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-bold ml-1">Experience</Label>
                          <Input
                            type="text"
                            value={profileForm.experience}
                            onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
                            className="h-12 border-2 rounded-xl focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-bold ml-1">Skills</Label>
                        <Textarea
                          value={profileForm.skills}
                          onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                          rows={4}
                          className="border-2 rounded-xl focus:border-blue-500 transition-all"
                          placeholder="List your professional skills..."
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button onClick={updateProfile} variant="gradient" className="px-8 font-bold rounded-xl shadow-lg">
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingProfile(false)}
                          className="px-8 font-bold rounded-xl"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-10">
                    <Card className="glass border-white/20 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl group hover:border-blue-500/30 transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                        <CardTitle className="text-2xl font-bold flex items-center">
                          <User className="w-6 h-6 mr-3" />
                          Personal Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <span className="text-slate-500 font-medium">Full Name</span>
                          <span className="text-slate-900 font-bold">{profile.first_name} {profile.last_name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <span className="text-slate-500 font-medium">Email</span>
                          <span className="text-slate-900 font-bold">{profile.email}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <span className="text-slate-500 font-medium">Phone</span>
                          <span className="text-slate-900 font-bold">{profile.phone || "Not provided"}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <span className="text-slate-500 font-medium">Location</span>
                          <span className="text-slate-900 font-bold">{profile.current_location || "Not provided"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Nationality</span>
                          <span className="text-slate-900 font-bold">{profile.nationality || "Not provided"}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass border-white/20 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl group hover:border-purple-500/30 transition-all duration-300">
                      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
                        <CardTitle className="text-2xl font-bold flex items-center">
                          <Briefcase className="w-6 h-6 mr-3" />
                          Professional Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                          <span className="text-slate-500 font-medium block">Education</span>
                          <p className="text-slate-900 font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">{profile.education || "Not provided"}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-slate-500 font-medium block">Experience</span>
                          <p className="text-slate-900 font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">{profile.experience || "Not provided"}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-slate-500 font-medium block">Skills</span>
                          <div className="flex flex-wrap gap-2">
                            {profile.skills ? profile.skills.split(',').map((skill: string, i: number) => (
                              <Badge key={i} variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 px-3 py-1">
                                {skill.trim()}
                              </Badge>
                            )) : <span className="text-slate-400 italic">No skills listed</span>}
                          </div>
                        </div>
                        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Member Since</span>
                          <span className="text-indigo-600 font-bold">{profile?.date_joined ? new Date(profile.date_joined).toLocaleDateString() : 'N/A'}</span>
                        </div>
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
