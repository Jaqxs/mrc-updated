"use client"
export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function JobDetails() {
  const params = useParams()
  const router = useRouter()
  const jobId = params?.id
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  })

  useEffect(() => {
    if (!jobId) return
    async function fetchJob() {
      try {
        const res = await fetch(`https://16564f45d94b.ngrok-free.app/api/jobs/${jobId}/`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        })
        if (!res.ok) throw new Error("Failed to fetch job details")
        const data = await res.json()
        setJob(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [jobId])

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form Data:", formData)
    alert("✅ Application submitted successfully!")
  }

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Job not found.</p>
        <Button onClick={() => router.push("/jobs")} className="mt-4">
          Back to Jobs
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/jobs")} className="flex items-center text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Job Listings
        </Button>
      </div>

      {/* ✅ Job Info Section */}
      <Card className="shadow-md mb-8 border-blue-100">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-bold text-blue-700">{job.title}</CardTitle>
          <CardDescription className="text-gray-600">{job.company}</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-3 text-gray-700">
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-blue-500" />
              {job.type}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              {job.experience}
            </div>
          </div>

          <div className="mt-2 text-green-600 font-semibold">{job.salary_range}</div>

          <p className="leading-relaxed text-gray-700">{job.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.category && (
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {typeof job.category === "object" ? job.category.name : job.category}
              </span>
            )}
            {job.visa && (
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">{job.visa}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ✅ Application Form Section */}
      <Card className="shadow-md border-blue-100">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-bold">Apply for this job</CardTitle>
          <CardDescription>Fill out the form below to submit your application</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="resume">Resume (PDF/DOCX)</Label>
              <Input type="file" id="resume" name="resume" accept=".pdf,.docx" onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Write your cover letter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Submit Application
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
