"use client"
export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MapPin, Briefcase, Clock, ArrowRight, CheckCircle } from "lucide-react"

export default function JobDetails() {
  const params = useParams()
  const router = useRouter()
  const jobId = params?.id
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: null as File | null,
  })

  // ✅ Check if user has already applied
  const checkApplicationStatus = async () => {
    const token = localStorage.getItem("accessToken")
    if (!token) return

    try {
      const res = await fetch(`https://61be114a8e8f.ngrok-free.app/api/jobs/applications/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      })
      if (res.ok) {
        const applications = await res.json()
        const existingApplication = applications.find((app: any) => app.job === parseInt(jobId as string))
        if (existingApplication) {
          setHasApplied(true)
          setApplicationStatus(existingApplication.status)
        }
      }
    } catch (error) {
      console.error("Error checking application status:", error)
    }
  }

  // ✅ Fetch job details
  useEffect(() => {
    if (!jobId) return
    async function fetchJob() {
      try {
        const res = await fetch(`https://1f657a1b9206.ngrok-free.app/api/jobs/${jobId}/`, {
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) throw new Error("Failed to fetch job details")
        const data = await res.json()
        setJob(data)
        
        // Check if user has already applied
        await checkApplicationStatus()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [jobId])

  // ✅ Form change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement
      const file = fileInput.files ? fileInput.files[0] : null
      if (name === "resume") {
        setFormData((prev) => ({ ...prev, resume: file }))
      } else if (name === "coverLetter") {
        setFormData((prev) => ({ ...prev, coverLetter: file }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // ✅ Submit job application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const token = localStorage.getItem("accessToken")
    if (!token) {
      alert("Please log in to submit your application.")
      router.push(`/login?job_id=${jobId}`)
      return
    }

    try {
      if (!formData.resume) {
        alert("Please upload your resume before submitting.")
        setSubmitting(false)
        return
      }

      if (!formData.coverLetter) {
        alert("Please upload your cover letter before submitting.")
        setSubmitting(false)
        return
      }

      // ✅ Django expects job as integer, resume and cover letter as files
      const payload = new FormData()
      payload.append("job", String(jobId)) // convert to string for Django
      payload.append("name", formData.name)
      payload.append("email", formData.email)
      payload.append("phone", formData.phone)
      payload.append("resume", formData.resume)
      payload.append("cover_letter", formData.coverLetter)

      const res = await fetch("https://1f657a1b9206.ngrok-free.app/api/jobs/applications/submit/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: payload, // ✅ no manual Content-Type
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error("Error response:", errorData)
        throw new Error(errorData.detail || JSON.stringify(errorData))
      }

      alert("✅ Application submitted successfully!")
      router.push("/dashboard/jobseeker")
    } catch (err: any) {
      console.error("Submit error:", err)
      alert(`❌ ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  // ✅ Loading state
  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Loading job details...</p>
      </div>
    )
  }

  // ✅ Job not found
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

  // ✅ Page content
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/jobs")}
          className="flex items-center text-blue-600"
        >
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
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                {job.visa}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ✅ Application Form Section */}
      <Card className="shadow-md border-blue-100">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-bold">
            {hasApplied ? "Application Status" : "Apply for this job"}
          </CardTitle>
          <CardDescription>
            {hasApplied 
              ? `You have already applied for this position. Current status: ${applicationStatus || 'Pending'}`
              : "Fill out the form below to submit your application"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {hasApplied ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-4">
                  Your application has been submitted successfully. You can track your application status in your dashboard.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Status:</strong> {applicationStatus || 'Pending'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => router.push('/dashboard/jobseeker')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View My Applications
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/jobs')}
                >
                  Browse More Jobs
                </Button>
              </div>
            </div>
          ) : (
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
              <Input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.docx"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="coverLetter">Cover Letter (PDF/DOCX)</Label>
              <Input
                type="file"
                id="coverLetter"
                name="coverLetter"
                accept=".pdf,.docx"
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {submitting ? "Submitting..." : "Submit Application"}
              {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
