export default function VisaAssistancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
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
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Visa & Work Permit Assistance</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Navigate the complex visa and work permit process with confidence. Our experts guide you through every step
            to ensure successful applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-semibold">
              Start Application
            </button>
            <button className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-all duration-200 font-semibold">
              Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Visa Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Work Visa Applications</h3>
              <p className="text-gray-600">
                Complete assistance with work visa applications for various countries including documentation and
                submission.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Document Verification</h3>
              <p className="text-gray-600">
                Professional verification and authentication of all required documents for visa applications.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm6 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Compliance</h3>
              <p className="text-gray-600">
                Ensure all applications meet legal requirements and immigration laws of destination countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Countries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Canada",
              "Australia",
              "USA",
              "UK",
              "Germany",
              "UAE",
              "Singapore",
              "New Zealand",
              "Netherlands",
              "Sweden",
              "Norway",
              "Switzerland",
            ].map((country) => (
              <div
                key={country}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-gray-900 text-sm">{country}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Process</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Initial Consultation</h3>
                <p className="text-gray-600">
                  Free consultation to assess your visa requirements and eligibility for different countries.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Preparation</h3>
                <p className="text-gray-600">
                  Comprehensive document checklist and assistance with gathering and preparing all required paperwork.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submission</h3>
                <p className="text-gray-600">
                  Professional submission of your visa application with complete documentation and follow-up.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Status Updates & Support</h3>
                <p className="text-gray-600">
                  Regular updates on application status and ongoing support until visa approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Visa Application?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Get expert assistance with your visa and work permit applications. Our success rate speaks for itself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold">
              Start Application
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200 font-semibold">
              Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
