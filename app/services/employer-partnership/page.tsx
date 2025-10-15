export default function EmployerPartnershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MRC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MRC Careers</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Home
              </a>
              <a href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Jobs
              </a>
              <a href="/services" className="text-blue-600 font-medium">
                Services
              </a>
              <a href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Resources
              </a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Login
              </a>
              <a
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Employer Partnership Program</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Partner with MRC Careers to access top international talent. We connect you with pre-screened, qualified
            candidates ready to contribute to your organization's success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-semibold">
              Become a Partner
            </button>
            <button className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition-all duration-200 font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Partner With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pre-Screened Candidates</h3>
              <p className="text-gray-600">
                Access to thoroughly vetted candidates with verified skills, experience, and qualifications.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Faster Hiring Process</h3>
              <p className="text-gray-600">
                Reduce time-to-hire with our streamlined recruitment process and ready-to-work candidates.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost-Effective Solutions</h3>
              <p className="text-gray-600">
                Reduce recruitment costs with our competitive rates and successful placement guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Employers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Employer Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Talent Sourcing</h3>
              <p className="text-gray-600 mb-6">
                Access our extensive database of international professionals across various industries and skill levels.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Global talent pool</li>
                <li>• Industry-specific expertise</li>
                <li>• Skills-based matching</li>
                <li>• Cultural fit assessment</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Visa Support</h3>
              <p className="text-gray-600 mb-6">
                Complete visa and work permit assistance for your international hires, ensuring smooth onboarding.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Work permit processing</li>
                <li>• Documentation assistance</li>
                <li>• Legal compliance</li>
                <li>• Timeline management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Partnership Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Starter</h3>
              <div className="text-3xl font-bold text-amber-600 mb-4">$2,500</div>
              <p className="text-gray-600 text-sm mb-4">Per successful placement</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Up to 5 placements/year</li>
                <li>• Basic candidate screening</li>
                <li>• Email support</li>
                <li>• 30-day replacement guarantee</li>
              </ul>
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-amber-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional</h3>
              <div className="text-3xl font-bold text-amber-600 mb-4">$2,000</div>
              <p className="text-gray-600 text-sm mb-4">Per successful placement</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Up to 20 placements/year</li>
                <li>• Advanced screening & testing</li>
                <li>• Dedicated account manager</li>
                <li>• 60-day replacement guarantee</li>
                <li>• Visa assistance included</li>
              </ul>
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-amber-600 mb-4">Custom</div>
              <p className="text-gray-600 text-sm mb-4">Volume-based pricing</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Unlimited placements</li>
                <li>• Custom screening processes</li>
                <li>• Priority support</li>
                <li>• 90-day replacement guarantee</li>
                <li>• Full visa & legal support</li>
                <li>• Dedicated recruitment team</li>
              </ul>
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Partner Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">TechCorp Solutions</h4>
                  <p className="text-gray-600 text-sm">Software Development Company</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "MRC Careers helped us hire 15 skilled developers from various countries. The quality of candidates and
                support throughout the process was exceptional."
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">HealthFirst Medical</h4>
                  <p className="text-gray-600 text-sm">Healthcare Organization</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The visa assistance and pre-screening process saved us months of recruitment time. Our international
                hires are now key team members."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Access Global Talent?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Join hundreds of companies that trust MRC Careers for their international recruitment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold">
              Become a Partner
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-amber-600 transition-all duration-200 font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
