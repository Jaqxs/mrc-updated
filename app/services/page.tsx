"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Shield,
  Briefcase,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Headphones,
  Zap,
  TrendingUp,
  Award,
  Target,
  PlayCircle,
  Users,
  FileText,
  Building,
  GraduationCap,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhase, setSelectedPhase] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = (serviceId: number, serviceName: string) => {
    console.log("[v0] Get Started clicked for service:", serviceName)
    // Redirect to registration with service pre-selected
    window.location.href = `/register?service=${serviceId}`
  }

  const handleLearnMore = (serviceId: number, serviceName: string) => {
    console.log("[v0] Learn More clicked for service:", serviceName)
    const serviceRoutes: { [key: number]: string } = {
      1: "/services/job-placement",
      2: "/services/cv-writing",
      3: "/services/skills-training",
      4: "/services/career-counseling",
      5: "/services/visa-assistance",
      6: "/services/interview-preparation",
      7: "/services/support",
      8: "/services/employer-partnership",
    }

    const route = serviceRoutes[serviceId]
    if (route) {
      window.location.href = route
    } else {
      console.log("[v0] No route found for service:", serviceName)
    }
  }

  const handleCategoryExplore = (categoryId: string, categoryName: string) => {
    console.log("[v0] Explore category:", categoryName)
    setSelectedCategory(categoryId)
    // Scroll to services section
    const servicesSection = document.querySelector(".services-grid")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleWatchDemo = () => {
    console.log("[v0] Watch Demo clicked")
    // Could open video modal or redirect to demo page
    alert("Demo video would play here. This could open a video modal or redirect to a demo page.")
  }

  const handleCareerSupport = () => {
    console.log("[v0] Career Support clicked")
    // Redirect to contact page or open support chat
    window.location.href = "/contact"
  }

  const handleCareerCounseling = () => {
    console.log("[v0] Career Counseling clicked")
    // Could open booking modal or redirect to counseling page
    alert(
      "Career counseling booking would open here. This could show available time slots or redirect to a booking page.",
    )
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedPhase("all")
  }

  const serviceCategories = [
    { id: "all", name: "All Services", count: 12, color: "from-blue-500 to-blue-600" },
    { id: "job-placement", name: "Job Placement", count: 4, color: "from-green-500 to-green-600" },
    { id: "career-development", name: "Career Development", count: 3, color: "from-purple-500 to-purple-600" },
    { id: "visa-support", name: "Visa & Documentation", count: 2, color: "from-red-500 to-red-600" },
    { id: "training", name: "Skills Training", count: 3, color: "from-orange-500 to-orange-600" },
  ]

  const services = [
    {
      id: 1,
      title: "Overseas Job Placement",
      category: "job-placement",
      phase: "placement",
      description:
        "Connect with verified international employers offering competitive salaries and benefits. Our placement service includes job matching, interview preparation, and contract negotiation.",
      duration: "2-4 weeks",
      availability: "Available",
      rating: 4.9,
      participants: 2847,
      icon: Briefcase,
      features: [
        "Job Matching Algorithm",
        "Employer Verification",
        "Interview Coaching",
        "Salary Negotiation",
        "Contract Review",
        "Placement Guarantee",
      ],
      color: "from-blue-500 to-blue-600",
      price: "Free",
      nextSession: "Available Daily",
    },
    {
      id: 2,
      title: "CV & Resume Writing Service",
      category: "career-development",
      phase: "preparation",
      description:
        "Professional CV writing service tailored for international job markets. Our experts create compelling resumes that highlight your skills and experience for overseas employers.",
      duration: "3-5 days",
      availability: "Available",
      rating: 4.8,
      participants: 1892,
      icon: FileText,
      features: [
        "Professional Templates",
        "ATS Optimization",
        "Industry-Specific Writing",
        "Cover Letter Included",
        "LinkedIn Profile Setup",
        "Unlimited Revisions",
      ],
      color: "from-green-500 to-green-600",
      price: "$49",
      nextSession: "Same Day",
    },
    {
      id: 3,
      title: "Skills Assessment & Training",
      category: "training",
      phase: "preparation",
      description:
        "Comprehensive skills evaluation and targeted training programs to enhance your employability in international job markets with industry-recognized certifications.",
      duration: "2-8 weeks",
      availability: "Limited Slots",
      rating: 4.7,
      participants: 1634,
      icon: GraduationCap,
      features: [
        "Skills Gap Analysis",
        "Personalized Training Plan",
        "Industry Certifications",
        "Practical Workshops",
        "Progress Tracking",
        "Job Readiness Assessment",
      ],
      color: "from-purple-500 to-purple-600",
      price: "Subsidized",
      nextSession: "Feb 1, 2024",
    },
    {
      id: 4,
      title: "Career Counseling & Guidance",
      category: "career-development",
      phase: "all",
      description:
        "One-on-one career counseling sessions with experienced advisors to help you make informed decisions about your international career path.",
      duration: "Ongoing",
      availability: "Available",
      rating: 4.6,
      participants: 956,
      icon: Users,
      features: [
        "Personal Career Assessment",
        "Goal Setting",
        "Industry Insights",
        "Career Path Planning",
        "Mentorship Programs",
        "Follow-up Support",
      ],
      color: "from-red-500 to-red-600",
      price: "Free",
      nextSession: "Available Daily",
    },
    {
      id: 5,
      title: "Visa & Work Permit Assistance",
      category: "visa-support",
      phase: "documentation",
      description:
        "Expert assistance with visa applications, work permits, and all necessary documentation for working abroad with high success rates.",
      duration: "2-6 weeks",
      availability: "Available",
      rating: 4.8,
      participants: 1723,
      icon: Shield,
      features: [
        "Document Preparation",
        "Application Submission",
        "Embassy Liaison",
        "Status Tracking",
        "Appeal Support",
        "Legal Consultation",
      ],
      color: "from-indigo-500 to-indigo-600",
      price: "From $199",
      nextSession: "Available Daily",
    },
    {
      id: 6,
      title: "Interview Preparation Program",
      category: "career-development",
      phase: "preparation",
      description:
        "Intensive interview preparation including mock interviews, cultural orientation, and communication skills training for international job interviews.",
      duration: "1-2 weeks",
      availability: "Available",
      rating: 4.5,
      participants: 1389,
      icon: Users,
      features: [
        "Mock Interviews",
        "Cultural Training",
        "Communication Skills",
        "Confidence Building",
        "Industry-Specific Prep",
        "Video Interview Training",
      ],
      color: "from-orange-500 to-orange-600",
      price: "Free",
      nextSession: "Weekly Sessions",
    },
    {
      id: 7,
      title: "24/7 Job Seeker Support",
      category: "job-placement",
      phase: "all",
      description:
        "Round-the-clock support for job seekers with multilingual assistance and immediate help with job applications and career questions.",
      duration: "24/7",
      availability: "Always Available",
      rating: 4.9,
      participants: 3156,
      icon: Phone,
      features: [
        "24/7 Availability",
        "Multilingual Support",
        "Application Help",
        "Career Guidance",
        "Emergency Assistance",
        "Follow-up Services",
      ],
      color: "from-red-600 to-red-700",
      price: "Free",
      nextSession: "Available Now",
    },
    {
      id: 8,
      title: "Employer Partnership Program",
      category: "job-placement",
      phase: "placement",
      description:
        "Direct partnerships with international employers offering exclusive job opportunities with verified companies and competitive packages.",
      duration: "Ongoing",
      availability: "Available",
      rating: 4.7,
      participants: 2567,
      icon: Building,
      features: [
        "Verified Employers",
        "Exclusive Opportunities",
        "Direct Placement",
        "Competitive Packages",
        "Long-term Partnerships",
        "Quality Assurance",
      ],
      color: "from-teal-500 to-teal-600",
      price: "Free",
      nextSession: "Daily Updates",
    },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    const matchesPhase = selectedPhase === "all" || service.phase === selectedPhase || service.phase === "all"

    return matchesSearch && matchesCategory && matchesPhase
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200"
      case "Limited Slots":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Always Available":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-2 sm:py-3 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8">
              <span className="flex items-center hover:text-blue-200 transition-all duration-300 cursor-pointer group">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                  <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <span className="text-xs sm:text-sm">Emergency: +255 123 456 789</span>
              </span>
              <span className="flex items-center hover:text-blue-200 transition-all duration-300 cursor-pointer group">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                  <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <span className="text-xs sm:text-sm">careers@mrc.go.tz</span>
              </span>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6">
              <Link
                href="/help"
                className="hover:text-blue-200 transition-colors duration-300 hover:underline text-xs sm:text-sm"
              >
                Help Center
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-200 transition-colors duration-300 hover:underline text-xs sm:text-sm"
              >
                Contact Us
              </Link>
              <Select>
                <SelectTrigger className="w-16 sm:w-24 h-6 sm:h-7 text-xs bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all">
                  <SelectValue placeholder="EN" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="sw">🇹🇿 Kiswahili</SelectItem>
                  <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4 group">
              <div className="relative">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Globe className="w-5 h-5 sm:w-8 sm:h-8 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  MRC CAREERS
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium hidden sm:block">
                  Job Recruitment Agency
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Jobs", href: "/jobs" },
                { name: "Services", href: "/services", active: true },
                { name: "Resources", href: "/resources" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 hover:text-blue-600 ${
                    item.active
                      ? "text-blue-600 after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:rounded-full"
                      : "text-slate-700 hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-blue-600 hover:after:to-purple-600 hover:after:rounded-full"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm px-2 sm:px-4 hidden sm:inline-flex"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
                asChild
              >
                <Link href="/register">
                  <span className="hidden sm:inline">Register Now</span>
                  <span className="sm:hidden">Register</span>
                  <Zap className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-blue-100 py-4 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Jobs", href: "/jobs" },
                  { name: "Services", href: "/services", active: true },
                  { name: "Resources", href: "/resources" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      item.active ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full justify-start text-gray-600 hover:text-blue-600 mb-2"
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-2 sm:py-3">
          <div className="flex items-center text-xs sm:text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
            <span className="text-slate-900 font-semibold">Services</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>

        <div className="container mx-auto px-4 relative">
          <div
            className={`max-w-5xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full mb-6 sm:mb-8 border border-white/20">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-200" />
              <span className="font-semibold text-sm sm:text-base">Professional Recruitment Services</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              Comprehensive <span className="text-blue-200">Career Services</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl mb-8 sm:mb-10 text-blue-100 leading-relaxed max-w-4xl mx-auto px-4">
              Access professional recruitment services designed to connect you with international job opportunities,
              career development, and comprehensive support throughout your job search journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 w-full sm:w-auto"
                asChild
              >
                <Link href="/jobs">
                  Browse Job Opportunities
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-md text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 w-full sm:w-auto"
                onClick={handleWatchDemo}
              >
                <PlayCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Watch Demo
              </Button>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 w-full sm:w-auto"
                onClick={handleCareerSupport}
              >
                <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Career Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100/80 rounded-full text-blue-800 font-semibold mb-4 text-sm sm:text-base">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Explore by Category
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Our <span className="text-blue-600">Career Services</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Discover a wide range of professional services tailored to support your international career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {serviceCategories.slice(1).map((category) => (
              <Card
                key={category.id}
                className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                style={{ perspective: "800px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"></div>
                <CardContent className="p-6 sm:p-8 relative z-20">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white shadow-xl transition-all duration-300 group-hover:scale-110`}
                    style={{
                      background: `linear-gradient(to bottom right, ${category.color.replace("from-", "#").replace(" to-", ", #")})`,
                    }}
                  >
                    {category.id === "job-placement" && <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />}
                    {category.id === "career-development" && <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />}
                    {category.id === "visa-support" && <Shield className="w-6 h-6 sm:w-8 sm:h-8" />}
                    {category.id === "training" && <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-slate-500 text-sm text-center mb-4">{category.count} services available</p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-lg group-hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                    onClick={() => handleCategoryExplore(category.id, category.name)}
                  >
                    Explore
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-2xl rounded-2xl border-0 mb-8 sm:mb-10 mt-12 sm:mt-16">
            <CardContent className="p-4 sm:p-8">
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full h-12 sm:h-14 rounded-lg text-base sm:text-lg">
                    <Filter className="w-4 h-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                  <SelectTrigger className="w-full h-12 sm:h-14 rounded-lg text-base sm:text-lg">
                    <Target className="w-4 h-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Select Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Phases</SelectItem>
                    <SelectItem value="preparation">Preparation</SelectItem>
                    <SelectItem value="placement">Placement</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 services-grid">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                  hoveredService === service.id ? "scale-105" : "scale-100"
                }`}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"></div>
                <CardContent className="p-0 relative z-20">
                  <div className={`h-1 sm:h-2 bg-gradient-to-r ${service.color}`}></div>
                  <div className="p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-4">
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0`}
                          style={{
                            background: `linear-gradient(to bottom right, ${service.color.replace("from-", "#").replace(" to-", ", #")})`,
                          }}
                        >
                          <service.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                            {service.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <Badge className={`${getAvailabilityColor(service.availability)} border text-xs`}>
                              {service.availability}
                            </Badge>
                            <div className="flex items-center text-xs sm:text-sm text-slate-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <div className="flex items-center text-yellow-500 mb-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 font-semibold">{service.rating}</span>
                        </div>
                        <p className="text-xs text-slate-500">{service.participants} participants</p>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>

                    <div className="mb-4 sm:mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3 text-sm sm:text-base">Key Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs sm:text-sm text-slate-600">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                      <div>
                        <h5 className="font-medium text-slate-700 text-sm sm:text-base">Price: {service.price}</h5>
                        <p className="text-xs text-slate-500">Next Session: {service.nextSession}</p>
                      </div>
                      <div className="flex items-center text-blue-500 group-hover:text-blue-700 transition-colors duration-300">
                        <Award className="w-4 h-4 mr-1" />
                        <span className="text-xs sm:text-sm font-medium">Top Rated</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                        onClick={() => handleGetStarted(service.id, service.title)}
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 bg-transparent text-sm sm:text-base"
                        onClick={() => handleLearnMore(service.id, service.title)}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No services found</h3>
              <p className="text-slate-600 mb-6 text-sm sm:text-base px-4">
                Try adjusting your search criteria or browse all services
              </p>
              <Button onClick={clearAllFilters} className="w-full sm:w-auto">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Our career support team is available 24/7 to help you find the perfect international job opportunity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
              asChild
            >
              <Link href="/jobs">
                <Briefcase className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Browse Jobs
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 transition-all bg-transparent w-full sm:w-auto"
              onClick={handleCareerCounseling}
            >
              <Headphones className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Career Counseling
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-base sm:text-lg">MRC CAREERS</div>
                  <div className="text-xs text-gray-400">Job Recruitment Agency</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Connecting talented professionals with international job opportunities through comprehensive career
                services and support.
              </p>
              <div className="text-xs sm:text-sm text-gray-400">
                <p>© 2024 Government of Tanzania</p>
                <p>Ministry of Labour and Employment</p>
              </div>
            </div>

            {[
              {
                title: "Services",
                links: [
                  { name: "Job Placement", href: "/services/job-placement" },
                  { name: "Career Development", href: "/services/career-development" },
                  { name: "Visa Support", href: "/services/visa-support" },
                  { name: "Skills Training", href: "/services/training" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Downloads", href: "/resources/downloads" },
                  { name: "FAQ", href: "/resources/faq" },
                  { name: "Guides & Manuals", href: "/resources/guides" },
                  { name: "Forms", href: "/resources/forms" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{section.title}</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span>+255 123 456 789</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span>careers@mrc.go.tz</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span>Dar es Salaam, Tanzania</span>
                </li>
              </ul>
              <div className="mt-3 sm:mt-4">
                <h5 className="font-medium mb-2 text-green-400 text-sm">Career Support</h5>
                <p className="text-green-400 font-semibold text-sm sm:text-base">+255 700 CAREER</p>
                <p className="text-xs text-gray-400">Available 24/7</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start space-x-4 sm:space-x-6">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
                <Link href="/sitemap" className="hover:text-white transition-colors">
                  Sitemap
                </Link>
              </div>
              <div className="text-center md:text-right">
                <p>Last updated: January 2024</p>
                <p className="hidden sm:block">Best viewed in Chrome, Firefox, Safari</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
