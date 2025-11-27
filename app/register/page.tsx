"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Briefcase,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false) 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    currentLocation: "",
    education: "",
    experience: "",
    skills: "",
    preferredCountries: "",
    jobCategories: "",
    agreeTerms: false,
    agreePrivacy: false,
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const getStepProgress = () => (step / 4) * 100

  // ✅ added function to call Django backend
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://1f657a1b9206.ngrok-free.app/api/accounts/register/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          nationality: formData.nationality,
          current_location: formData.currentLocation,
          education: formData.education,
          experience: formData.experience,
          skills: formData.skills,
          preferred_countries: formData.preferredCountries,
          job_categories: formData.jobCategories,
          agree_terms: formData.agreeTerms,
          agree_privacy: formData.agreePrivacy,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert("❌ Registration failed: " + JSON.stringify(errorData))
        setLoading(false)
        return
      }

      alert("✅ Account created successfully!")
      window.location.href = "/dashboard/jobseeker"
    } catch (error) {
      console.error("Error during registration:", error)
      alert("⚠️ Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                Support: +255 123 456 789
              </span>
              <span className="flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                careers@mrc.go.tz
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/help" className="hover:underline">
                Help
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MRC CAREERS</h1>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Global Job Recruitment</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
                Jobs
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Register</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Registration Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center">
                        <User className="w-6 h-6 mr-2" />
                        Create Your Job Seeker Account
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        Join thousands finding overseas employment opportunities
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white text-blue-600">
                      Step {step} of 4
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Progress value={getStepProgress()} className="h-2 bg-blue-500" />
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                        <p className="text-gray-600">Let's start with your basic details</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">We'll use this to send you job alerts and updates</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+255 123 456 789"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">Include country code (e.g., +255 for Tanzania)</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nationality" className="text-sm font-medium">
                            Nationality <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.nationality}
                            onValueChange={(value) => setFormData({ ...formData, nationality: value })}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select nationality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tanzania">Tanzania</SelectItem>
                              <SelectItem value="kenya">Kenya</SelectItem>
                              <SelectItem value="uganda">Uganda</SelectItem>
                              <SelectItem value="rwanda">Rwanda</SelectItem>
                              <SelectItem value="burundi">Burundi</SelectItem>
                              <SelectItem value="ethiopia">Ethiopia</SelectItem>
                              <SelectItem value="somalia">Somalia</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currentLocation" className="text-sm font-medium">
                            Current Location <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="currentLocation"
                            placeholder="City, Country"
                            value={formData.currentLocation}
                            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                            className="h-11"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Background</h3>
                        <p className="text-gray-600">Tell us about your education and work experience</p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900">Why do we need this?</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              This information helps us match you with the right job opportunities and provide relevant
                              career guidance.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="education" className="text-sm font-medium">
                          Highest Education Level <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.education}
                          onValueChange={(value) => setFormData({ ...formData, education: value })}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select your education level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary">Primary Education</SelectItem>
                            <SelectItem value="secondary">Secondary Education</SelectItem>
                            <SelectItem value="certificate">Certificate/Diploma</SelectItem>
                            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="master">Master's Degree</SelectItem>
                            <SelectItem value="phd">PhD/Doctorate</SelectItem>
                            <SelectItem value="vocational">Vocational Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-sm font-medium">
                          Work Experience <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => setFormData({ ...formData, experience: value })}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                            <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                            <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                            <SelectItem value="senior">Senior (5-10 years)</SelectItem>
                            <SelectItem value="expert">Expert (10+ years)</SelectItem>
                            <SelectItem value="student">Student/Fresh Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills" className="text-sm font-medium">
                          Key Skills <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="skills"
                          placeholder="List your main skills (e.g., Construction, Healthcare, IT, Languages, etc.)"
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          className="min-h-[100px]"
                        />
                        <p className="text-xs text-gray-500">
                          Separate skills with commas. Include technical skills, languages, and certifications.
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Preferences</h3>
                        <p className="text-gray-600">Tell us about your ideal job opportunities</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredCountries" className="text-sm font-medium">
                          Preferred Work Countries <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="preferredCountries"
                          placeholder="List countries where you'd like to work (e.g., UAE, Saudi Arabia, Qatar, Canada, etc.)"
                          value={formData.preferredCountries}
                          onChange={(e) => setFormData({ ...formData, preferredCountries: e.target.value })}
                          className="min-h-[80px]"
                        />
                        <p className="text-xs text-gray-500">
                          Separate countries with commas. We'll prioritize opportunities in these locations.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobCategories" className="text-sm font-medium">
                          Interested Job Categories <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="jobCategories"
                          placeholder="Select job categories you're interested in (e.g., Healthcare, Construction, Hospitality, IT, etc.)"
                          value={formData.jobCategories}
                          onChange={(e) => setFormData({ ...formData, jobCategories: e.target.value })}
                          className="min-h-[80px]"
                        />
                        <p className="text-xs text-gray-500">
                          This helps us send you relevant job alerts and opportunities.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                          Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="pr-12 h-11"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="text-xs text-gray-600 space-y-1">
                            <p>Password must contain:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li>At least 8 characters</li>
                              <li>One uppercase letter</li>
                              <li>One lowercase letter</li>
                              <li>One number</li>
                              <li>One special character</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirm Password <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="h-11"
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
                        <p className="text-gray-600">Please review and accept our terms to complete registration</p>
                      </div>

                      <div className="bg-gray-50 border rounded-lg p-6 max-h-64 overflow-y-auto">
                        <h4 className="font-semibold text-gray-900 mb-3">MRC Careers Terms of Service</h4>
                        <div className="text-sm text-gray-700 space-y-3">
                          <p>
                            By registering for MRC Careers, you agree to provide accurate and complete information about
                            your professional background and job preferences. You are responsible for maintaining the
                            confidentiality of your account credentials.
                          </p>
                          <p>
                            MRC Careers is a job recruitment platform that connects job seekers with overseas employment
                            opportunities. All job placements are subject to employer requirements, visa regulations,
                            and applicable laws.
                          </p>
                          <p>
                            Your personal and professional information will be shared with potential employers and
                            recruitment partners to facilitate job matching. We are committed to protecting your privacy
                            and maintaining the confidentiality of your information.
                          </p>
                          <p>
                            You agree to use the platform only for legitimate job seeking purposes and in accordance
                            with these terms. Misuse of the platform may result in account suspension or termination.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                            className="mt-1"
                          />
                          <Label htmlFor="terms" className="text-sm leading-relaxed">
                            I have read and agree to the{" "}
                            <Link href="/terms" className="text-blue-600 hover:underline" target="_blank">
                              Terms of Service
                            </Link>{" "}
                            and understand my rights and responsibilities as a job seeker on the MRC Careers platform.
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="privacy"
                            checked={formData.agreePrivacy}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, agreePrivacy: checked as boolean })
                            }
                            className="mt-1"
                          />
                          <Label htmlFor="privacy" className="text-sm leading-relaxed">
                            I agree to the{" "}
                            <Link href="/privacy" className="text-blue-600 hover:underline" target="_blank">
                              Privacy Policy
                            </Link>{" "}
                            and consent to sharing my profile with potential employers and recruitment partners for job
                            matching purposes.
                          </Label>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900">Data Protection</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              All your information is encrypted and stored securely. Your profile will only be shared
                              with verified employers and recruitment partners.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    {step > 1 ? (
                      <Button variant="outline" onClick={handlePrev} className="flex items-center bg-transparent">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {step < 4 ? (
                      <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 flex items-center">
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      // ✅ changed: final button now calls handleSubmit
                      <Button
                        onClick={handleSubmit}
                        disabled={!formData.agreeTerms || !formData.agreePrivacy || loading}
                        className="bg-green-600 hover:bg-green-700 flex items-center"
                      >
                        {loading ? "Creating..." : "Create Account"}
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>

                  {step === 1 && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Registration Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-3 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                      >
                        {step > 1 ? <CheckCircle className="w-4 h-4" /> : "1"}
                      </div>
                      <div>
                        <p className="font-medium">Personal Information</p>
                        <p className="text-xs text-gray-500">Basic details and contact info</p>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                      >
                        {step > 2 ? <CheckCircle className="w-4 h-4" /> : "2"}
                      </div>
                      <div>
                        <p className="font-medium">Professional Background</p>
                        <p className="text-xs text-gray-500">Education and work experience</p>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                      >
                        {step > 3 ? <CheckCircle className="w-4 h-4" /> : "3"}
                      </div>
                      <div>
                        <p className="font-medium">Job Preferences</p>
                        <p className="text-xs text-gray-500">Preferred countries and job types</p>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 ${step >= 4 ? "text-blue-600" : "text-gray-400"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                      >
                        {step > 4 ? <CheckCircle className="w-4 h-4" /> : "4"}
                      </div>
                      <div>
                        <p className="font-medium">Terms & Conditions</p>
                        <p className="text-xs text-gray-500">Review and accept terms</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Career Support</h4>
                      <p className="text-sm text-green-700 mb-2">Get help with your job search</p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Career Advisor
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/help/registration"
                        className="flex items-center text-sm text-blue-600 hover:underline"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Registration Help Guide
                      </Link>
                      <Link href="/help/cv-tips" className="flex items-center text-sm text-blue-600 hover:underline">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        CV Writing Tips
                      </Link>
                      <Link href="/help/contact" className="flex items-center text-sm text-blue-600 hover:underline">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Support
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Join MRC Careers?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Access Global Jobs</p>
                        <p className="text-sm text-gray-600">Find overseas employment opportunities worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Career Guidance</p>
                        <p className="text-sm text-gray-600">Get expert advice on CV writing and interviews</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Visa Support</p>
                        <p className="text-sm text-gray-600">Assistance with work permits and documentation</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Secure & Trusted</p>
                        <p className="text-sm text-gray-600">Work with verified employers and agencies</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold">MRC CAREERS</div>
                <div className="text-xs text-gray-400">Global Job Recruitment</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              © 2024 MRC Careers - Connecting Talent with Global Opportunities
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
