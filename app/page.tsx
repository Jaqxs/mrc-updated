"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Globe,
  Phone,
  Mail,
  Search,
  Users,
  ArrowRight,
  PlayCircle,
  Shield,
  Clock,
  Award,
  Star,
  Target,
  MessageSquare,
  Briefcase,
  CheckCircle,
  TrendingUp,
  Calendar,
  ExternalLink,
  ChevronRight,
  FileText,
  Building,
  MapPin,
  Zap,
  UserCheck,
  GraduationCap,
  Handshake,
  Menu,
  X,
} from "lucide-react"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0])
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const heroSlides = [
    {
      title: "Find Your Dream Job Overseas",
      subtitle: "Your trusted partner for international careers",
      description:
        "Access thousands of verified job opportunities abroad with comprehensive support throughout your journey.",
      cta: "Browse Jobs Now",
      image: "bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800",
    },
    {
      title: "24/7 Career Support",
      subtitle: "We're here when you need us most",
      description: "Round-the-clock assistance for job seekers and career guidance from our expert team.",
      cta: "Get Career Help",
      image: "bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800",
    },
    {
      title: "Secure Job Placements",
      subtitle: "Verified employers, guaranteed opportunities",
      description: "Work with trusted international employers through our verified recruitment network.",
      cta: "View Opportunities",
      image: "bg-gradient-to-r from-orange-600 via-red-700 to-pink-800",
    },
  ]

  const quickLinks = [
    { title: "Browse Jobs", href: "/jobs", icon: Briefcase, color: "from-blue-500 to-blue-600" },
    { title: "Submit Application", href: "/jobs/apply", icon: UserCheck, color: "from-green-500 to-green-600" },
    { title: "Career Resources", href: "/resources", icon: GraduationCap, color: "from-purple-500 to-purple-600" },
    { title: "Contact Recruiters", href: "/contact", icon: Phone, color: "from-orange-500 to-orange-600" },
  ]

  const services = [
    {
      title: "Job Matching & Placement",
      description: "Advanced matching system connecting you with the perfect overseas opportunities",
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      features: ["Skills Assessment", "Job Matching", "Interview Preparation", "Placement Support"],
      stats: "2,500+ Placed",
    },
    {
      title: "Visa & Documentation",
      description: "Complete assistance with work permits, visas, and all required documentation",
      icon: FileText,
      color: "from-green-500 to-green-600",
      features: ["Visa Processing", "Document Verification", "Legal Compliance", "Fast-Track Service"],
      stats: "1,800+ Processed",
    },
    {
      title: "Pre-Departure Training",
      description: "Comprehensive preparation including language, culture, and professional skills",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600",
      features: ["Language Training", "Cultural Orientation", "Professional Skills", "Safety Training"],
      stats: "1,200+ Trained",
    },
    {
      title: "Ongoing Career Support",
      description: "Continuous support throughout your international career journey",
      icon: Handshake,
      color: "from-orange-500 to-orange-600",
      features: ["Career Counseling", "Employer Relations", "Contract Negotiation", "Career Advancement"],
      stats: "900+ Supported",
    },
  ]

  const stats = [
    { value: 5000, label: "Jobs Placed", icon: Briefcase, color: "text-blue-600" },
    { value: 25, label: "Partner Countries", icon: Globe, color: "text-green-600" },
    { value: 150, label: "Verified Employers", icon: Building, color: "text-purple-600" },
    { value: 98, label: "Success Rate %", icon: Award, color: "text-orange-600" },
  ]

  const announcements = [
    {
      date: "Jan 20, 2024",
      title: "500+ New Healthcare Jobs Available in Canada",
      excerpt:
        "Major healthcare recruitment drive with immediate openings for nurses, caregivers, and medical technicians...",
      category: "Healthcare",
      priority: "high",
      image: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      date: "Jan 18, 2024",
      title: "Construction Workers Needed in UAE",
      excerpt: "Large construction projects offering competitive salaries and accommodation for skilled workers...",
      category: "Construction",
      priority: "medium",
      image: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      date: "Jan 15, 2024",
      title: "IT Professionals - Remote & On-site Opportunities",
      excerpt: "Tech companies across Europe seeking software developers, data analysts, and IT specialists...",
      category: "Technology",
      priority: "high",
      image: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
  ]

  // Auto-slide hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  // Animate statistics when component mounts
  useEffect(() => {
    setIsVisible(true)
    const timers = stats.map((stat, index) => {
      return setTimeout(() => {
        let current = 0
        const increment = stat.value / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(timer)
          }
          setAnimatedStats((prev) => {
            const newStats = [...prev]
            newStats[index] = Math.floor(current)
            return newStats
          })
        }, 30)
      }, index * 200)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

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
                <span className="text-xs sm:text-sm">Job Hotline: +255 123 456 789</span>
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
                Career Help
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-200 transition-colors duration-300 hover:underline text-xs sm:text-sm"
              >
                Contact Recruiters
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
                  <Briefcase className="w-5 h-5 sm:w-8 sm:h-8 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  MRC CAREERS
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium hidden sm:block">
                  International Recruitment Agency
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Home", href: "/", active: true },
                { name: "Jobs", href: "/jobs" },
                { name: "Services", href: "/services" },
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
                className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm px-2 sm:px-4"
                asChild
              >
                <Link href="/login">
                  <span className="hidden sm:inline">Job Seeker Login</span>
                  <span className="sm:hidden">Login</span>
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
                asChild
              >
                <Link href="/register">
                  <span className="hidden sm:inline">Find Jobs Now</span>
                  <span className="sm:hidden">Jobs</span>
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
                  { name: "Home", href: "/", active: true },
                  { name: "Jobs", href: "/jobs" },
                  { name: "Services", href: "/services" },
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
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className={`${heroSlides[currentSlide].image} transition-all duration-1000 ease-in-out`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

          <div className="relative container mx-auto px-4 py-16 sm:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div
                className={`text-white transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              >
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4 sm:mb-6 border border-white/20">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-medium">5,000+ Jobs Placed Successfully</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                  {heroSlides[currentSlide].title}
                  <span className="block text-lg sm:text-2xl lg:text-3xl font-normal text-blue-200 mt-2">
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </h1>

                <p className="text-base sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed max-w-2xl">
                  {heroSlides[currentSlide].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/jobs">
                      {heroSlides[currentSlide].cta}
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-md text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/about">
                      <PlayCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                      How It Works
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
                    <span>Verified Employers</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                    <span>98% Success Rate</span>
                  </div>
                </div>
              </div>

              <div
                className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
              >
                <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-8">
                    <CardTitle className="text-lg sm:text-2xl font-bold text-center flex items-center justify-center">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                      Job Search Portal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-8">
                    <div className="mb-6 sm:mb-8">
                      <div className="relative group">
                        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5 group-hover:text-blue-500 transition-colors" />
                        <Input
                          placeholder="Search jobs..."
                          className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg border-2 border-slate-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                        />
                        <Button
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 rounded-lg sm:rounded-xl text-xs sm:text-sm px-3 sm:px-4"
                        >
                          <span className="hidden sm:inline">Search Jobs</span>
                          <span className="sm:hidden">Search</span>
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                      {quickLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="group p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-slate-200 hover:border-blue-300"
                        >
                          <div
                            className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r ${link.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                          >
                            <link.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                            {link.title}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <Button
                        className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        asChild
                      >
                        <Link href="/register">
                          <Users className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Create Job Seeker Profile</span>
                          <span className="sm:hidden">Create Profile</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent"
                        asChild
                      >
                        <Link href="/login">
                          <Shield className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Employer / Admin Login</span>
                          <span className="sm:hidden">Admin Login</span>
                        </Link>
                      </Button>
                    </div>

                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-green-200">
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-800 mb-3">Need career guidance?</p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                            asChild
                          >
                            <Link href="/contact">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-300 text-green-600 hover:bg-green-50 transition-all duration-300 hover:scale-105 bg-transparent w-full sm:w-auto"
                            asChild
                          >
                            <Link href="/contact">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Live Chat
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 rounded-full mb-4 sm:mb-6">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />
              <span className="text-xs sm:text-sm font-semibold text-blue-600">Our Recruitment Services</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
              Complete Career Solutions
              <span className="block text-blue-600">From Application to Placement</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From finding the perfect job match to securing your work visa, we provide comprehensive support for your
              international career journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 overflow-hidden bg-gradient-to-br from-white to-slate-50"
              >
                <CardContent className="p-0">
                  <div className={`h-1 sm:h-2 bg-gradient-to-r ${service.color}`}></div>
                  <div className="p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6">
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                        >
                          <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                            {service.title}
                          </h3>
                          <div className="flex items-center mt-2">
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              {service.stats}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mb-1" />
                        <p className="text-xs text-slate-500">Active</p>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-4 sm:mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center text-sm sm:text-base">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-500" />
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-xs sm:text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button
                        className={`flex-1 bg-gradient-to-r ${service.color} hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base`}
                        asChild
                      >
                        <Link href="/services">
                          Get Started
                          <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:bg-slate-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent text-sm sm:text-base"
                        asChild
                      >
                        <Link href="/about">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Proven Track Record</h2>
            <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Real numbers that showcase our success in connecting talent with international opportunities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:-translate-y-2"
              >
                <CardContent className="p-4 sm:p-8">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 font-mono">
                    {animatedStats[index]}
                    {stat.label.includes("%") ? "%" : "+"}
                  </div>
                  <div className="text-blue-100 font-medium text-xs sm:text-base">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced News & Announcements */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12">
                <div>
                  <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 rounded-full mb-3 sm:mb-4">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600" />
                    <span className="text-xs sm:text-sm font-semibold text-blue-600">Latest Opportunities</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">Hot Job Openings</h2>
                </div>
                <Link
                  href="/jobs"
                  className="text-blue-600 hover:text-blue-700 flex items-center font-semibold hover:underline transition-all duration-300 mt-3 sm:mt-0"
                >
                  View All Jobs
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {announcements.map((news, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:scale-[1.02] overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className={`w-full sm:w-2 h-2 sm:h-auto ${news.image} flex-shrink-0`}></div>
                        <div className="p-4 sm:p-8 flex-1">
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                            <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                              <div
                                className={`w-10 h-10 sm:w-12 sm:h-12 ${news.image} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                              >
                                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {news.date}
                                  </Badge>
                                  <Badge
                                    className={`text-xs ${news.priority === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                                  >
                                    {news.category}
                                  </Badge>
                                </div>
                                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 text-base sm:text-lg">
                                  {news.title}
                                </h3>
                              </div>
                            </div>
                            {news.priority === "high" && (
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">{news.excerpt}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 p-0"
                            asChild
                          >
                            <Link href="/jobs">
                              Apply Now
                              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6 sm:space-y-8">
              {/* Enhanced Quick Stats */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center text-blue-800">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Live Job Market
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm">
                      <span className="text-xs sm:text-sm text-slate-600">Active Jobs</span>
                      <span className="font-bold text-blue-600 text-base sm:text-lg">1,247</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm">
                      <span className="text-xs sm:text-sm text-slate-600">New This Week</span>
                      <span className="font-bold text-green-600 text-base sm:text-lg">+156</span>
                    </div>
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm">
                      <span className="text-xs sm:text-sm text-slate-600">Placement Rate</span>
                      <span className="font-bold text-purple-600 text-base sm:text-lg">98.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Important Links */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Briefcase,
                        text: "Browse All Jobs",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                        href: "/jobs",
                      },
                      {
                        icon: UserCheck,
                        text: "Application Status",
                        color: "text-green-600",
                        bg: "bg-green-50",
                        href: "/dashboard/jobseeker",
                      },
                      {
                        icon: GraduationCap,
                        text: "Career Resources",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                        href: "/resources",
                      },
                      {
                        icon: Phone,
                        text: "Contact Recruiters",
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                        href: "/contact",
                      },
                    ].map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className={`flex items-center text-sm ${link.color} hover:underline transition-all duration-300 p-3 rounded-xl ${link.bg} hover:scale-105`}
                      >
                        <link.icon className="w-4 h-4 mr-3" />
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Contact Info */}
              <Card className="bg-gradient-to-br from-slate-50 to-blue-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Our Recruiters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start p-3 bg-white rounded-xl shadow-sm">
                      <Phone className="w-4 h-4 mr-3 mt-0.5 text-blue-500" />
                      <div>
                        <div className="font-semibold">+255 123 456 789</div>
                        <div className="text-slate-600">Career Hotline</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-green-50 rounded-xl border border-green-200">
                      <Phone className="w-4 h-4 mr-3 mt-0.5 text-green-500" />
                      <div>
                        <div className="font-semibold text-green-600">+255 800 JOBS</div>
                        <div className="text-green-600">24/7 Job Support</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-white rounded-xl shadow-sm">
                      <Mail className="w-4 h-4 mr-3 mt-0.5 text-green-500" />
                      <div>
                        <div className="font-semibold">careers@mrc.go.tz</div>
                        <div className="text-slate-600">Career Inquiries</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-white rounded-xl shadow-sm">
                      <MapPin className="w-4 h-4 mr-3 mt-0.5 text-purple-500" />
                      <div>
                        <div className="font-semibold">123 Career Plaza</div>
                        <div className="text-slate-600">Dar es Salaam, Tanzania</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                  <Briefcase className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">MRC CAREERS</div>
                  <div className="text-xs text-blue-200">International Recruitment Agency</div>
                </div>
              </div>
              <p className="text-blue-100 text-sm mb-4 sm:mb-6 leading-relaxed">
                Connecting talented professionals with international career opportunities through our comprehensive
                recruitment and placement services.
              </p>
              <div className="text-xs sm:text-sm text-blue-200">
                <p>© 2024 Government of Tanzania</p>
                <p>Ministry of Labour and Employment</p>
              </div>
            </div>

            {[
              {
                title: "Job Categories",
                links: [
                  { name: "Healthcare Jobs", href: "/jobs?category=healthcare" },
                  { name: "Construction Jobs", href: "/jobs?category=construction" },
                  { name: "IT & Technology", href: "/jobs?category=technology" },
                  { name: "Hospitality Jobs", href: "/jobs?category=hospitality" },
                ],
              },
              {
                title: "For Job Seekers",
                links: [
                  { name: "Browse Jobs", href: "/jobs" },
                  { name: "Create Profile", href: "/register" },
                  { name: "Application Status", href: "/dashboard/jobseeker" },
                  { name: "Career Resources", href: "/resources" },
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">{section.title}</h4>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-200">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Contact</h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-blue-200">
                <li className="flex items-center">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                  <Link href="tel:+255123456789" className="hover:text-white transition-colors">
                    +255 123 456 789
                  </Link>
                </li>
                <li className="flex items-center">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                  <Link href="mailto:careers@mrc.go.tz" className="hover:text-white transition-colors">
                    careers@mrc.go.tz
                  </Link>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
                  <span>Dar es Salaam, Tanzania</span>
                </li>
              </ul>
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-500/20 rounded-xl sm:rounded-2xl border border-green-400/30">
                <h5 className="font-semibold mb-2 text-green-300 text-sm">Career Hotline</h5>
                <Link
                  href="tel:+255800JOBS"
                  className="text-green-200 font-bold text-base sm:text-lg hover:text-white transition-colors"
                >
                  +255 800 JOBS
                </Link>
                <p className="text-xs text-green-300">Available 24/7</p>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-blue-200 space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start space-x-4 sm:space-x-8">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Accessibility", href: "/accessibility" },
                  { name: "Sitemap", href: "/sitemap" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
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
