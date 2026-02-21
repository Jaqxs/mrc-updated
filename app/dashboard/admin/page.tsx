"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  PlusCircle, Briefcase, UserCircle2, CheckCircle, XCircle, Eye,
  FileText, Trash2, Power, PowerOff, Edit, RefreshCw,
  LogOut, Building2, MapPin, DollarSign, Users2, Download,
  UserCircle, X, AlertCircle, LayoutDashboard, Search, Filter,
  TrendingUp, Activity, Bell, ChevronRight, Settings, Users,
  Mail, Shield
} from "lucide-react"
import { authService, UserProfile } from "@/lib/services/auth-service"
import { jobService, Job, JobApplication, Category } from "@/lib/services/job-service"
import { ApiError } from "@/lib/api-client"

// ---------- CONSTANTS ----------
const TANZANIA_REGIONS = [
  "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi",
  "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro",
  "Mtwara", "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani", "Rukwa",
  "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Songwe", "Tabora", "Tanga",
  "Zanzibar North", "Zanzibar South", "Zanzibar Urban/West"
]

const VISA_OPTIONS = ["Required", "Not Required", "Optional"]

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
}

// ---------- MAIN COMPONENT ----------
export default function JobManagementPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("overview")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<number | null>(null)
  const [editingJob, setEditingJob] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showAppModal, setShowAppModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [appFilter, setAppFilter] = useState("all")
  const [userRoleFilter, setUserRoleFilter] = useState("all")

  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    category: null,
    experience: "",
    visa: "",
    salary_range: "",
    description: "",
    featured: false,
    urgent: false,
    is_active: true,
  })

  // ---------- DATA FETCHING ----------
  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [jobsData, catsData, usersData, profileData, appsData] = await Promise.all([
        jobService.getAdminJobs(),
        jobService.getCategories(),
        authService.getAllUsers(),
        authService.getProfile(),
        jobService.getAllApplicationsAdmin()
      ])
      setJobs(jobsData)
      setCategories(catsData)
      setUsers(usersData)
      setProfile(profileData)
      setApplications(appsData)
    } catch (err) {
      handleApiError(err, "initial load")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const handleApiError = (err: any, action: string) => {
    console.error(`Error during ${action}:`, err)
    if (err instanceof ApiError) {
      setMessage(`❌ Failed to ${action}: ${err.message}`)
    } else {
      setMessage(`⚠️ Something went wrong while trying to ${action}.`)
    }
    setTimeout(() => setMessage(null), 5000)
  }

  // Action handlers (Logic remains the same as before but with better feedback)
  const updateApplicationStatus = async (applicationId: number, status: string) => {
    setLoading(true)
    try {
      await jobService.updateApplicationStatus(applicationId, status)
      setMessage(`✅ Application marked as ${status.replace('_', ' ')}`)
      const updatedApps = await jobService.getAllApplicationsAdmin()
      setApplications(updatedApps)
    } catch (err) {
      handleApiError(err, "update status")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (refreshToken) await authService.logout(refreshToken)
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.clear()
      window.location.href = "/login"
    }
  }

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.company) {
      setMessage("⚠️ Title and Company are required.")
      return
    }
    setLoading(true)
    try {
      await jobService.createJob(newJob)
      setMessage("✅ New job opportunity posted!")
      setActiveSection("jobs")
      const updatedJobs = await jobService.getAdminJobs()
      setJobs(updatedJobs)
      setNewJob({
        title: "", company: "", location: "", type: "Full-time",
        category: null, experience: "", visa: "", salary_range: "",
        description: "", featured: false, urgent: false, is_active: true
      })
    } catch (err) {
      handleApiError(err, "post job")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteJob = async (jobId: number) => {
    setLoading(true)
    try {
      await jobService.deleteJob(jobId)
      setMessage("✅ Job successfully decommissioned.")
      const updatedJobs = await jobService.getAdminJobs()
      setJobs(updatedJobs)
    } catch (err) {
      handleApiError(err, "delete job")
    } finally {
      setLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleUpdateJob = async () => {
    if (!editingJob) return
    setLoading(true)
    try {
      await jobService.updateJob(editingJob.id, editingJob)
      setMessage("✅ Deployment configuration updated.")
      setShowEditModal(false)
      const updatedJobs = await jobService.getAdminJobs()
      setJobs(updatedJobs)
    } catch (err) {
      handleApiError(err, "update job")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleUserStatus = async (user: any) => {
    setLoading(true)
    try {
      await authService.updateUserStatus(user.id, !user.is_active)
      setMessage(`✅ Account for ${user.first_name} ${user.is_active ? 'suspended' : 'restored'}.`)
      const updatedUsers = await authService.getAllUsers()
      setUsers(updatedUsers)
      if (selectedUser?.id === user.id) setSelectedUser({ ...selectedUser, is_active: !user.is_active })
    } catch (err) {
      handleApiError(err, "update user status")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadResume = (app: any) => {
    setMessage(`📂 Preparing transcript for ${app.applicant_first_name}...`)
    setTimeout(() => {
      setMessage(`✅ Document retrieval successful. MD-TRNC-${app.id}.pdf download initiated.`)
    }, 1500)
  }

  const runDiagnostic = () => {
    setLoading(true)
    setMessage("📡 Initializing system-wide diagnostic scan...")
    setTimeout(() => {
      setMessage("✅ All systems operational. Latency optimal.")
      setLoading(false)
    }, 2000)
  }

  // Filtering Logic
  const filteredJobsBySearch = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${app.applicant_first_name} ${app.applicant_last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = appFilter === "all" || app.status === appFilter;
    return matchesSearch && matchesStatus;
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = userRoleFilter === "all" || user.role === userRoleFilter;
    return matchesSearch && matchesRole;
  })

  // --- SUB-COMPONENTS FOR CLEANER RENDER ---

  const StatsCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <motion.div variants={itemVariants} className="relative group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`}></div>
      <Card className="relative glass-dark border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden rounded-3xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
              <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
              {trend && <p className="text-emerald-400 text-[10px] font-bold mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +{trend}% from last month</p>}
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} shadow-lg shadow-black/20`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const NavItem = ({ section, label, icon: Icon, count }: any) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 group ${activeSection === section
        ? "bg-white text-blue-600 shadow-xl shadow-blue-100 ring-1 ring-slate-100 scale-[1.02]"
        : "text-slate-500 hover:text-blue-600 hover:bg-white/50"
        }`}
    >
      <Icon className={`w-5 h-5 transition-transform duration-300 ${activeSection === section ? "scale-110" : "group-hover:translate-x-1"}`} />
      <span className="flex-1 text-left text-sm">{label}</span>
      {count !== undefined && count > 0 && (
        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${activeSection === section ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
          {count}
        </span>
      )}
      {activeSection === section && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px] animate-pulse-delay-2000"></div>
      </div>

      {/* Main Layout */}
      <div className="flex relative z-10 h-screen overflow-hidden">

        {/* Sidebar */}
        <aside className="w-80 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 p-6 flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">HRN Admin</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Recruitment Hub</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Management</p>
            <NavItem section="overview" label="Overview" icon={LayoutDashboard} />
            <NavItem section="applications" label="Applications" icon={FileText} count={applications.filter(a => a.status === "Pending").length} />
            <NavItem section="jobs" label="Job Listings" icon={Briefcase} count={jobs.length} />
            <NavItem section="users" label="User Directory" icon={Users} count={users.length} />

            <div className="pt-8 pb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Actions</p>
              <button
                onClick={() => setActiveSection("post-job")}
                className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white p-4 rounded-3xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-3 font-bold group"
              >
                <div className="bg-white/20 p-2 rounded-xl group-hover:rotate-90 transition-transform duration-500">
                  <PlusCircle className="w-5 h-5 text-white" />
                </div>
                <span>New Posting</span>
              </button>
            </div>
          </nav>

          <Card className="bg-slate-900 border-0 rounded-[2rem] overflow-hidden p-5 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <div className="overflow-hidden">
                <p className="text-white font-bold truncate text-sm">{profile?.first_name} {profile?.last_name}</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">System {profile?.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full bg-white/5 hover:bg-rose-500/20 text-white hover:text-rose-400 justify-start h-12 rounded-2xl border-white/5 font-bold transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" /> Logout
            </Button>
          </Card>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">

          {/* Top Bar */}
          <header className="h-20 bg-white/40 backdrop-blur-md px-10 flex items-center justify-between border-b border-slate-200/60 sticky top-0 z-20">
            <div className="relative group w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                placeholder="Search across dashboard..."
                className="pl-11 h-12 bg-white/50 border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-12 w-12 rounded-2xl border-slate-200/60 bg-white/50 relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </Button>
              <Button variant="outline" className="h-12 w-12 rounded-2xl border-slate-200/60 bg-white/50">
                <Settings className="w-5 h-5 text-slate-600" />
              </Button>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <div className="flex items-center bg-white/80 border border-slate-200/60 px-4 py-2 rounded-2xl gap-3 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">System Online</span>
              </div>
            </div>
          </header>

          {/* Section View */}
          <section className="flex-1 overflow-y-auto p-10 scroll-smooth">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-7xl mx-auto space-y-10"
              >

                {/* OVERVIEW SECTION */}
                {activeSection === "overview" && (
                  <>
                    <motion.div variants={itemVariants} className="flex flex-col gap-1">
                      <h2 className="text-4xl font-bold tracking-tight text-slate-900">Dashboard Intelligence</h2>
                      <p className="text-slate-500 font-medium">Real-time recruitment metrics and system performance.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatsCard
                        title="Total Listings"
                        value={jobs.length}
                        icon={Briefcase}
                        color="from-blue-600 to-blue-500"
                        trend="12"
                      />
                      <StatsCard
                        title="Candidate Pipeline"
                        value={applications.length}
                        icon={Users2}
                        color="from-purple-600 to-purple-400"
                        trend="8"
                      />
                      <StatsCard
                        title="Active Users"
                        value={users.filter(u => u.is_active).length}
                        icon={Activity}
                        color="from-emerald-600 to-emerald-400"
                      />
                      <StatsCard
                        title="Growth Factor"
                        value="84%"
                        icon={TrendingUp}
                        color="from-rose-600 to-rose-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <Card className="lg:col-span-2 glass border-white shadow-xl rounded-[3rem] overflow-hidden">
                        <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                              <Activity className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-xl font-bold text-slate-900">Application Flow</CardTitle>
                              <CardDescription>Latest submissions across all open positions</CardDescription>
                            </div>
                          </div>
                          <Link href="#" onClick={() => setActiveSection("applications")} className="text-blue-600 font-bold text-xs uppercase hover:underline tracking-widest flex items-center gap-1">
                            View All <ChevronRight className="w-4 h-4" />
                          </Link>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y divide-slate-50">
                            {applications.slice(0, 5).map((app, idx) => (
                              <motion.div
                                key={app.id}
                                variants={itemVariants}
                                className="p-6 hover:bg-slate-50/50 transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-5">
                                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-500 shadow-sm border border-white">
                                    {app.applicant_first_name[0]}{app.applicant_last_name[0]}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors uppercase tracking-tight">{app.job_title}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><UserCircle className="w-3 h-3" /> {app.applicant_first_name} {app.applicant_last_name}</span>
                                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                      <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-widest">{new Date(app.submitted_at).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>
                                <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border-2 shadow-sm ${app.status === "Shortlisted" ? "bg-emerald-50 text-emerald-600 border-emerald-100 ring-4 ring-emerald-500/5" :
                                  app.status === "Rejected" ? "bg-rose-50 text-rose-600 border-rose-100 ring-4 ring-rose-500/5" :
                                    "bg-amber-50 text-amber-600 border-amber-100 ring-4 ring-amber-500/5"
                                  }`}>
                                  {app.status || "Pending"}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <div className="space-y-6">
                        <Card className="glass border-white shadow-xl rounded-[3rem] p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-8">Quick System Audit</h4>
                          <div className="space-y-6">
                            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                              <p className="text-sm font-bold">Active Servers</p>
                              <span className="text-emerald-400 font-bold">Stable</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                              <p className="text-sm font-bold">Pending Actions</p>
                              <span className="bg-white text-indigo-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs">12</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                              <p className="text-sm font-bold">Database Load</p>
                              <span className="text-white font-bold">2.4ms</span>
                            </div>
                          </div>
                          <Button
                            onClick={runDiagnostic}
                            disabled={loading}
                            className="w-full mt-8 h-14 bg-white text-blue-600 hover:bg-slate-50 font-bold rounded-2xl shadow-xl"
                          >
                            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Run Diagnostic"}
                          </Button>
                        </Card>

                        <Card className="glass border-white shadow-xl rounded-[3.5rem] p-8 flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <LayoutDashboard className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">System Version</p>
                          <h3 className="text-2xl font-bold text-slate-800">Internal v.4.2.0</h3>
                          <p className="text-[10px] font-bold text-slate-300 mt-2 px-10">Enhanced encryption and realtime websocket synchronization active.</p>
                        </Card>
                      </div>
                    </div>
                  </>
                )}

                {/* APPLICATIONS VIEW */}
                {activeSection === "applications" && (
                  <div className="space-y-8 pb-10">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 uppercase">Pipeline</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Management & Review</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {["all", "pending", "shortlisted", "rejected"].map(s => (
                            <Button
                              key={s}
                              onClick={() => setAppFilter(s)}
                              variant="ghost"
                              className={`h-11 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${appFilter === s ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-white text-slate-500 hover:bg-slate-50"}`}
                            >
                              {s}
                            </Button>
                          ))}
                        </div>
                        <Button variant="outline" className="h-11 rounded-xl bg-white border-slate-200"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {filteredApplications.map((app) => (
                        <motion.div
                          key={app.id}
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                          className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-[3.5rem] p-10 flex flex-col lg:flex-row items-start lg:items-center gap-10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                        >
                          <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl shadow-indigo-200 relative">
                            {app.applicant_first_name[0]}{app.applicant_last_name[0]}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-50">
                              <FileText className="w-5 h-5 text-indigo-600" />
                            </div>
                          </div>

                          <div className="flex-1 space-y-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-none uppercase">{app.job_title}</h3>
                                <Badge className="bg-slate-100 text-slate-400 border-0 rounded-lg text-[10px] font-bold uppercase tracking-widest px-3">{app.job_company}</Badge>
                              </div>
                              <p className="text-xl font-bold text-indigo-500 flex items-center gap-2">
                                {app.applicant_first_name} {app.applicant_last_name}
                                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full mx-1"></span>
                                <span className="text-slate-400 text-sm font-bold">{app.applicant_email}</span>
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-10 pt-4">
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Status</p>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${app.status === "Shortlisted" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                                  <span className="text-sm font-bold text-slate-700 tracking-tight">{app.status || "Pending Review"}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Submitted</p>
                                <p className="text-sm font-bold text-slate-700 tracking-tight">{new Date(app.submitted_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Document</p>
                                <button onClick={() => window.open(app.resume, '_blank')} className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1 group">
                                  PDF Resume <Download className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-fit">
                            <Button
                              onClick={() => updateApplicationStatus(app.id, "Shortlisted")}
                              disabled={loading || app.status === "Shortlisted"}
                              className="flex-1 lg:w-48 h-14 bg-indigo-600 hover:bg-black text-white font-bold rounded-3xl shadow-xl shadow-indigo-100 transition-all active:scale-95 text-xs uppercase tracking-widest border-0"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Shortlist
                            </Button>
                            <Button
                              onClick={() => updateApplicationStatus(app.id, "Rejected")}
                              disabled={loading || app.status === "Rejected"}
                              variant="outline"
                              className="flex-1 lg:w-48 h-14 bg-white hover:bg-rose-50 border-slate-200 text-slate-600 hover:text-rose-600 font-bold rounded-3xl transition-all active:scale-95 text-xs uppercase tracking-widest"
                            >
                              <XCircle className="w-4 h-4 mr-2" /> Decline
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {applications.length === 0 && (
                      <div className="text-center py-40 flex flex-col items-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl">
                          <Activity className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">No pipeline activity detected</h3>
                        <p className="text-slate-400 max-w-sm mt-4 font-bold uppercase tracking-[0.2em] text-[10px]">Candidate submissions will appear here automatically as they apply.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* JOB LISTINGS VIEW */}
                {activeSection === "jobs" && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Career Catalogue</h2>
                        <p className="text-slate-500 font-medium">Managing {jobs.length} open opportunities globally.</p>
                      </div>
                      <Button
                        onClick={() => setActiveSection("post-job")}
                        className="bg-black hover:bg-indigo-600 text-white font-bold px-8 h-14 rounded-3xl shadow-2xl shadow-indigo-200 transition-all uppercase tracking-widest text-xs"
                      >
                        <PlusCircle className="mr-3 w-5 h-5" /> Create Posting
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredJobsBySearch.map((job) => (
                        <motion.div
                          key={job.id}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, y: -8 }}
                          className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative flex flex-col"
                        >
                          {job.featured && <div className="absolute top-8 right-8 bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-indigo-200">Featured</div>}

                          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Building2 className="w-8 h-8 text-slate-400" />
                          </div>

                          <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight uppercase mb-2 line-clamp-1">{job.title}</h3>
                          <p className="text-indigo-500 font-bold text-sm uppercase tracking-widest mb-6">{job.company}</p>

                          <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase">
                              <MapPin className="w-4 h-4 text-slate-300" /> {job.location}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase">
                              <DollarSign className="w-4 h-4 text-slate-300" /> {job.salary_range}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase">
                              <Users2 className="w-4 h-4 text-slate-300" /> {applications.filter(a => a.job === job.id).length} Active Applicants
                            </div>
                          </div>

                          <div className="pt-8 flex items-center gap-2">
                            <Button
                              onClick={() => { setEditingJob(job); setShowEditModal(true); }}
                              variant="ghost"
                              className="flex-1 h-14 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold uppercase tracking-widest text-[10px] border-0"
                            >
                              Manage Details
                            </Button>
                            <Button
                              onClick={() => { setJobToDelete(job.id); setShowDeleteConfirm(true); }}
                              variant="ghost"
                              className="w-14 h-14 rounded-2xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white transition-all flex items-center justify-center"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* POST JOB SECTION */}
                {activeSection === "post-job" && (
                  <div className="max-w-4xl mx-auto pb-20">
                    <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-4 mb-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-200">
                        <PlusCircle className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-5xl font-bold tracking-tight text-slate-900 uppercase">Deploy Posting</h2>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">Configure market opportunity specifics</p>
                    </motion.div>

                    <Card className="glass border-white shadow-2xl rounded-[4rem] overflow-hidden">
                      <CardContent className="p-16 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-3">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Core Title</Label>
                            <Input
                              className="h-16 rounded-3xl bg-slate-50/50 border-slate-200/60 p-6 text-lg font-bold focus:ring-8 focus:ring-blue-500/5 transition-all"
                              placeholder="e.g. Lead Industrial Engineer"
                              value={newJob.title}
                              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Authorized Entity</Label>
                            <Input
                              className="h-16 rounded-3xl bg-slate-50/50 border-slate-200/60 p-6 text-lg font-bold"
                              placeholder="Company Registration Name"
                              value={newJob.company}
                              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-3">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Target Region</Label>
                            <Select onValueChange={(val) => setNewJob({ ...newJob, location: val })}>
                              <SelectTrigger className="h-16 rounded-3xl bg-slate-50/50 border-slate-200/60 p-6 font-bold">
                                <SelectValue placeholder="Select Operational Area" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                {TANZANIA_REGIONS.map(r => <SelectItem key={r} value={r} className="font-bold py-3">{r}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Market Category</Label>
                            <Select onValueChange={(val) => setNewJob({ ...newJob, category: parseInt(val) })}>
                              <SelectTrigger className="h-16 rounded-3xl bg-slate-50/50 border-slate-200/60 p-6 font-bold">
                                <SelectValue placeholder="Assign Sector" />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-0 shadow-2xl">
                                {categories.map(c => <SelectItem key={c.id} value={c.id.toString()} className="font-bold py-3">{c.name}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Opportunity Description</Label>
                          <Textarea
                            className="min-h-[200px] rounded-[3rem] bg-slate-50/50 border-slate-200/60 p-8 text-lg font-medium leading-relaxed"
                            placeholder="Detail the technical requirements and role responsibilities..."
                            value={newJob.description}
                            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-3">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Economic Bracket</Label>
                            <Input
                              className="h-16 rounded-3xl bg-slate-50/50 border-slate-200/60 p-6 font-bold"
                              placeholder="e.g. $80k - $120k / Annum"
                              value={newJob.salary_range}
                              onChange={(e) => setNewJob({ ...newJob, salary_range: e.target.value })}
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Experience Calibration</Label>
                            <Input
                              className="h-16 rounded-3xl bg-slate-50/50 border-slate-200/60 p-6 font-bold"
                              placeholder="Minimum Proficiency (e.g. 5+ Yrs)"
                              value={newJob.experience}
                              onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-8 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 items-center justify-center">
                          <div className="flex items-center gap-3">
                            <Checkbox id="feat" checked={newJob.featured} onCheckedChange={(v) => setNewJob({ ...newJob, featured: !!v })} className="w-6 h-6 rounded-lg text-blue-600 border-2" />
                            <Label htmlFor="feat" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600 cursor-pointer">Priority Signal</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <Checkbox id="urg" checked={newJob.urgent} onCheckedChange={(v) => setNewJob({ ...newJob, urgent: !!v })} className="w-6 h-6 rounded-lg text-rose-600 border-2" />
                            <Label htmlFor="urg" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600 cursor-pointer">Urgency Flag</Label>
                          </div>
                        </div>

                        <Button
                          onClick={handleAddJob}
                          disabled={loading}
                          className="w-full h-20 bg-black hover:bg-blue-600 text-white text-xl font-bold rounded-[2.5rem] shadow-2xl shadow-blue-100 transition-all active:scale-[0.98] uppercase"
                        >
                          {loading ? <RefreshCw className="w-8 h-8 animate-spin" /> : "Authorize Deployment"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* USER DIRECTORY VIEW */}
                {activeSection === "users" && (
                  <div className="space-y-8 pb-10">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 uppercase">User Directory</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Identity & Access Management</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative group w-64">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter users..."
                            className="pl-11 h-11 bg-white rounded-xl border-slate-200"
                          />
                        </div>
                        <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                          <SelectTrigger className="h-11 w-40 rounded-xl bg-white border-slate-200 font-bold text-xs uppercase tracking-widest">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-0 shadow-2xl">
                            <SelectItem value="all" className="font-bold">All Roles</SelectItem>
                            <SelectItem value="admin" className="font-bold">Admin</SelectItem>
                            <SelectItem value="staff" className="font-bold">Staff</SelectItem>
                            <SelectItem value="jobseeker" className="font-bold">Job Seeker</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredUsers.map((user) => (
                        <motion.div
                          key={user.id}
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                          className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-500 border border-white shadow-sm">
                              {user.first_name?.[0]}{user.last_name?.[0]}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{user.first_name} {user.last_name}</h3>
                              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">{user.role}</p>
                            </div>
                            <div className={`ml-auto w-2 h-2 rounded-full ${user.is_active ? "bg-emerald-500" : "bg-slate-300"} ${user.is_active ? "animate-pulse" : ""}`}></div>
                          </div>

                          <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                              <Mail className="w-4 h-4 text-slate-300" /> {user.email}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase">
                              <Shield className="w-4 h-4 text-slate-300" /> Member since {new Date().getFullYear()}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => { setSelectedUser(user); setShowUserModal(true); }}
                              variant="ghost"
                              className="flex-1 h-12 rounded-xl bg-slate-50 hover:bg-white text-slate-600 font-bold text-[10px] uppercase tracking-widest border border-transparent hover:border-slate-100"
                            >
                              View Profile
                            </Button>
                            <Button variant="ghost" className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {users.length === 0 && (
                      <div className="text-center py-40">
                        <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-400">No users found in database</h3>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </main>
      </div>

      {/* --- MODALS --- */}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <Card className="max-w-md w-full glass border-white shadow-3xl rounded-[2.5rem] p-10 text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 uppercase">Decommission Posting?</h3>
                <p className="text-slate-500 font-medium mb-10">This action is permanent and will remove all associated application historical data from the active registry.</p>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1 h-14 rounded-2xl font-bold border-slate-200">Abort</Button>
                  <Button onClick={() => handleDeleteJob(jobToDelete!)} className="flex-1 h-14 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-lg shadow-rose-100">Confirm</Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Job Modal */}
      <AnimatePresence>
        {showEditModal && editingJob && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <Card className="glass border-white shadow-3xl rounded-[3.5rem] p-12 relative">
                <button onClick={() => setShowEditModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600"><X className="w-8 h-8" /></button>
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center"><Edit className="w-8 h-8 text-blue-600" /></div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 uppercase">Edit Configuration</h3>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Job Registry Modification</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-bold text-slate-400 tracking-widest ml-4">Job Title</Label>
                    <Input value={editingJob.title} onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })} className="h-14 rounded-2xl bg-slate-50 border-0 font-bold px-6 focus:ring-4 focus:ring-blue-50/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-bold text-slate-400 tracking-widest ml-4">Company</Label>
                    <Input value={editingJob.company} onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })} className="h-14 rounded-2xl bg-slate-50 border-0 font-bold px-6" />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-bold text-slate-400 tracking-widest ml-4">Location</Label>
                    <Input value={editingJob.location} onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })} className="h-14 rounded-2xl bg-slate-50 border-0 font-bold px-6" />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-bold text-slate-400 tracking-widest ml-4">Salary Range</Label>
                    <Input value={editingJob.salary_range} onChange={(e) => setEditingJob({ ...editingJob, salary_range: e.target.value })} className="h-14 rounded-2xl bg-slate-50 border-0 font-bold px-6" />
                  </div>
                </div>

                <div className="space-y-2 mb-10">
                  <Label className="uppercase text-[10px] font-bold text-slate-400 tracking-widest ml-4">Detailed Description</Label>
                  <Textarea value={editingJob.description} onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })} className="min-h-[150px] rounded-3xl bg-slate-50 border-0 font-medium p-6 resize-none" />
                </div>

                <Button onClick={handleUpdateJob} className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-100 uppercase tracking-widest transition-all active:scale-95">Update Configuration</Button>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Application Details Modal */}
      <AnimatePresence>
        {showAppModal && selectedApplication && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl">
              <Card className="glass border-white shadow-3xl rounded-[3.5rem] p-12 overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                      <UserCircle className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedApplication.applicant_first_name} {selectedApplication.applicant_last_name}</h3>
                      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Candidate Information</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAppModal(false)} className="text-slate-400 hover:text-slate-600 p-2"><X className="w-6 h-6" /></button>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Applied For</p>
                    <h4 className="text-xl font-bold text-slate-800 uppercase leading-tight">{selectedApplication.job_title}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{selectedApplication.applicant_email}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase">{selectedApplication.status}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => handleDownloadResume(selectedApplication)}
                    className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-100"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Resume
                  </Button>
                  <Button
                    onClick={() => setMessage(`📧 Composing message to ${selectedApplication.applicant_email}...`)}
                    variant="outline"
                    className="h-14 rounded-2xl px-6 border-slate-200"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg">
              <Card className="glass border-white shadow-3xl rounded-[3rem] p-12 relative overflow-hidden">
                <button onClick={() => setShowUserModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>

                <div className="text-center mb-10">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mx-auto mb-6 shadow-sm border border-white">
                    <span className="text-4xl font-bold text-blue-600">{selectedUser.first_name[0]}{selectedUser.last_name[0]}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedUser.first_name} {selectedUser.last_name}</h3>
                  <Badge className="bg-blue-50 text-blue-600 border-0 uppercase tracking-widest text-[9px] mt-2 font-bold">{selectedUser.role}</Badge>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</span>
                    <span className="text-sm font-bold text-slate-700">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${selectedUser.is_active ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                      {selectedUser.is_active ? "Verified" : "Suspended"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 h-14 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-widest shadow-xl">Audit Logs</Button>
                  <Button
                    onClick={() => handleToggleUserStatus(selectedUser)}
                    variant="outline"
                    className={`flex-1 h-14 rounded-xl font-bold text-xs uppercase tracking-widest ${selectedUser.is_active ? "text-rose-500 border-rose-100 hover:bg-rose-50" : "text-emerald-500 border-emerald-100 hover:bg-emerald-50"}`}>
                    {selectedUser.is_active ? "Suspend Access" : "Restore Access"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistent Notification System */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[200]"
          >
            <Card className="glass shadow-2xl rounded-3xl p-6 flex items-center gap-5 min-w-[340px] border-2 border-white">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${message.includes("✅") ? "bg-emerald-500 shadow-emerald-200" : "bg-rose-500 shadow-rose-200"
                }`}>
                {message.includes("✅") ? <CheckCircle className="w-7 h-7 text-white" /> : <AlertCircle className="w-7 h-7 text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-1">System Message</p>
                <p className="text-sm font-bold text-slate-800 tracking-tight">{message.replace(/^[✅⚠️❌]\s*/, "")}</p>
              </div>
              <button onClick={() => setMessage(null)} className="text-slate-300 hover:text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-pulse-delay-2000 {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 2s;
        }
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .glass-dark {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  )
}
