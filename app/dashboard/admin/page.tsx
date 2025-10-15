"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, PlusCircle, Eye, Briefcase } from "lucide-react"

export default function JobManagementPage() {
  // --- Admin info ---
  const admin = {
    name: "Alexander Mwakalinga",
    email: "alex@mrc.go.tz",
    role: "System Administrator",
    lastLogin: "2025-10-14 09:15",
    photo: "https://ui-avatars.com/api/?name=Alexander+Mwakalinga&background=4F46E5&color=fff",
  }

  // --- State for jobs ---
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      location: "Dubai, UAE",
      salary: "USD 80,000",
      description: "Develop and maintain scalable software systems.",
      status: "open",
    },
    {
      id: 2,
      title: "Nurse",
      location: "Saudi Arabia",
      salary: "USD 45,000",
      description: "Provide patient care in a leading hospital.",
      status: "open",
    },
  ])

  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
  })

  // --- Handle new job ---
  const handleAddJob = () => {
    if (!newJob.title) return
    setJobs([
      ...jobs,
      {
        id: jobs.length + 1,
        ...newJob,
        status: "open",
      },
    ])
    setNewJob({ title: "", location: "", salary: "", description: "", requirements: "" })
  }

  // --- Users in system ---
  const users = [
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@email.com",
      role: "Job Seeker",
      status: "active",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Job Seeker",
      status: "inactive",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@mrc.go.tz",
      role: "Admin",
      status: "active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "open":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* ========== Admin Profile Card ========== */}
      <Card>
        <CardContent className="flex items-center space-x-6 p-6">
          <img
            src={admin.photo}
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{admin.name}</h2>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-sm text-gray-500">Role: {admin.role}</p>
            <p className="text-sm text-gray-500">Last Login: {admin.lastLogin}</p>
          </div>
        </CardContent>
      </Card>

      {/* ========== Job Posting Section ========== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Job Posting Form */}
        <Card>
          <CardHeader>
            <CardTitle>Post a New Job Offer</CardTitle>
            <CardDescription>Fill in job details and publish instantly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Job Title</Label>
              <Input
                placeholder="e.g. Civil Engineer"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                placeholder="e.g. Qatar, Doha"
                value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              />
            </div>
            <div>
              <Label>Salary (USD)</Label>
              <Input
                placeholder="e.g. 60,000"
                value={newJob.salary}
                onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
              />
            </div>
            <div>
              <Label>Job Description</Label>
              <Textarea
                placeholder="Short summary of the position..."
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Textarea
                placeholder="List main requirements..."
                value={newJob.requirements}
                onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
              />
            </div>
            <Button onClick={handleAddJob} className="w-full">
              <PlusCircle className="w-4 h-4 mr-2" />
              Post Job Offer
            </Button>
          </CardContent>
        </Card>

        {/* Job Offers List */}
        <Card>
          <CardHeader>
            <CardTitle>Active Job Offers</CardTitle>
            <CardDescription>Manage and edit your current job listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border p-4 rounded-lg flex justify-between items-start hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>{job.title}</span>
                  </h3>
                  <p className="text-sm text-gray-600">{job.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{job.salary}</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{job.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ========== User Profiles Section ========== */}
      <Card>
        <CardHeader>
          <CardTitle>User Profiles</CardTitle>
          <CardDescription>All registered users in the system</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded-lg bg-white hover:shadow-md transition"
            >
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=10a37f&color=fff`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="outline">{user.role}</Badge>
                <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
              </div>
              <Button size="sm" variant="outline" className="mt-3 w-full">
                <Eye className="w-4 h-4 mr-2" /> View Profile
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
