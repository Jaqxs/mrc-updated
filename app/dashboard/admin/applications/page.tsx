"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Briefcase,
  PlusCircle,
  MapPin,
  DollarSign,
  Shield,
  Mail,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    category_id: "",
    experience: "",
    visa: "",
    salary_range: "",
    description: "",
    featured: false,
    urgent: false,
    is_active: true,
  })

  const API_BASE = "https://16564f45d94b.ngrok-free.app/api"

  // === Token helpers ===
  const getAccessToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
  const getRefreshToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null

  // === Refresh Access Token ===
  const handleTokenRefresh = useCallback(async () => {
    const refresh = getRefreshToken()
    if (!refresh) return false
    try {
      const res = await fetch(`${API_BASE}/accounts/refresh/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ refresh }),
      })
      if (!res.ok) return false
      const data = await res.json()
      localStorage.setItem("accessToken", data.access)
      return true
    } catch (error) {
      console.error("Token refresh failed:", error)
      return false
    }
  }, [API_BASE])

  // === Fetch jobs ===
  const loadJobs = useCallback(async () => {
    let token = getAccessToken()
    try {
      let res = await fetch(`${API_BASE}/jobs/`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      })

      if (res.status === 401) {
        const refreshed = await handleTokenRefresh()
        if (refreshed) {
          token = getAccessToken()
          res = await fetch(`${API_BASE}/jobs/`, {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          })
        } else {
          alert("Session expired. Please log in again.")
          window.location.href = "/login"
          return
        }
      }

      const text = await res.text()
      console.log("Jobs response:", res.status, text)

      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data = JSON.parse(text)
      setJobs(data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    }
  }, [API_BASE, handleTokenRefresh])

  // === Fetch users ===
  const loadUsers = useCallback(async () => {
    let token = getAccessToken()
    try {
      const res = await fetch(`${API_BASE}/accounts/`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      })

      if (res.status === 401) {
        const refreshed = await handleTokenRefresh()
        if (refreshed) return loadUsers()
        else return
      }
      if (!res.ok) throw new Error("Failed to fetch users")
      const text = await res.text()
      console.log("Users response:", res.status, text)
      const data = JSON.parse(text)
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }, [API_BASE, handleTokenRefresh])

  // === Fetch current admin profile ===
  const loadProfile = useCallback(async () => {
    let token = getAccessToken()
    try {
      const res = await fetch(`${API_BASE}/accounts/profile/`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      })

      if (res.status === 401) {
        const refreshed = await handleTokenRefresh()
        if (refreshed) return loadProfile()
        else return
      }

      const text = await res.text()
      console.log("Profile response:", res.status, text)
      if (!res.ok) throw new Error("Failed to fetch profile")

      const data = JSON.parse(text)
      setAdmin(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }, [API_BASE, handleTokenRefresh])

  // === Load all data ===
  useEffect(() => {
    loadProfile()
    loadJobs()
    loadUsers()
  }, [loadProfile, loadJobs, loadUsers])

  // === Add new job ===
  const handleAddJob = async () => {
    const token = getAccessToken()
    if (!newJob.title.trim() || !newJob.company.trim()) return
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/jobs/`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(newJob),
      })

      const text = await res.text()
      console.log("Create job response:", res.status, text)

      if (res.status === 401) {
        const refreshed = await handleTokenRefresh()
        if (refreshed) return handleAddJob()
        else {
          alert("Session expired. Please log in again.")
          window.location.href = "/login"
        }
      }

      if (!res.ok) throw new Error("Failed to create job")
      const createdJob = JSON.parse(text)
      setJobs([createdJob, ...jobs])
      setNewJob({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        category_id: "",
        experience: "",
        visa: "",
        salary_range: "",
        description: "",
        featured: false,
        urgent: false,
        is_active: true,
      })
    } catch (error) {
      console.error("Error creating job:", error)
    } finally {
      setLoading(false)
    }
  }

  const getBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "open":
      case "active":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="text-sm text-gray-500">
            Manage job postings, users, and system operations
          </p>
        </div>
        {admin && (
          <div className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-xl">
            <Image
              src={`https://ui-avatars.com/api/?name=${admin.first_name}+${admin.last_name}&background=4F46E5&color=fff`}
              alt="Admin Avatar"
              width={40}
              height={40}
              className="rounded-full border border-gray-300"
            />
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                {admin.first_name} {admin.last_name}
              </h4>
              <p className="text-xs text-gray-600 flex items-center">
                <Shield className="w-3 h-3 mr-1 text-blue-600" /> {admin.role}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ===== Job Section ===== */}
      <div className="p-6 grid lg:grid-cols-[40%_60%] gap-6">
        {/* ==== Left: Job Offers ==== */}
        <Card className="border-t-4 border-blue-600 h-fit">
          <CardHeader>
            <CardTitle>Job Offers</CardTitle>
            <CardDescription>Manage your current job openings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
            {jobs.length === 0 ? (
              <p className="text-gray-500 text-sm">No job offers yet.</p>
            ) : (
              jobs.map((job: any) => (
                <div
                  key={job.id}
                  className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all flex justify-between items-start"
                >
                  <div className="w-[75%]">
                    <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span>{job.title}</span>
                    </h3>
                    <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{job.location}</span>
                      <DollarSign className="w-3 h-3 ml-2" />
                      <span>{job.salary_range}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{job.description}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getBadgeColor(job.is_active ? "active" : "closed")}>
                      {job.is_active ? "Active" : "Closed"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* ==== Right: Post Job Form ==== */}
        <Card className="border-t-4 border-indigo-600 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Post a New Job</CardTitle>
            <CardDescription>Fill in job details to publish a new opportunity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Civil Engineer"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  placeholder="e.g. NHC Tanzania"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                >
                  <option value="">Select Region</option>
                  {[
                    "Arusha","Dar es Salaam","Dodoma","Geita","Iringa","Kagera","Katavi","Kigoma","Kilimanjaro",
                    "Lindi","Manyara","Mara","Mbeya","Morogoro","Mtwara","Mwanza","Njombe","Pemba North",
                    "Pemba South","Pwani","Rukwa","Ruvuma","Shinyanga","Simiyu","Singida","Songwe","Tabora",
                    "Tanga","Zanzibar North","Zanzibar South","Zanzibar Urban/West"
                  ].map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Type</Label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={newJob.type}
                  onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Category ID</Label>
                <Input
                  value={newJob.category_id}
                  onChange={(e) => setNewJob({ ...newJob, category_id: e.target.value })}
                  placeholder="e.g. 1"
                  type="number"
                />
              </div>
              <div>
                <Label>Experience</Label>
                <Input
                  value={newJob.experience}
                  onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                  placeholder="e.g. 3+ years"
                />
              </div>
              <div>
                <Label>Visa</Label>
                <Input
                  value={newJob.visa}
                  onChange={(e) => setNewJob({ ...newJob, visa: e.target.value })}
                  placeholder="e.g. Required / Not required"
                />
              </div>
            </div>

            <div>
              <Label>Salary Range</Label>
              <Input
                value={newJob.salary_range}
                onChange={(e) => setNewJob({ ...newJob, salary_range: e.target.value })}
                placeholder="e.g. 600,000–1,200,000 TZS"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                className="min-h-[120px]"
                placeholder="Describe the job requirements and responsibilities..."
              />
            </div>

            <Button className="w-full py-5 text-md" onClick={handleAddJob} disabled={loading}>
              <PlusCircle className="w-4 h-4 mr-2" />
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ===== Users List ===== */}
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
            <CardDescription>All users in the system</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((u: any) => (
              <div
                key={u.id}
                className="border p-4 rounded-xl bg-white hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${u.first_name}+${u.last_name}&background=10a37f&color=fff`}
                    alt={u.first_name}
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {u.first_name} {u.last_name}
                    </h4>
                    <p className="text-xs text-gray-600 flex items-center">
                      <Mail className="w-3 h-3 mr-1" /> {u.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{u.role}</Badge>
                  <Badge className={getBadgeColor("active")}>Active</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
