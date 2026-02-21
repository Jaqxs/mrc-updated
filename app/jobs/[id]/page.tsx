"use client"
export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MapPin, Briefcase, Clock, ArrowRight, CheckCircle } from "lucide-react"
import { jobService, Job } from "@/lib/services/job-service"
import { ApiError } from "@/lib/api-client"

export default function JobDetails() {
  const params = useParams()
  const router = useRouter()
  const jobId = params?.id
  const [job, setJob] = useState<Job | null>(null)
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

  const handleApiError = (err: any, action: string) => {
    console.error(`Error during ${action}:`, err)
    if (err instanceof ApiError) {
      alert(`❌ Failed to ${action}: ${err.message}`)
    } else {
      alert(`⚠️ Something went wrong while ${action}.`)
    }
  }

  // ✅ Check if user has already applied
  const checkApplicationStatus = async () => {
    try {
      const applications = await jobService.getApplications()
      const existingApplication = applications.find((app: any) => app.job === parseInt(jobId as string))
      if (existingApplication) {
        setHasApplied(true)
        setApplicationStatus(existingApplication.status)
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
        const data = await jobService.getJobDetails(jobId as string)
        setJob(data)
        await checkApplicationStatus()
      } catch (err) {
        handleApiError(err, "load job details")
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

    if (!localStorage.getItem("accessToken")) {
      alert("Please log in to submit your application.")
      router.push(`/login?job_id=${jobId}`)
      return
    }

    try {
      if (!formData.resume || !formData.coverLetter) {
        alert("Please upload both resume and cover letter.")
        setSubmitting(false)
        return
      }

      const payload = new FormData()
      payload.append("job", String(jobId))
      payload.append("name", formData.name)
      payload.append("email", formData.email)
      payload.append("phone", formData.phone)
      payload.append("resume", formData.resume)
      payload.append("cover_letter", formData.coverLetter)

      await jobService.submitApplication(payload)
      alert("✅ Application submitted successfully!")
      router.push("/dashboard/jobseeker")
    } catch (err) {
      handleApiError(err, "submit application")
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/4 -right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
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
        <Card className="glass border-white/20 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl mb-12">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-10">
            <CardTitle className="text-4xl font-extrabold tracking-tight mb-2">{job.title}</CardTitle>
            <CardDescription className="text-blue-50 text-xl font-medium">{job.company}</CardDescription>
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
        <Card className="glass border-white/20 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl">
          <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white p-8">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {hasApplied ? "Application Status" : "Apply for this job"}
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg">
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
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                  variant="gradient"
                  className="w-full h-14 text-xl font-bold rounded-2xl shadow-xl shadow-blue-500/20 mt-6"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                  {!submitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
