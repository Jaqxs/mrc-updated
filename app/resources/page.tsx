"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  FileText,
  Video,
  BookOpen,
  Eye,
  Filter,
  Star,
  Clock,
  Globe,
  Phone,
  Mail,
  MapPin,
  Zap,
  PlayCircle,
  ArrowRight,
  Target,
  Heart,
  Shield,
  Scale,
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const resourceCategories = [
    { id: "all", name: "All Resources", count: 45, icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { id: "cv-resume", name: "CV & Resume Tools", count: 12, icon: FileText, color: "from-green-500 to-green-600" },
    { id: "interview", name: "Interview Guides", count: 8, icon: BookOpen, color: "from-purple-500 to-purple-600" },
    { id: "videos", name: "Training Videos", count: 15, icon: Video, color: "from-red-500 to-red-600" },
    { id: "visa-docs", name: "Visa & Documentation", count: 10, icon: Shield, color: "from-orange-500 to-orange-600" },
  ]

  const featuredResources = [
    {
      id: 1,
      title: "Complete Overseas Job Search Guide 2024",
      description: "Comprehensive guide covering all aspects of finding and securing overseas employment opportunities",
      type: "PDF Guide",
      category: "interview",
      size: "2.5 MB",
      downloads: 15420,
      rating: 4.9,
      featured: true,
      image: "bg-gradient-to-br from-blue-500 to-blue-600",
      tags: ["Essential", "Updated", "Comprehensive"],
      lastUpdated: "Jan 15, 2024",
    },
    {
      id: 2,
      title: "CV Builder & Templates",
      description: "Professional CV templates and builder tool specifically designed for overseas job applications",
      type: "Interactive Tool",
      category: "cv-resume",
      size: "1.2 MB",
      downloads: 8930,
      rating: 4.8,
      featured: true,
      image: "bg-gradient-to-br from-green-500 to-green-600",
      tags: ["Templates", "Interactive", "Professional"],
      lastUpdated: "Jan 10, 2024",
    },
    {
      id: 3,
      title: "Interview Success Video Series",
      description: "Comprehensive video series covering interview techniques for overseas job opportunities",
      type: "Video Series",
      category: "videos",
      size: "450 MB",
      downloads: 12650,
      rating: 4.7,
      featured: true,
      image: "bg-gradient-to-br from-red-500 to-red-600",
      tags: ["Video", "Interview", "Success"],
      lastUpdated: "Jan 8, 2024",
    },
  ]

  const resources = [
    {
      id: 4,
      title: "Employment Contract Review Guide",
      description: "Essential guide for reviewing and understanding overseas employment contracts",
      type: "PDF Guide",
      category: "visa-docs",
      size: "850 KB",
      downloads: 6780,
      rating: 4.6,
      image: "bg-gradient-to-br from-purple-500 to-purple-600",
      tags: ["Contract", "Review", "Legal"],
      lastUpdated: "Jan 12, 2024",
    },
    {
      id: 5,
      title: "Salary Negotiation Workbook",
      description: "Interactive workbook for negotiating salaries and benefits for overseas positions",
      type: "Excel Workbook",
      category: "interview",
      size: "1.8 MB",
      downloads: 4520,
      rating: 4.5,
      image: "bg-gradient-to-br from-teal-500 to-teal-600",
      tags: ["Salary", "Negotiation", "Interactive"],
      lastUpdated: "Jan 5, 2024",
    },
    {
      id: 6,
      title: "Visa Application Checklist",
      description: "Complete checklist for visa applications and required documentation",
      type: "PDF Checklist",
      category: "visa-docs",
      size: "320 KB",
      downloads: 9840,
      rating: 4.8,
      image: "bg-gradient-to-br from-red-500 to-red-600",
      tags: ["Visa", "Checklist", "Essential"],
      lastUpdated: "Jan 18, 2024",
    },
    {
      id: 7,
      title: "Cultural Workplace Guide",
      description: "Guide to understanding workplace cultures in different countries",
      type: "PDF Guide",
      category: "interview",
      size: "3.2 MB",
      downloads: 7230,
      rating: 4.4,
      image: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      tags: ["Culture", "Workplace", "Guide"],
      lastUpdated: "Dec 28, 2023",
    },
    {
      id: 8,
      title: "Skills Assessment Form",
      description: "Self-assessment form to evaluate your skills for overseas job opportunities",
      type: "PDF Form",
      category: "cv-resume",
      size: "450 KB",
      downloads: 3420,
      rating: 4.7,
      image: "bg-gradient-to-br from-orange-500 to-orange-600",
      tags: ["Skills", "Assessment", "Self-Evaluation"],
      lastUpdated: "Jan 14, 2024",
    },
    {
      id: 9,
      title: "Job Interview Preparation Video",
      description: "Professional interview preparation video with tips for overseas job interviews",
      type: "MP4 Video",
      category: "videos",
      size: "125 MB",
      downloads: 5670,
      rating: 4.6,
      image: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      tags: ["Interview", "Preparation", "Professional"],
      lastUpdated: "Jan 3, 2024",
    },
  ]

  const allResources = [...featuredResources, ...resources]

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type.toLowerCase().includes(selectedType.toLowerCase())

    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    if (type.includes("PDF") || type.includes("Document")) return FileText
    if (type.includes("Video") || type.includes("MP4")) return Video
    if (type.includes("Excel") || type.includes("Workbook")) return BookOpen
    return FileText
  }

  const formatFileSize = (size: string) => {
    return size
  }

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`
    }
    return downloads.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Top Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-3 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <span className="flex items-center hover:text-blue-200 transition-all duration-300 cursor-pointer group">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                Emergency: +255 123 456 789
              </span>
              <span className="flex items-center hover:text-blue-200 transition-all duration-300 cursor-pointer group">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                info@mrc.go.tz
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/help" className="hover:text-blue-200 transition-colors duration-300 hover:underline">
                Help Center
              </Link>
              <Link href="/contact" className="hover:text-blue-200 transition-colors duration-300 hover:underline">
                Contact Us
              </Link>
              <Select>
                <SelectTrigger className="w-24 h-7 text-xs bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all">
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

      {/* Enhanced Main Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Globe className="w-8 h-8 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  MRC PORTAL
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Migrant Resource Centre</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Resources", href: "/resources", active: true },
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

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/register">
                  Register Now
                  <Zap className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>

        <div className="container mx-auto px-4 relative">
          <div
            className={`max-w-5xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
              <BookOpen className="w-5 h-5 mr-2 text-blue-200" />
              <span className="font-semibold">Resource Library</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Job Search <span className="text-blue-200">Resources</span>
              <span className="block text-3xl lg:text-4xl font-normal text-blue-100 mt-4">For Your Career Journey</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-10 text-blue-100 leading-relaxed max-w-4xl mx-auto">
              Access comprehensive guides, CV templates, interview preparation materials, and visa resources designed to
              help you secure overseas employment opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-lg px-10 py-4"
              >
                Browse All Resources
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-md text-lg px-10 py-4"
              >
                <PlayCircle className="mr-2 w-5 h-5" />
                Quick Start Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 rounded-full text-blue-800 font-semibold mb-4">
              <Target className="w-5 h-5 mr-2" />
              Explore by Category
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Resource <span className="text-blue-600">Categories</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Find exactly what you need with our organized resource categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {resourceCategories.slice(1).map((category) => (
              <Card
                key={category.id}
                className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"></div>
                <CardContent className="p-8 relative z-20">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${category.color}`}
                  >
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-slate-500 text-sm text-center mb-4">{category.count} resources available</p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    Explore
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Search and Filters */}
          <Card className="shadow-2xl rounded-2xl border-0 mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full h-14 rounded-lg">
                    <Filter className="w-4 h-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full h-14 rounded-lg">
                    <FileText className="w-4 h-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="File Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF Documents</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="excel">Excel Files</SelectItem>
                    <SelectItem value="word">Word Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Resources */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Resources</h2>
                <p className="text-slate-600">Most popular and essential resources for migrants</p>
              </div>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2">
                <Star className="w-4 h-4 mr-1" />
                Top Rated
              </Badge>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {featuredResources.map((resource) => {
                const IconComponent = getTypeIcon(resource.type)
                return (
                  <Card
                    key={resource.id}
                    className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-0">
                      <div className={`h-48 ${resource.image} relative flex items-center justify-center`}>
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                              {resource.title}
                            </h3>
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <div className="flex items-center text-yellow-500">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="ml-1 text-xs font-semibold">{resource.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-4 leading-relaxed text-sm">{resource.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {formatDownloads(resource.downloads)} downloads
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {resource.lastUpdated}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 bg-transparent"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* All Resources */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">All Resources</h2>
                <p className="text-slate-600">Complete collection of migration resources</p>
              </div>
              <div className="text-sm text-slate-500">
                Showing {filteredResources.length} of {allResources.length} resources
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => {
                const IconComponent = getTypeIcon(resource.type)
                return (
                  <Card
                    key={resource.id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    {resource.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-0">
                      <div className={`h-32 ${resource.image} relative flex items-center justify-center`}>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                              {resource.title}
                            </h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <div className="flex items-center text-yellow-500">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="ml-1 text-xs font-semibold">{resource.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-4 leading-relaxed text-sm line-clamp-3">
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                          <div className="flex items-center">
                            <Download className="w-3 h-3 mr-1" />
                            {formatDownloads(resource.downloads)}
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            {formatFileSize(resource.size)}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 bg-transparent"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No resources found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your search criteria or browse all resources</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedType("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Emergency Resources Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
              <Heart className="w-5 h-5 mr-2 text-red-200" />
              <span className="font-semibold">Career Support</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Need Career Guidance?</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Access career counseling, job search support, and professional guidance for your overseas employment
              journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency Contacts",
                description: "24/7 hotline numbers and emergency contact information",
                icon: Phone,
                action: "Get Contacts",
              },
              {
                title: "Crisis Support Guide",
                description: "Step-by-step guide for handling crisis situations",
                icon: Shield,
                action: "Download Guide",
              },
              {
                title: "Legal Emergency Aid",
                description: "Immediate legal assistance and rights protection",
                icon: Scale,
                action: "Request Help",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-red-100 mb-6">{item.description}</p>
                  <Button className="bg-white text-red-600 hover:bg-red-50 shadow-lg hover:shadow-xl transition-all duration-300">
                    {item.action}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">MRC PORTAL</div>
                  <div className="text-xs text-gray-400">Migrant Resource Centre</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Supporting migrant workers with comprehensive services and resources for safe, legal, and dignified
                migration.
              </p>
              <div className="text-sm text-gray-400">
                <p>© 2024 Government of Tanzania</p>
                <p>Ministry of Labour and Employment</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/services/job-placement" className="hover:text-white transition-colors">
                    Job Placement
                  </Link>
                </li>
                <li>
                  <Link href="/services/visa-assistance" className="hover:text-white transition-colors">
                    Visa Assistance
                  </Link>
                </li>
                <li>
                  <Link href="/services/career-counseling" className="hover:text-white transition-colors">
                    Career Counseling
                  </Link>
                </li>
                <li>
                  <Link href="/services/interview-prep" className="hover:text-white transition-colors">
                    Interview Preparation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/resources/cv-templates" className="hover:text-white transition-colors">
                    CV Templates
                  </Link>
                </li>
                <li>
                  <Link href="/resources/interview-guides" className="hover:text-white transition-colors">
                    Interview Guides
                  </Link>
                </li>
                <li>
                  <Link href="/resources/visa-info" className="hover:text-white transition-colors">
                    Visa Information
                  </Link>
                </li>
                <li>
                  <Link href="/resources/job-search-tips" className="hover:text-white transition-colors">
                    Job Search Tips
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +255 123 456 789
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@mrc.go.tz
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Dar es Salaam, Tanzania
                </li>
              </ul>
              <div className="mt-4">
                <h5 className="font-medium mb-2 text-red-400">Emergency Hotline</h5>
                <p className="text-red-400 font-semibold">+255 911 HELP (4357)</p>
                <p className="text-xs text-gray-400">Available 24/7</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div className="flex space-x-6 mb-4 md:mb-0">
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
                <p>Best viewed in Chrome, Firefox, Safari</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
