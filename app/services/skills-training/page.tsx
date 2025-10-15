export default function SkillsTrainingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Skills Assessment & Training</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Identify your strengths, bridge skill gaps, and enhance your qualifications with our comprehensive
            assessment and training programs designed for international job markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold">
              Start Assessment
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-all duration-200 font-semibold">
              View Training Programs
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Skills Assessment</h3>
              <p className="text-gray-600">
                Detailed evaluation of your technical and soft skills to identify strengths and areas for improvement.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry-Specific Training</h3>
              <p className="text-gray-600">
                Targeted training programs for various industries including healthcare, IT, engineering, and
                hospitality.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Certification Programs</h3>
              <p className="text-gray-600">
                Internationally recognized certifications to boost your credentials and job prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Training Process</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Initial Skills Assessment</h3>
                <p className="text-gray-600">
                  Comprehensive evaluation of your current skills, experience, and career goals.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Training Plan</h3>
                <p className="text-gray-600">
                  Custom training program designed based on your assessment results and target job requirements.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-on Training</h3>
                <p className="text-gray-600">
                  Interactive training sessions with experienced instructors and practical exercises.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking & Certification</h3>
                <p className="text-gray-600">
                  Regular progress assessments and certification upon successful completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Training Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Assessment</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">$99</div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Skills assessment report</li>
                <li>• Career recommendations</li>
                <li>• Basic training resources</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Training</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">$299</div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Complete skills assessment</li>
                <li>• 4-week training program</li>
                <li>• Industry certification</li>
                <li>• Job placement assistance</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Package</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">$599</div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Comprehensive assessment</li>
                <li>• 8-week intensive training</li>
                <li>• Multiple certifications</li>
                <li>• Guaranteed job placement</li>
                <li>• 6-month support</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Enhance Your Skills?</h2>
          <p className="text-xl text-green-100 mb-8">
            Take the first step towards your international career with our comprehensive skills training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold">
              Start Free Assessment
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200 font-semibold">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
