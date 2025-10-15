"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Globe,
  Users,
  Heart,
  Shield,
  Award,
  Target,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  PlayCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* -------------------------------------------------------------------------- */
/*                                Mocked Data                                 */
/* -------------------------------------------------------------------------- */

const heroSubtitle =
  "Tanzania’s premier Migrant Resource Centre, dedicated to ensuring safe, legal, and dignified migration for every worker."

const achievements = [
  { metric: "5,000+", label: "Migrants Served", icon: Users },
  { metric: "15", label: "Partner Countries", icon: Globe },
  { metric: "98%", label: "Success Rate", icon: Award },
  { metric: "24/7", label: "Support Availability", icon: Heart },
]

const coreValues = [
  {
    title: "Dignity & Respect",
    description: "Every migrant deserves dignity and respect throughout the journey.",
    icon: Heart,
  },
  {
    title: "Legal Protection",
    description: "Ensuring migrants understand and can exercise their rights.",
    icon: Shield,
  },
  {
    title: "Professional Excellence",
    description: "High-quality services through continuous innovation.",
    icon: Award,
  },
]

/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  /* Small number-count animation for the statistics section */
  const [animatedNumbers, setAnimatedNumbers] = useState(Array(achievements.length).fill(0))

  useEffect(() => {
    achievements.forEach((ach, idx) => {
      const target = Number.parseInt(ach.metric.replace(/\D/g, "")) || 0
      if (!target) return

      const step = Math.ceil(target / 60)
      const interval = setInterval(() => {
        setAnimatedNumbers((prev) => {
          const next = [...prev]
          next[idx] = Math.min(target, next[idx] + step)
          return next
        })
      }, 30)

      return () => clearInterval(interval)
    })
  }, [])

  /* ---------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800">
      {/* ------------------------------------------------------------------ */}
      {/*                 Top utility bar (phone / email links)              */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-1 hover:underline">
              <Phone className="h-3 w-3" /> +255 123 456 789
            </span>
            <span className="flex items-center gap-1 hover:underline">
              <Mail className="h-3 w-3" /> info@mrc.go.tz
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <Link href="/help" className="hover:underline">
              Help
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*                            Main header                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow">
              <Globe className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold leading-none">MRC PORTAL</p>
              <p className="text-xs text-gray-500 -mt-1">Migrant Resource Centre</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Resources", "/resources"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600 after:transition-all hover:text-blue-600 hover:after:w-full ${
                  href === "/about" ? "text-blue-600 after:w-full" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*                             Breadcrumb                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white/70 backdrop-blur border-b">
        <div className="container mx-auto flex items-center gap-2 px-4 py-2 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-blue-600">About Us</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*                               Hero                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 py-24 text-white">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">Empowering Safe Migration</h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-blue-100">{heroSubtitle}</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-blue-600 bg-white" asChild>
              <Link href="/mission">
                Our Mission <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white bg-transparent">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Story
            </Button>
          </div>
        </div>

        {/* Decorative blurred shape */}
        <div aria-hidden className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                           Achievements                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <header className="mx-auto mb-16 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              <TrendingUp className="h-4 w-4" />
              Our Impact
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Making a Real Difference</h2>
            <p className="mt-3 text-gray-600">Key stats that highlight our commitment to migrant welfare.</p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map(({ metric, label, icon: Icon }, i) => (
              <Card key={label} className="text-center shadow hover:shadow-lg transition">
                <CardContent className="p-8">
                  <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </span>
                  <p className="text-4xl font-extrabold text-gray-900 font-mono">
                    {metric.includes("+") || metric.includes("%") ? metric : animatedNumbers[i]}
                  </p>
                  <p className="mt-1 text-gray-600">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                           Mission / Vision / Values                */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="mission" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-2 rounded-2xl mb-10">
              <TabsTrigger
                value="mission"
                className="data-[state=active]:bg-white data-[state=active]:shadow font-semibold rounded-xl py-2 transition"
              >
                Mission
              </TabsTrigger>
              <TabsTrigger
                value="vision"
                className="data-[state=active]:bg-white data-[state=active]:shadow font-semibold rounded-xl py-2 transition"
              >
                Vision
              </TabsTrigger>
              <TabsTrigger
                value="values"
                className="data-[state=active]:bg-white data-[state=active]:shadow font-semibold rounded-xl py-2 transition"
              >
                Values
              </TabsTrigger>
            </TabsList>

            {/* ----------------------------- Mission ----------------------- */}
            <TabsContent value="mission">
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="h-6 w-6" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    To provide comprehensive support services ensuring safe, legal, and dignified migration for all
                    Tanzanian workers, protecting their rights and promoting their wellbeing from departure to
                    reintegration.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ----------------------------- Vision ------------------------ */}
            <TabsContent value="vision">
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Award className="h-6 w-6" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    A world where migration is a choice, not a necessity—and where every migrant worker is treated with
                    dignity, enjoys fair opportunities, and receives full protection.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ----------------------------- Values ------------------------ */}
            <TabsContent value="values">
              <div className="grid gap-8 sm:grid-cols-2">
                {coreValues.map(({ title, description, icon: Icon }) => (
                  <Card key={title} className="border-0 shadow group hover:shadow-lg transition">
                    <CardContent className="p-6">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 mb-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </span>
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <p className="mt-2 text-sm text-gray-600">{description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
