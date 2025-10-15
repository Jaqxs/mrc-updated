export default function InterviewPreparationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
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
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Interview Preparation Program</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master the art of interviewing with our comprehensive preparation program. Build confidence and ace your
            international job interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 font-semibold">
              Start Preparation
            </button>
            <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg hover:bg-teal-50 transition-all duration-200 font-semibold">
              Book Mock Interview
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Communication Skills</h3>
              <p className="text-gray-600">
                Develop clear, confident communication and learn to articulate your thoughts effectively.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Behavioral Questions</h3>
              <p className="text-gray-600">
                Master the STAR method and learn to answer behavioral questions with compelling examples.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Interviews</h3>
              <p className="text-gray-600">
                Prepare for technical questions and problem-solving scenarios specific to your industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Program Structure</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Assessment & Goal Setting</h3>
                <p className="text-gray-600">
                  Initial assessment of your interview skills and setting specific improvement goals.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Theory & Best Practices</h3>
                <p className="text-gray-600">
                  Learn interview fundamentals, common question types, and proven response strategies.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mock Interviews</h3>
                <p className="text-gray-600">
                  Practice with realistic mock interviews and receive detailed feedback on your performance.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Final Preparation</h3>
                <p className="text-gray-600">
                  Final coaching session and personalized tips for your specific interview scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preparation Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Prep</h3>
              <div className="text-3xl font-bold text-teal-600 mb-4">$149</div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• 2 mock interviews</li>
                <li>• Interview guide materials</li>
                <li>• Basic feedback report</li>
                <li>• Email support</li>
              </ul>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-teal-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Prep</h3>
              <div className="text-3xl font-bold text-teal-600 mb-4">$299</div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• 5 mock interviews</li>
                <li>• Comprehensive materials</li>
                <li>• Detailed feedback reports</li>
                <li>• 1-on-1 coaching session</li>
                <li>• Phone & email support</li>
              </ul>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Get Started
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Executive Prep</h3>
              <div className="text-3xl font-bold text-teal-600 mb-4">$499</div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Unlimited mock interviews</li>
                <li>• Premium materials & resources</li>
                <li>• Video analysis & feedback</li>
                <li>• Personal interview coach</li>
                <li>• 24/7 support</li>
                <li>• Success guarantee</li>
              </ul>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of successful candidates who have landed their dream jobs with our interview preparation
            program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold">
              Start Preparation
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-200 font-semibold">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
