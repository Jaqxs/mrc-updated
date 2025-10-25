"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import Link from "next/link"

interface DynamicNavigationProps {
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export default function DynamicNavigation({ 
  className = "", 
  size = "sm",
  variant = "outline"
}: DynamicNavigationProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("role")
    const firstName = localStorage.getItem("first_name")
    
    if (token) {
      setIsLoggedIn(true)
      setUserRole(role)
      setUserName(firstName)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("role")
    localStorage.removeItem("email")
    localStorage.removeItem("first_name")
    window.location.reload()
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant={variant}
          size={size}
          className={`border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm px-2 sm:px-4 ${className}`}
          asChild
        >
          <Link href={userRole === 'admin' || userRole === 'staff' ? '/dashboard/admin' : '/dashboard/jobseeker'}>
            <span className="hidden sm:inline">My Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </Link>
        </Button>
        <Button
          size={size}
          className={`bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4 ${className}`}
          onClick={handleSignOut}
        >
          <span className="hidden sm:inline">Sign Out</span>
          <span className="sm:hidden">Out</span>
          <Zap className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={variant}
        size={size}
        className={`border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent text-xs sm:text-sm px-2 sm:px-4 ${className}`}
        asChild
      >
        <Link href="/login">
          <span className="hidden sm:inline">Job Seeker Login</span>
          <span className="sm:hidden">Login</span>
        </Link>
      </Button>
      <Button
        size={size}
        className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4 ${className}`}
        asChild
      >
        <Link href="/register">
          <span className="hidden sm:inline">Find Jobs Now</span>
          <span className="sm:hidden">Jobs</span>
          <Zap className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </Button>
    </div>
  )
}
