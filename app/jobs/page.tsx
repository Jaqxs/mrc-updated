"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Globe,
  Filter,
  Heart,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLocation, setFilterLocation] = useState("All Locations")
  const [filterType, setFilterType] = useState("All Types")
  const [filterCategory, setFilterCategory] = useState("All Categories")
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  const API_BASE = "https://1f657a1b9206.ngrok-free.app/api"

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("role")
    
    if (token) {
      setIsLoggedIn(true)
      setUserRole(role)
    }
  }, [])

  // ✅ Fetch backend jobs safely
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${API_BASE}/jobs/`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const text = await res.text()
        console.log("🔍 Jobs raw response:", res.status, text)

        if (!res.ok) throw new Error(`Server responded with ${res.status}`)

        // Ensure it’s valid JSON
        const data = JSON.parse(text)
        setJobs(data)
      } catch (error) {
        console.error("❌ Failed to fetch jobs:", error)
      }
    }
    fetchJobs()
  }, [API_BASE])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleApplyJob = (jobId: number) => {
    window.location.href = `/jobs/${jobId}`
  }

  const handleSearch = () => {
    console.log("[search]", searchQuery)
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setFilterLocation("All Locations")
    setFilterType("All Types")
    setFilterCategory("All Categories")
  }

  // ✅ Filter logic
  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase?.().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase?.().includes(searchQuery.toLowerCase())

    const locationMatch =
      filterLocation === "All Locations" ||
      job.location?.toLowerCase().includes(filterLocation.toLowerCase())
    const typeMatch =
      filterType === "All Types" || job.type === filterType
    const categoryMatch =
      filterCategory === "All Categories" ||
      job.category === filterCategory

    return searchMatch && locationMatch && typeMatch && categoryMatch
  })

  const featuredJobs = filteredJobs.filter(
    (job) => job.featured === true || job.featured === "true"
  )
  const regularJobs = filteredJobs.filter((job) => !job.featured)

  const jobStats = [
    { label: "Active Jobs", value: jobs.length.toString(), icon: Briefcase },
    { label: "Countries", value: "45+", icon: Globe },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Happy Clients", value: "15K+", icon: Users },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MRC Careers
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/jobs" className="text-blue-600 font-semibold">
                Jobs
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Services
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Resources
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" asChild className="text-gray-600 hover:text-blue-600">
                    <Link href={userRole === 'admin' || userRole === 'staff' ? '/dashboard/admin' : '/dashboard/jobseeker'}>
                      My Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
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
                      } finally {
                        // Clear frontend storage
                        localStorage.removeItem("accessToken")
                        localStorage.removeItem("refreshToken")
                        localStorage.removeItem("role")
                        localStorage.removeItem("email")
                        localStorage.removeItem("first_name")
                        setIsLoggedIn(false)
                        setUserRole(null)
                      }
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="text-gray-600 hover:text-blue-600">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              {isLoggedIn ? (
                <Button variant="ghost" size="sm" asChild className="text-xs px-2">
                  <Link href={userRole === 'admin' || userRole === 'staff' ? '/dashboard/admin' : '/dashboard/jobseeker'}>
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" asChild className="text-xs px-2">
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-3">
                {["Home", "Jobs", "Services", "Resources", "About", "Contact"].map((name) => (
                  <Link
                    key={name}
                    href={`/${name.toLowerCase()}`}
                    className={`text-gray-600 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50 ${
                      name === "Jobs" ? "text-blue-600 font-semibold bg-blue-50" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-gray-200">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
              Find Your Dream Job Overseas
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed px-4">
              Discover thousands of international opportunities with visa sponsorship and competitive packages
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {jobStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full mb-2 sm:mb-3">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8 sm:mb-12">
          <CardContent className="p-4 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Find Your Perfect Match</h2>
            </div>

            <div className="space-y-3 sm:space-y-0 sm:grid sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10 sm:pl-12 h-11 sm:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 rounded-lg text-xs px-3"
                  onClick={handleSearch}
                >
                  <span className="hidden sm:inline">Search</span>
                  <Search className="w-4 h-4 sm:hidden" />
                </Button>
              </div>

              {/* ✅ Dynamic Locations (from Job.location field in backend) */}
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="h-11 sm:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg text-sm sm:text-base">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Locations">All Locations</SelectItem>
                  {/* Extract all unique Tanzanian regions from jobs returned by backend */}
                  {[...new Set(jobs.map((j) => j.location))]
                    .filter(Boolean)
                    .sort()
                    .map((region, i) => (
                      <SelectItem key={i} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="h-11 sm:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg text-sm sm:text-base">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  {[...new Set(jobs.map((j) => j.category))].map(
                    (c, i) => c && <SelectItem key={i} value={c}>{c}</SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-11 sm:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg text-sm sm:text-base">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Showing <span className="font-semibold text-blue-600">{filteredJobs.length}</span> jobs matching your
                criteria
              </p>
              {(searchQuery ||
                filterLocation !== "All Locations" ||
                filterType !== "All Types" ||
                filterCategory !== "All Categories") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="mt-2 text-gray-600 hover:text-blue-600 border-gray-300 hover:border-blue-300 bg-transparent"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ✅ Featured Jobs - Two Columns */}
        {featuredJobs.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Opportunities</h2>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {featuredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/50 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                              FEATURED
                            </Badge>
                            {job.urgent && (
                              <Badge variant="destructive" className="bg-red-500/80 text-white border-0 text-xs">
                                URGENT
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">{job.title}</h3>
                          <p className="text-blue-100 text-sm sm:text-base truncate">
                            {typeof job.company === "object" ? job.company.name : job.company}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveJob(job.id)}
                          className="text-white hover:bg-white/20 flex-shrink-0 ml-2"
                        >
                          <Heart
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              savedJobs.includes(job.id) ? "fill-current text-red-300" : ""
                            }`}
                          />
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-blue-100 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                        <div className="text-xl sm:text-2xl font-bold text-green-600">{job.salary_range}</div>
                        <Badge variant="outline" className="border-blue-200 text-blue-700 text-xs">
                          {job.visa}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">{job.description}</p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                            {job.category}
                          </Badge>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                            {job.experience}
                          </Badge>
                        </div>

                        <Button
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto text-sm"
                          onClick={() => handleApplyJob(job.id)}
                        >
                          Apply Now
                          <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Regular Jobs */}
        {regularJobs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">All Opportunities</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {regularJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-white"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          {job.urgent && (
                            <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 text-xs">
                              URGENT
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-600 font-medium mb-2 text-sm sm:text-base">
                          {typeof job.company === "object" ? job.company.name : job.company}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{job.posted}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            {job.category}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            {job.experience}
                          </Badge>
                          <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                            {job.visa}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto sm:ml-6">
                        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveJob(job.id)}
                            className="text-gray-400 hover:text-red-500 p-2"
                          >
                            <Heart
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                savedJobs.includes(job.id) ? "fill-current text-red-500" : ""
                              }`}
                            />
                          </Button>

                          <div className="text-right">
                            <div className="text-base sm:text-lg font-bold text-green-600">{job.salary_range}</div>
                            <div className="text-xs sm:text-sm text-gray-500">per year</div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent text-sm w-full sm:w-auto"
                          onClick={() => handleApplyJob(job.id)}
                        >
                          <span className="sm:hidden">Apply</span>
                          <span className="hidden sm:inline">View Details</span>
                          <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <Card className="text-center py-8 sm:py-12">
            <CardContent>
              <div className="max-w-md mx-auto px-4">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Try adjusting your search criteria or browse all available positions.
                </p>
                <Button onClick={clearAllFilters} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
