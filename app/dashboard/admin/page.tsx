"use client"

import { useState, useEffect } from "react"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Briefcase, UserCircle2, CheckCircle, XCircle, Eye, FileText, Trash2, Power, PowerOff, Edit, RefreshCw, ArrowLeft, LogOut } from "lucide-react"

// ---------- CONSTANTS ----------
const TANZANIA_REGIONS = [
  "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi",
  "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro",
  "Mtwara", "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani", "Rukwa",
  "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Songwe", "Tabora", "Tanga",
  "Zanzibar North", "Zanzibar South", "Zanzibar Urban/West"
]

const VISA_OPTIONS = ["Required", "Not Required", "Optional"]

// ---------- TYPES ----------
interface JobForm {
  title: string
  company: string
  location: string
  type: string
  category: number | null
  experience: string
  visa: string
  salary_range: string
  description: string
  featured: boolean
  urgent: boolean
  is_active: boolean
}

interface Category {
  id: number
  name: string
}

interface UserProfile {
  id?: number
  first_name?: string
  last_name?: string
  email?: string
  role?: string
  is_staff?: boolean
  is_superuser?: boolean
  is_active?: boolean
}

// ---------- MAIN COMPONENT ----------
export default function JobManagementPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("overview")
  const [editingJob, setEditingJob] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const [newJob, setNewJob] = useState<JobForm>({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    category: null,
    experience: "",
    visa: "",
    salary_range: "",
    description: "",
    featured: false,
    urgent: false,
    is_active: true,
  })

  // ---------- TOKEN / AUTH ----------
  const refreshAccessToken = async (): Promise<string | null> => {
    const refresh = localStorage.getItem("refreshToken")
    if (!refresh) return null
    try {
      const res = await fetch("https://1f657a1b9206.ngrok-free.app/api/accounts/refresh/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ refresh }),
      })
      if (!res.ok) throw new Error("Failed to refresh token")
      const data = await res.json()
      localStorage.setItem("accessToken", data.access)
      return data.access
    } catch {
      return null
    }
  }

  const authorizedFetch = async (url: string, options: any = {}) => {
    let token = localStorage.getItem("accessToken")
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    }
    let res = await fetch(url, { ...options, headers })
    if (res.status === 401) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        const retryHeaders = { ...options.headers, Authorization: `Bearer ${newToken}` }
        res = await fetch(url, { ...options, headers: retryHeaders })
      }
    }
    return res
  }

  // ---------- FETCH DATA ----------
  const fetchJobs = async () => {
    try {
      const res = await authorizedFetch("https://1f657a1b9206.ngrok-free.app/api/jobs/admin/all/")
      if (!res.ok) throw new Error("Failed to fetch jobs")
      setJobs(await res.json())
    } catch {
      setMessage("⚠️ Failed to load jobs.")
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://1f657a1b9206.ngrok-free.app/api/jobs/categories/", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      if (!res.ok) throw new Error("Failed to fetch categories")
      setCategories(await res.json())
    } catch {
      setMessage("⚠️ Failed to load categories.")
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await authorizedFetch("https://1f657a1b9206.ngrok-free.app/api/users/")
      if (!res.ok) throw new Error("Failed to fetch users")
      setUsers(await res.json())
    } catch {
      setMessage("⚠️ Failed to load users.")
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await authorizedFetch("https://1f657a1b9206.ngrok-free.app/api/accounts/profile/")
      if (!res.ok) throw new Error("Failed to fetch profile")
      setProfile(await res.json())
    } catch {
      setMessage("⚠️ Failed to load profile.")
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await authorizedFetch("https://1f657a1b9206.ngrok-free.app/api/jobs/applications/all/")
      if (!res.ok) throw new Error("Failed to fetch job applications")
      setApplications(await res.json())
    } catch {
      setMessage("⚠️ Failed to load applications.")
    }
  }

  // ✅ Update application status
  const updateApplicationStatus = async (applicationId: number, status: string) => {
    setLoading(true)
    try {
      const res = await authorizedFetch(`https://1f657a1b9206.ngrok-free.app/api/jobs/applications/update/${applicationId}/`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      
      if (!res.ok) throw new Error("Failed to update application status")
      
      setMessage(`✅ Application ${status} successfully!`)
      await fetchApplications() // Refresh the list
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Delete job
  const deleteJob = async (jobId: number) => {
    setJobToDelete(jobId)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!jobToDelete) return
    
    setLoading(true)
    setShowDeleteConfirm(false)
    try {
      const res = await authorizedFetch(`https://1f657a1b9206.ngrok-free.app/api/jobs/update/${jobToDelete}/`, {
        method: "DELETE",
      })
      
      if (!res.ok) throw new Error("Failed to delete job")
      
      setMessage("✅ Job deleted successfully!")
      await fetchJobs() // Refresh the list
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
      setJobToDelete(null)
    }
  }

  // ✅ Toggle job status (activate/deactivate)
  const toggleJobStatus = async (jobId: number, currentStatus: boolean) => {
    setLoading(true)
    try {
      const res = await authorizedFetch(`https://1f657a1b9206.ngrok-free.app/api/jobs/update/${jobId}/`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: !currentStatus }),
      })
      
      if (!res.ok) throw new Error("Failed to update job status")
      
      setMessage(`✅ Job ${!currentStatus ? 'activated' : 'deactivated'} successfully!`)
      await fetchJobs() // Refresh the list
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Edit job
  const editJob = (job: any) => {
    setEditingJob(job)
    setShowEditModal(true)
  }

  const updateJob = async () => {
    if (!editingJob) return
    
    setLoading(true)
    try {
      const res = await authorizedFetch(`https://1f657a1b9206.ngrok-free.app/api/jobs/update/${editingJob.id}/`, {
        method: "PATCH",
        body: JSON.stringify(editingJob),
      })
      
      if (!res.ok) throw new Error("Failed to update job")
      
      setMessage("✅ Job updated successfully!")
      setShowEditModal(false)
      setEditingJob(null)
      await fetchJobs() // Refresh the list
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // ✅ User management functions
  const viewUserDetails = (user: any) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    setLoading(true)
    try {
      const res = await authorizedFetch(`https://1f657a1b9206.ngrok-free.app/api/accounts/users/${userId}/`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: !currentStatus }),
      })
      
      if (!res.ok) throw new Error("Failed to update user status")
      
      setMessage(`✅ User ${!currentStatus ? 'activated' : 'suspended'} successfully!`)
      await fetchUsers() // Refresh the list
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
    fetchCategories()
    fetchUsers()
    fetchProfile()
    fetchApplications()
  }, [])

  // ---------- ADD JOB ----------
  const handleAddJob = async () => {
    if (!newJob.title || !newJob.company || !newJob.category) {
      setMessage("⚠️ Title, Company, and Category are required.")
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const payload = { ...newJob, category_id: newJob.category }

      const res = await authorizedFetch("https://1f657a1b9206.ngrok-free.app/api/jobs/create/", {
        method: "POST",
        body: JSON.stringify(payload),
      })

      const text = await res.text()
      if (!res.ok) throw new Error(text)

      setMessage("✅ Job created successfully!")
      setNewJob({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        category: null,
        experience: "",
        visa: "",
        salary_range: "",
        description: "",
        featured: false,
        urgent: false,
        is_active: true,
      })
      await fetchJobs()
    } catch (err: any) {
      console.error(err)
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      
      // Call backend logout endpoint
      if (refreshToken) {
        await fetch("https://1f657a1b9206.ngrok-free.app/api/accounts/logout/", {
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

  const getStatusColor = (active: boolean) =>
    active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
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
                <Briefcase className="w-4 h-4 mr-2" />
                Browse Jobs
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
        {profile && (
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <UserCircle2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-900">
                {profile.first_name} {profile.last_name}
              </span>
              <span className="text-xs text-gray-500">
                {profile.role ||
                  (profile.is_superuser
                    ? "Admin"
                    : profile.is_staff
                    ? "Staff"
                    : "User")}
              </span>
            </div>
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
        )}
      </div>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h2>
            </div>
            
            <button
              onClick={() => setActiveSection("overview")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === "overview"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveSection("applications")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === "applications"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Applications</span>
              {applications.length > 0 && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  {applications.filter(app => !app.status || app.status === "pending").length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSection("jobs")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === "jobs"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Job Listings</span>
            </button>

            <button
              onClick={() => setActiveSection("users")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === "users"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <UserCircle2 className="w-5 h-5" />
              <span>Users</span>
            </button>

            <button
              onClick={() => setActiveSection("post-job")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === "post-job"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Post New Job</span>
            </button>
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6">

      {/* NOTIFICATION */}
      {message && (
        <div
              className={`p-3 rounded-md text-sm mb-6 ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : message.startsWith("❌")
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {message}
        </div>
      )}

          {/* OVERVIEW SECTION */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* DASHBOARD OVERVIEW */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Jobs</p>
                        <p className="text-3xl font-bold">{jobs.length}</p>
                      </div>
                      <Briefcase className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Active Jobs</p>
                        <p className="text-3xl font-bold">{jobs.filter(job => job.is_active).length}</p>
                      </div>
                      <Power className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Applications</p>
                        <p className="text-3xl font-bold">{applications.length}</p>
                      </div>
                      <FileText className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Users</p>
                        <p className="text-3xl font-bold">{users.length}</p>
                      </div>
                      <UserCircle2 className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
            <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
                  <CardContent>
                    {applications.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                          <p className="font-medium">{app.job_title}</p>
                          <p className="text-sm text-gray-500">{app.applicant_first_name} {app.applicant_last_name}</p>
                        </div>
                        <Badge className={
                          app.status === "accepted" ? "bg-green-100 text-green-800" :
                          app.status === "rejected" ? "bg-red-100 text-red-800" :
                          app.status === "under_review" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {app.status || "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {jobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.company}</p>
                          {!job.is_active && (
                            <p className="text-xs text-gray-400">Hidden from public</p>
                          )}
                    </div>
                    <Badge className={getStatusColor(job.is_active)}>
                      {job.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                    ))}
            </CardContent>
          </Card>
              </div>
            </div>
          )}

          {/* APPLICATIONS SECTION */}
          {activeSection === "applications" && (
            <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Job Applications
                    </CardTitle>
                    <CardDescription>Review and manage job applications</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchApplications()}
                    disabled={loading}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
            </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No applications submitted yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{app.job_title}</h4>
                    <Badge
                      className={
                                  app.status === "accepted"
                          ? "bg-green-100 text-green-800"
                                    : app.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : app.status === "under_review"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {app.status === "under_review" ? "Under Review" : 
                                 app.status === "accepted" ? "Accepted" :
                                 app.status === "rejected" ? "Rejected" : "Pending"}
                    </Badge>
                  </div>
                            <p className="text-sm text-gray-600 mb-1">{app.job_company}</p>
                            
                            {/* Enhanced Applicant Details */}
                            <div className="bg-gray-50 p-3 rounded-lg mb-3">
                              <h5 className="text-sm font-semibold text-gray-800 mb-2">Applicant Details</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="font-medium text-gray-600">Name:</span>
                                  <span className="ml-1 text-gray-800">{app.applicant_first_name} {app.applicant_last_name}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Email:</span>
                                  <span className="ml-1 text-gray-800">{app.applicant_email}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Phone:</span>
                                  <span className="ml-1 text-gray-800">{app.phone}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Submitted:</span>
                                  <span className="ml-1 text-gray-800">{new Date(app.submitted_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            {app.resume && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(app.resume, "_blank")}
                                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                Download Resume
                              </Button>
                            )}
                            
                            {app.cover_letter && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(app.cover_letter, "_blank")}
                                className="text-purple-600 border-purple-200 hover:bg-purple-50"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                Download Cover Letter
                              </Button>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <h6 className="text-xs font-medium text-gray-600 mb-2">Actions</h6>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatus(app.id, "under_review")}
                                  disabled={loading || app.status === "under_review"}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                  title="Mark as Under Review"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Review
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatus(app.id, "accepted")}
                                  disabled={loading || app.status === "accepted"}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                  title="Accept Application"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateApplicationStatus(app.id, "rejected")}
                                  disabled={loading || app.status === "rejected"}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  title="Reject Application"
                                >
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              )}
            </CardContent>
          </Card>
          )}

          {/* JOBS SECTION */}
          {activeSection === "jobs" && (
            <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      Job Listings
                    </CardTitle>
                    <CardDescription>Manage your job postings</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchJobs()}
                    disabled={loading}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
            </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                {jobs.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No jobs posted yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{job.title}</h3>
                              <Badge className={getStatusColor(job.is_active)}>
                                {job.is_active ? "Active" : "Inactive"}
                              </Badge>
                              {!job.is_active && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  Hidden from public
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                        <p className="text-xs text-gray-500">
                              {job.salary_range} • {applications.filter(app => app.job === job.id).length} applications
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Posted: {new Date(job.posted_at).toLocaleDateString()}
                        </p>
                      </div>
                          
                          <div className="flex gap-1 ml-4">
                          <Button
                              size="sm"
                            variant="outline"
                              onClick={() => editJob(job)}
                              disabled={loading}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            
                            <Button
                            size="sm"
                              variant="outline"
                              onClick={() => toggleJobStatus(job.id, job.is_active)}
                              disabled={loading}
                              className={
                                job.is_active 
                                  ? "text-orange-600 border-orange-200 hover:bg-orange-50" 
                                  : "text-green-600 border-green-200 hover:bg-green-50"
                              }
                            >
                              {job.is_active ? <PowerOff className="w-3 h-3" /> : <Power className="w-3 h-3" />}
                          </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteJob(job.id)}
                              disabled={loading}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* USERS SECTION */}
          {activeSection === "users" && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <UserCircle2 className="w-5 h-5 text-purple-600" />
                      All Users
                    </CardTitle>
                    <CardDescription>Manage registered users</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchUsers()}
                    disabled={loading}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <UserCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No users registered yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-indigo-600">
                                {user.first_name?.[0]}{user.last_name?.[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {user.first_name} {user.last_name}
                              </p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-xs text-gray-500">
                                Role: {user.role || (user.is_superuser ? "Admin" : user.is_staff ? "Staff" : "User")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                        <Badge
                          className={
                                user.is_active
                              ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                          }
                        >
                              {user.is_active ? "Active" : "Suspended"}
                        </Badge>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => viewUserDetails(user)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleUserStatus(user.id, user.is_active)}
                                disabled={loading}
                                className={
                                  user.is_active 
                                    ? "text-red-600 border-red-200 hover:bg-red-50" 
                                    : "text-green-600 border-green-200 hover:bg-green-50"
                                }
                              >
                                {user.is_active ? <PowerOff className="w-3 h-3" /> : <Power className="w-3 h-3" />}
                              </Button>
                      </div>
                    </div>
                  </div>
                      </div>
                    ))}
                  </div>
              )}
            </CardContent>
          </Card>
          )}

          {/* POST JOB SECTION */}
          {activeSection === "post-job" && (
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-green-600" />
                  Post New Job
                </CardTitle>
                <CardDescription>Create a new job posting</CardDescription>
            </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Job Title" 
                  value={newJob.title} 
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} 
                />
                <Input 
                  placeholder="Company Name" 
                  value={newJob.company} 
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })} 
                />

              <Select value={newJob.location} onValueChange={(v) => setNewJob({ ...newJob, location: v })}>
                <SelectTrigger><SelectValue placeholder="Select Region" /></SelectTrigger>
                <SelectContent>
                  {TANZANIA_REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={newJob.type} onValueChange={(v) => setNewJob({ ...newJob, type: v })}>
                <SelectTrigger><SelectValue placeholder="Select Job Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={newJob.category ? String(newJob.category) : ""}
                onValueChange={(v) => setNewJob({ ...newJob, category: Number(v) })}
              >
                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div>
                <Input 
                  placeholder="Experience (e.g. '3+ years', '2-5 years', 'Entry level', 'Senior level')" 
                  value={newJob.experience} 
                  onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })} 
                />
                <p className="text-xs text-gray-500 mt-1">
                  Examples: "3+ years", "2-5 years", "Entry level", "Senior level", "5+ years in marketing"
                </p>
              </div>

              <Select value={newJob.visa} onValueChange={(v) => setNewJob({ ...newJob, visa: v })}>
                <SelectTrigger><SelectValue placeholder="Select Visa Requirement" /></SelectTrigger>
                <SelectContent>
                  {VISA_OPTIONS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>

              <div>
                <Input 
                  placeholder="Salary Range (e.g. 'TZS 1,500,000 - 2,500,000', 'USD 800-1200', 'Negotiable')" 
                  value={newJob.salary_range} 
                  onChange={(e) => setNewJob({ ...newJob, salary_range: e.target.value })} 
                />
                <p className="text-xs text-gray-500 mt-1">
                  Examples: "TZS 1,500,000 - 2,500,000", "USD 800-1200", "Negotiable", "Competitive", "Based on experience"
                </p>
              </div>
                <div>
                  <Textarea 
                    placeholder="Job Description - Include responsibilities, requirements, benefits, and company information" 
                    value={newJob.description} 
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} 
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include: Key responsibilities, required skills, qualifications, benefits, company culture, and application instructions
                  </p>
                </div>

                <div className="space-y-2">
                {["featured", "urgent", "is_active"].map((field) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox
                      checked={(newJob as any)[field]}
                      onCheckedChange={(v) => setNewJob({ ...newJob, [field]: !!v })}
                    />
                      <Label className="text-sm">{field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Label>
                  </div>
                ))}
              </div>

              <Button onClick={handleAddJob} disabled={loading} className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                {loading ? "Publishing..." : "Publish Job"}
              </Button>
            </CardContent>
          </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && jobToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Job</h3>
            <p className="text-gray-600 mb-2">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            {applications.filter(app => app.job === jobToDelete).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800">
                  ⚠️ This job has {applications.filter(app => app.job === jobToDelete).length} application(s) that will also be deleted.
                </p>
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setJobToDelete(null)
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete Job"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Job</h3>
            
            <div className="space-y-4">
              <Input 
                placeholder="Job Title" 
                value={editingJob.title || ""} 
                onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })} 
              />
              <Input 
                placeholder="Company Name" 
                value={editingJob.company || ""} 
                onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })} 
              />

              <Select 
                value={editingJob.location || ""} 
                onValueChange={(v) => setEditingJob({ ...editingJob, location: v })}
              >
                <SelectTrigger><SelectValue placeholder="Select Region" /></SelectTrigger>
                <SelectContent>
                  {TANZANIA_REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select 
                value={editingJob.type || ""} 
                onValueChange={(v) => setEditingJob({ ...editingJob, type: v })}
              >
                <SelectTrigger><SelectValue placeholder="Select Job Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={editingJob.category ? String(editingJob.category) : ""}
                onValueChange={(v) => setEditingJob({ ...editingJob, category: Number(v) })}
              >
                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div>
                <Input 
                  placeholder="Experience (e.g. '3+ years', '2-5 years', 'Entry level', 'Senior level')" 
                  value={editingJob.experience || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })} 
                />
                <p className="text-xs text-gray-500 mt-1">
                  Examples: "3+ years", "2-5 years", "Entry level", "Senior level", "5+ years in marketing"
                </p>
              </div>

              <Select 
                value={editingJob.visa || ""} 
                onValueChange={(v) => setEditingJob({ ...editingJob, visa: v })}
              >
                <SelectTrigger><SelectValue placeholder="Select Visa Requirement" /></SelectTrigger>
                <SelectContent>
                  {VISA_OPTIONS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>

              <div>
                <Input 
                  placeholder="Salary Range (e.g. 'TZS 1,500,000 - 2,500,000', 'USD 800-1200', 'Negotiable')" 
                  value={editingJob.salary_range || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, salary_range: e.target.value })} 
                />
                <p className="text-xs text-gray-500 mt-1">
                  Examples: "TZS 1,500,000 - 2,500,000", "USD 800-1200", "Negotiable", "Competitive", "Based on experience"
                </p>
              </div>
              <div>
                <Textarea 
                  placeholder="Job Description - Include responsibilities, requirements, benefits, and company information" 
                  value={editingJob.description || ""} 
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })} 
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include: Key responsibilities, required skills, qualifications, benefits, company culture, and application instructions
                </p>
              </div>

              <div className="space-y-2">
                {["featured", "urgent", "is_active"].map((field) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox
                      checked={editingJob[field] || false}
                      onCheckedChange={(v) => setEditingJob({ ...editingJob, [field]: !!v })}
                    />
                    <Label className="text-sm">{field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditModal(false)
                  setEditingJob(null)
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={updateJob}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Job"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Details</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <p className="text-sm text-gray-900">{selectedUser.first_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <p className="text-sm text-gray-900">{selectedUser.last_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-sm text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-sm text-gray-900">{selectedUser.phone || "Not provided"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-sm text-gray-900">{selectedUser.current_location || "Not provided"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <p className="text-sm text-gray-900">{selectedUser.nationality || "Not provided"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <p className="text-sm text-gray-900">{selectedUser.role || (selectedUser.is_superuser ? "Admin" : selectedUser.is_staff ? "Staff" : "User")}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Badge className={selectedUser.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {selectedUser.is_active ? "Active" : "Suspended"}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <p className="text-sm text-gray-900">{new Date(selectedUser.date_joined).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                  <p className="text-sm text-gray-900">{selectedUser.education || "Not provided"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <p className="text-sm text-gray-900">{selectedUser.experience || "Not provided"}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <p className="text-sm text-gray-900">{selectedUser.skills || "Not provided"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUserModal(false)
                  setSelectedUser(null)
                }}
                disabled={loading}
              >
                Close
              </Button>
              <Button
                onClick={() => toggleUserStatus(selectedUser.id, selectedUser.is_active)}
                disabled={loading}
                className={selectedUser.is_active ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              >
                {loading ? "Processing..." : selectedUser.is_active ? "Suspend User" : "Activate User"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
