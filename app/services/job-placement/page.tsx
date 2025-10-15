"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  CheckCircle,
  Star,
  Users,
  Globe,
  ArrowRight,
  Phone,
  ChevronRight,
  Award,
  Menu,
  X,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function JobPlacementPage() {
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

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Jobs", href: "/jobs" },
                { name: "Services", href: "/services" },
                { name: "Resources", href: "/resources" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative font-medium transition-all duration-300 hover:text-blue-600 text-slate-700 hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-blue-600 hover:after:to-purple-600 hover:after:rounded-full"
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
                  { name: "Services", href: "/services" },
                  { name: "Resources", href: "/resources" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
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
            <span className="text-slate-900 font-semibold">Overseas Job Placement</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full mb-6 sm:mb-8 border border-white/20">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-200" />
              <span className="font-semibold text-sm sm:text-base">Premium Job Placement Service</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              Overseas <span className="text-blue-200">Job Placement</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl mb-8 sm:mb-10 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Connect with verified international employers offering competitive salaries and benefits. Our
              comprehensive placement service includes job matching, interview preparation, and contract negotiation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
                asChild
              >
                <Link href="/register">
                  Start Application
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-md text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
                asChild
              >
                <Link href="/contact">
                  <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Speak to Advisor
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
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Service Overview</h2>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                    Our Overseas Job Placement service is designed to connect skilled professionals with verified
                    international employers. We maintain partnerships with companies across multiple countries, ensuring
                    access to legitimate job opportunities with competitive compensation packages.
                  </p>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    From initial application to successful placement, our experienced team provides comprehensive
                    support including skills assessment, job matching, interview preparation, and contract negotiation
                    assistance.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-2xl rounded-2xl border-0 mb-8">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Advanced Job Matching Algorithm",
                      "Verified Employer Network",
                      "Professional Interview Coaching",
                      "Salary Negotiation Support",
                      "Contract Review & Legal Advice",
                      "Placement Success Guarantee",
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
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">How It Works</h3>
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Initial Assessment",
                        description: "Complete skills assessment and career consultation",
                      },
                      {
                        step: 2,
                        title: "Job Matching",
                        description: "Our algorithm matches you with suitable international positions",
                      },
                      {
                        step: 3,
                        title: "Application Support",
                        description: "Professional assistance with applications and documentation",
                      },
                      {
                        step: 4,
                        title: "Interview Preparation",
                        description: "Comprehensive interview coaching and cultural orientation",
                      },
                      {
                        step: 5,
                        title: "Placement & Support",
                        description: "Contract negotiation and ongoing placement support",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Service Details</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Duration:</span>
                      <Badge className="bg-blue-100 text-blue-800">2-4 weeks</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Price:</span>
                      <Badge className="bg-green-100 text-green-800">Free</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Availability:</span>
                      <Badge className="bg-green-100 text-green-800">Available Daily</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Success Rate:</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-semibold">94%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
                      asChild
                    >
                      <Link href="/register">
                        Get Started Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/contact">
                        <Phone className="mr-2 w-4 h-4" />
                        Contact Advisor
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>2,847 placed</span>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Ready to Find Your Dream Job Overseas?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully found international career opportunities through our
            placement service.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all"
            asChild
          >
            <Link href="/register">
              Start Your Application Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
