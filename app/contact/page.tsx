"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Globe,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  AlertCircle,
  CheckCircle,
  Building,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    urgent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+255 123 456 789",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      contact: "info@mrc.go.tz",
      hours: "Response within 24 hours",
      color: "bg-green-500",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support agents",
      contact: "Available on website",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM",
      color: "bg-purple-500",
    },
    {
      icon: AlertCircle,
      title: "Emergency Hotline",
      description: "24/7 emergency assistance",
      contact: "+255 911 HELP (4357)",
      hours: "Available 24/7",
      color: "bg-red-500",
    },
  ]

  const offices = [
    {
      name: "Main Office - Dar es Salaam",
      address: "123 Migration Street, Kinondoni District",
      city: "Dar es Salaam, Tanzania",
      phone: "+255 123 456 789",
      email: "dar@mrc.go.tz",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      services: ["All Services", "Registration", "Legal Aid", "Emergency Support"],
    },
    {
      name: "Regional Office - Mwanza",
      address: "456 Lake Victoria Road",
      city: "Mwanza, Tanzania",
      phone: "+255 234 567 890",
      email: "mwanza@mrc.go.tz",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM",
      services: ["Registration", "Pre-Departure Training", "Counseling"],
    },
    {
      name: "Regional Office - Arusha",
      address: "789 Kilimanjaro Avenue",
      city: "Arusha, Tanzania",
      phone: "+255 345 678 901",
      email: "arusha@mrc.go.tz",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM",
      services: ["Registration", "Legal Consultation", "Reintegration Support"],
    },
  ]

  const faqCategories = [
    {
      title: "Registration & Account",
      questions: ["How do I register for MRC services?", "What documents do I need?", "How do I reset my password?"],
    },
    {
      title: "Services & Support",
      questions: ["What services are available?", "How do I book an appointment?", "What is the cost of services?"],
    },
    {
      title: "Emergency Support",
      questions: ["How do I get emergency help?", "What constitutes an emergency?", "Is emergency support free?"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center hover:text-blue-200 transition-colors">
                <Phone className="w-3 h-3 mr-1" />
                Emergency: +255 123 456 789
              </span>
              <span className="flex items-center hover:text-blue-200 transition-colors">
                <Mail className="w-3 h-3 mr-1" />
                info@mrc.go.tz
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/help" className="hover:text-blue-200 transition-colors">
                Help
              </Link>
              <span className="text-blue-200">Contact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b backdrop-blur-sm bg-white/95 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  MRC PORTAL
                </h1>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Migrant Resource Centre</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Services
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Resources
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 hover:border-blue-300 transition-all bg-transparent"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get in <span className="text-blue-200">Touch</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              We're here to help you with any questions or support you need. Reach out to us through any of our contact
              channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Phone className="mr-2 w-5 h-5" />
                Emergency Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 transition-all bg-transparent"
              >
                <Headphones className="mr-2 w-5 h-5" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the contact method that works best for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="font-semibold text-gray-900 mb-1">{method.contact}</p>
                  <p className="text-xs text-gray-500">{method.hours}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your full name"
                            required
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your.email@example.com"
                            required
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+255 123 456 789"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="services">Services Information</SelectItem>
                              <SelectItem value="registration">Registration Help</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="complaint">Complaint</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Brief description of your inquiry"
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please provide detailed information about your inquiry..."
                          required
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="urgent"
                          checked={formData.urgent}
                          onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                          className="rounded border-gray-300 text-red-600"
                        />
                        <Label htmlFor="urgent" className="text-sm text-red-600">
                          This is an urgent matter requiring immediate attention
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Office Hours */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-red-600">Closed</span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Emergency Hotline</span>
                        <span className="font-medium text-red-600">24/7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/resources/faq" className="flex items-center text-sm text-blue-600 hover:underline">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Frequently Asked Questions
                    </Link>
                    <Link href="/services" className="flex items-center text-sm text-blue-600 hover:underline">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Our Services
                    </Link>
                    <Link href="/register" className="flex items-center text-sm text-blue-600 hover:underline">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Register for Services
                    </Link>
                    <Link href="/resources" className="flex items-center text-sm text-blue-600 hover:underline">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Download Resources
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="shadow-lg border-0 border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-800">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-red-700 font-semibold text-lg mb-2">+255 911 HELP (4357)</p>
                    <p className="text-red-600 text-sm mb-4">Available 24/7 for urgent situations</p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Emergency Line
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-gradient-to-r from-gray-100 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Offices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at any of our office locations across Tanzania
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card
                key={index}
                className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader
                  className={`${index === 0 ? "bg-gradient-to-r from-blue-600 to-blue-700" : "bg-gradient-to-r from-gray-600 to-gray-700"} text-white rounded-t-lg`}
                >
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    {office.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{office.address}</p>
                        <p className="text-gray-600">{office.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <p className="text-gray-900">{office.phone}</p>
                    </div>

                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <p className="text-gray-900">{office.email}</p>
                    </div>

                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                      <p className="text-gray-900">{office.hours}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-2">Available Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {office.services.map((service, serviceIndex) => (
                          <Badge key={serviceIndex} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Find quick answers to common questions</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.questions.map((question, questionIndex) => (
                      <Link
                        key={questionIndex}
                        href="/resources/faq"
                        className="block text-sm text-blue-600 hover:underline hover:text-blue-700 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 inline mr-1" />
                        {question}
                      </Link>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/resources/faq">
                      View All FAQs
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
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
                  <Link href="/services/pre-departure" className="hover:text-white transition-colors">
                    Pre-Departure Services
                  </Link>
                </li>
                <li>
                  <Link href="/services/legal" className="hover:text-white transition-colors">
                    Legal Aid
                  </Link>
                </li>
                <li>
                  <Link href="/services/reintegration" className="hover:text-white transition-colors">
                    Reintegration Support
                  </Link>
                </li>
                <li>
                  <Link href="/services/psychosocial" className="hover:text-white transition-colors">
                    Psychosocial Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/resources/downloads" className="hover:text-white transition-colors">
                    Downloads
                  </Link>
                </li>
                <li>
                  <Link href="/resources/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/resources/guides" className="hover:text-white transition-colors">
                    Guides & Manuals
                  </Link>
                </li>
                <li>
                  <Link href="/resources/forms" className="hover:text-white transition-colors">
                    Forms
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
        </div>
      </footer>
    </div>
  )
}
