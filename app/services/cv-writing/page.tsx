"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Star, Users, Globe, ArrowRight, ChevronRight, Download, Award, Zap } from "lucide-react"
import Link from "next/link"

export default function CVWritingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
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

            {/* ... existing navigation code ... */}

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
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-2 sm:py-3">
          <div className="flex items-center text-xs sm:text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
            <Link href="/services" className="hover:text-blue-600 transition-colors font-medium">
              Services
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
            <span className="text-slate-900 font-semibold">CV & Resume Writing</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full mb-6 sm:mb-8 border border-white/20">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-200" />
              <span className="font-semibold text-sm sm:text-base">Professional CV Writing Service</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              CV & Resume <span className="text-green-200">Writing Service</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl mb-8 sm:mb-10 text-green-100 leading-relaxed max-w-3xl mx-auto">
              Professional CV writing service tailored for international job markets. Our experts create compelling
              resumes that highlight your skills and experience for overseas employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
                asChild
              >
                <Link href="/register">
                  Order CV Now - $49
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-md text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
                asChild
              >
                <Link href="/contact">
                  <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  View Samples
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl rounded-2xl border-0 mb-8">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Professional CV Writing</h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                    Stand out in the competitive international job market with a professionally written CV that
                    showcases your unique value proposition. Our expert writers understand what international employers
                    are looking for and craft resumes that get results.
                  </p>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    Each CV is ATS-optimized, industry-specific, and includes a compelling cover letter to maximize your
                    chances of landing interviews with top international employers.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-2xl rounded-2xl border-0 mb-8">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">What's Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Professional CV Template",
                      "ATS Optimization",
                      "Industry-Specific Writing",
                      "Custom Cover Letter",
                      "LinkedIn Profile Setup",
                      "Unlimited Revisions",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-slate-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl rounded-2xl border-0">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Our Process</h3>
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Information Gathering",
                        description: "Complete detailed questionnaire about your experience and goals",
                      },
                      {
                        step: 2,
                        title: "Writer Assignment",
                        description: "Matched with industry-specific professional writer",
                      },
                      { step: 3, title: "Draft Creation", description: "First draft created within 24-48 hours" },
                      {
                        step: 4,
                        title: "Review & Revisions",
                        description: "Unlimited revisions until you're completely satisfied",
                      },
                      {
                        step: 5,
                        title: "Final Delivery",
                        description: "Receive final CV in multiple formats plus cover letter",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-2xl rounded-2xl border-0 mb-6 sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Service Details</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Delivery:</span>
                      <Badge className="bg-green-100 text-green-800">3-5 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Price:</span>
                      <Badge className="bg-blue-100 text-blue-800">$49</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Revisions:</span>
                      <Badge className="bg-purple-100 text-purple-800">Unlimited</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-semibold">4.8</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-600"
                      asChild
                    >
                      <Link href="/register">
                        Order Now - $49
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/contact">
                        <Download className="mr-2 w-4 h-4" />
                        View Samples
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>1,892 CVs written</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        <span>Top Rated</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
