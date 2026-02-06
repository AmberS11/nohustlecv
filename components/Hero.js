'use client'

import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [flippingText, setFlippingText] = useState(0)
  
  const taglines = [
    "Premium resumes, fairly priced.",
    "AI-powered, human-centered.",
    "Your career's secret weapon.",
    "From student to CEO.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFlippingText((prev) => (prev + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    "AI Cover Letter Generator",
    "ATS-Optimized Templates",
    "LinkedIn Import",
    "Identity-Based Assistance",
    "Unlimited Exports",
    "Priority Support"
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 px-4 py-2 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Premium quality at ¼ competitor prices
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="block text-dark dark:text-light">
            Professional Resumes,
          </span>
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Fairly Priced
          </span>
        </h1>

        {/* Animated tagline */}
        <div className="h-16 mb-8">
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400">
            {taglines[flippingText]}
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:scale-105 text-lg font-semibold"
          >
            Start Building Free
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-primary dark:hover:border-primary transition-all text-lg font-semibold"
          >
            Check ATS Score
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="text-3xl font-bold text-dark dark:text-light">5,000+</div>
            <div className="text-sm">Resumes Created</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-dark dark:text-light">94%</div>
            <div className="text-sm">ATS Pass Rate</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-dark dark:text-light">₹799</div>
            <div className="text-sm">Yearly Plan (Save 78%)</div>
          </div>
        </div>

        {/* Animated resume preview */}
        <div className="mt-20 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-3xl" />
          <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg" />
                <div>
                  <div className="font-bold text-lg">Johnathan Rhodes</div>
                  <div className="text-gray-500 text-sm">Senior Product Manager</div>
                </div>
              </div>
              <div className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                ATS Score: 92/100
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
