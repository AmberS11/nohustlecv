'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Zap } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showJourney, setShowJourney] = useState(false)
  const [liveCount, setLiveCount] = useState(0)
  const [currentStat, setCurrentStat] = useState(0)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100 })

  // Live resume counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Rotating stats
  const stats = [
    { value: "94%", label: "ATS Success Rate", icon: <Zap className="w-4 h-4" /> },
    { value: "₹799", label: "Yearly Plan", icon: <TrendingUp className="w-4 h-4" /> },
    { value: "28k+", label: "Resumes Built", icon: <Users className="w-4 h-4" /> },
    { value: "4.9★", label: "User Rating", icon: <Award className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Particles for dynamic background
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = [...Array(30)].map(() => ({
      id: Math.random(),
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      size: Math.random() * 3,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          scale: videoScale,
          opacity: videoOpacity
        }}
      >
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/90 to-primary/20" />
        )}
        
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/dream-journey.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
      </motion.div>

      {/* Dynamic Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-primary/20 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [particle.y, particle.y - 200],
              x: [particle.x, particle.x + 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Authority Badges */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white dark:border-dark" />
                ))}
              </div>
              <span className="text-sm text-gray-300">Trusted by 28,000+ professionals</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Let there be</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-gold bg-clip-text text-transparent">
                change.
              </span>
            </h1>

            {/* Dynamic Stat Display */}
            <motion.div
              key={currentStat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 inline-block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  {stats[currentStat].icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats[currentStat].value}</div>
                  <div className="text-sm text-gray-400">{stats[currentStat].label}</div>
                </div>
              </div>
            </motion.div>

            {/* Subheadline */}
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              It is human in the lead, not human in the loop. Technology serves your dream — not the other way around.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/templates"
                className="group relative px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all text-lg font-semibold overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
              
              <button
                onClick={() => setShowJourney(true)}
                className="px-8 py-4 border-2 border-white/20 rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all text-white text-lg font-semibold backdrop-blur-sm"
              >
                Explore 360° Value
              </button>
            </div>

            {/* Live Activity Feed */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>{liveCount} resumes built in the last hour</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="w-4 h-4 text-primary" />
                <span>28,452 dreams launched this month</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - 360° Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Interactive Journey Map */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Your 360° Journey</h3>
              
              {/* Journey Steps */}
              <div className="space-y-6">
                {[
                  { stage: "Resume Built", value: "28,452", icon: "📄", active: true },
                  { stage: "ATS Optimized", value: "94%", icon: "⚡", active: true },
                  { stage: "Applications Sent", value: "112k", icon: "📨", active: true },
                  { stage: "Interviews Landed", value: "31k", icon: "🎯", active: false },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl
                        ${step.active ? 'bg-primary/20' : 'bg-gray-800/50'}`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-white">{step.stage}</span>
                          <span className={`font-bold ${step.active ? 'text-primary' : 'text-gray-500'}`}>
                            {step.value}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${step.active ? 'bg-primary' : 'bg-gray-600'}`}
                            initial={{ width: 0 }}
                            animate={{ width: step.active ? '100%' : '60%' }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="absolute left-5 top-10 w-0.5 h-6 bg-gradient-to-b from-primary to-transparent" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Live Impact Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">Total Salary Impact</span>
                  <span className="text-2xl font-bold text-primary">₹2.4Cr</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Average increase of ₹84k per person</p>
              </motion.div>
            </div>

            {/* CEO Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-8 -left-8 w-64 bg-dark/90 backdrop-blur-md rounded-xl p-4 border border-gray-800"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div>
                  <p className="text-white font-semibold">Amber</p>
                  <p className="text-xs text-gray-400">Founder, NoHustleCV</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                "It's not about formatting text. It's about formatting futures."
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-1 bg-primary/20"
          style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
        />
      </div>

      {/* 360° Value Modal */}
      {showJourney && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setShowJourney(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-dark border border-gray-800 rounded-2xl max-w-4xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-white mb-6">360° Value Creation</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Resumes Built", value: "28,452" },
                { label: "ATS Success Rate", value: "94%" },
                { label: "Salary Impact", value: "₹2.4Cr" },
                { label: "Partner Colleges", value: "50+" },
                { label: "Active Users", value: "12k" },
                { label: "Avg. Interview Calls", value: "8.3" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-primary mb-1">{item.value}</div>
                  <div className="text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowJourney(false)}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
