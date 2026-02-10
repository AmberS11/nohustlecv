import { Brain, Palette, Shield, Users, Zap, Globe } from 'lucide-react'

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Intelligence",
    description: "GPT-4 powered cover letters and resume suggestions that sound human, not robotic.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Design-First Templates",
    description: "Premium, ATS-optimized templates that balance beauty with functionality.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "ATS Score Guarantee",
    description: "Every resume is optimized to pass Applicant Tracking Systems with 90%+ scores.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Identity-Based Assistance",
    description: "Tailored guidance for students, professionals, career switchers, and returners.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "One-Click Export",
    description: "Export to PDF, DOCX, or plain text. No watermarks for PRO users.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "India-First, Global Ready",
    description: "Built for Indian job markets, with international format support.",
    color: "from-indigo-500 to-violet-500",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-dark dark:text-light">Why </span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NoHustleCV
            </span>
            <span className="text-dark dark:text-light">?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're not just another resume builder. We're your career's co-pilot.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon with gradient border */}
              <div className="relative mb-6">
                <div className={`absolute -inset-4 bg-gradient-to-br ${feature.color} blur-xl opacity-20 group-hover:opacity-40 rounded-2xl transition-opacity duration-300`} />
                <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3 text-dark dark:text-light">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-8 left-8 right-8 h-px bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Comparison section - FIXED FOR MOBILE */}
        <div className="mt-20 bg-gradient-to-br from-dark to-gray-900 rounded-3xl p-6 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Premium shouldn't mean overpriced
              </h3>
              <p className="text-gray-300 mb-6 text-sm md:text-base">
                While competitors charge ₹2,000+ for similar features, we deliver premium quality at a fair price.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white/10 rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-bold mb-2">₹799</div>
                  <div className="text-gray-300 text-sm md:text-base">Our yearly plan</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-bold mb-2">₹2,400</div>
                  <div className="text-gray-300 text-sm md:text-base">Competitor average</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold mb-2">¼</div>
                <div className="text-lg md:text-xl">the price</div>
                <div className="text-gray-300 mt-2 text-sm md:text-base">Same premium quality</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
