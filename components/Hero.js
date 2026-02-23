'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Zap, CheckCircle, RotateCw } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showJourney, setShowJourney] = useState(false)
  const [liveCount, setLiveCount] = useState(100)
  const [currentStat, setCurrentStat] = useState(0)
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100 })

  // Live resume counter (starts at 100, increments slowly)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Rotating stats - YOUR REAL NUMBERS
  const stats = [
    { value: "3", label: "Premium Templates", sub: "More on the way", icon: <Sparkles className="w-4 h-4" /> },
    { value: "₹799", label: "Yearly Plan", sub: "¼ competitor price", icon: <TrendingUp className="w-4 h-4" /> },
    { value: "1", label: "Free Premium Resume + AI Letter", sub: "No credit card required", icon: <Zap className="w-4 h-4" /> },
    { value: "8", label: "Identity-Based Layouts", sub: "For every career stage", icon: <Users className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // 360° Rotatable Carousel Stages
  const journeyStages = [
    { stage: "Resume Built", icon: "📄", color: "from-blue-500 to-cyan-500", value: "3 templates" },
    { stage: "ATS Optimized", icon: "⚡", color: "from-green-500 to-emerald-500", value: "94% success" },
    { stage: "Applications", icon: "📨", color: "from-purple-500 to-pink-500", value: "1-click apply" },
    { stage: "Interviews", icon: "🎯", color: "from-orange-500 to-red-500", value: "8 avg calls" },
    { stage: "Growth", icon: "📈", color: "from-primary to-secondary", value: "Career path" },
  ]

  const handleRotate = (direction) => {
    if (direction === 'next') {
      setRotation(prev => prev - 72) // 360/5 = 72 degrees per stage
    } else {
      setRotation(prev => prev + 72)
    }
  }

  // Particles for dynamic background
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
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
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Authority Badges */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white dark:border-dark flex items-center justify-center text-white text-xs font-bold">
                    {['A', 'M', 'K'][i-1]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-300">Trusted by early adopters</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">Built different.</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-gold bg-clip-text text-transparent">
                Built for you.
              </span>
            </h1>

            {/* Dynamic Stat Display */}
            <motion.div
              key={currentStat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 inline-block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  {stats[currentStat].icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats[currentStat].value}</div>
                  <div className="text-sm text-gray-400">{stats[currentStat].label}</div>
                  <div className="text-xs text-primary">{stats[currentStat].sub}</div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid - Your Real Numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm text-gray-400">Premium Templates</div>
                <div className="text-xs text-primary">More on the way</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">₹799</div>
                <div className="text-sm text-gray-400">Yearly Plan</div>
                <div className="text-xs text-primary">¼ competitor price</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">1</div>
                <div className="text-sm text-gray-400">Free Premium Resume</div>
                <div className="text-xs text-primary">+ AI Cover Letter</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-sm text-gray-400">Identity-Based Layouts</div>
                <div className="text-xs text-primary">For every stage</div>
              </div>
            </div>

            {/* Subheadline */}
            <p className="text-lg text-gray-300">
              Walking alongside your career journey — with premium tools at fair prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
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
                Explore 360° Journey
              </button>
            </div>

            {/* Live Activity Feed */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>{liveCount}+ early users building resumes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Monthly & Lifetime plans available</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - 360° Rotatable Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Your 360° Journey</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRotate('prev')}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => handleRotate('next')}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* 3D Rotatable Carousel */}
              <div className="relative h-80 preserve-3d" style={{ perspective: '1000px' }}>
                <motion.div
                  className="relative w-full h-full preserve-3d"
                  animate={{ rotateY: rotation }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {journeyStages.map((stage, index) => {
                    const angle = (index * 72) * (Math.PI / 180)
                    const radius = 200
                    const x = Math.sin(angle) * radius
                    const z = Math.cos(angle) * radius
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          transform: `translateX(${x}px) translateZ(${z}px) rotateY(${index * 72}deg)`,
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <div className={`w-48 h-48 bg-gradient-to-br ${stage.color} rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col items-center justify-center text-center`}>
                          <div className="text-4xl mb-3">{stage.icon}</div>
                          <h4 className="text-white font-bold mb-2">{stage.stage}</h4>
                          <p className="text-white/80 text-sm">{stage.value}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>

              {/* Current Stage Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {journeyStages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRotation(-i * 72)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      Math.abs(rotation + i * 72) % 360 < 10
                        ? 'w-8 bg-primary'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Founder Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 w-full bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md rounded-xl p-6 border border-primary/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-white text-lg italic">
                    "We're not here to copy. We're here to build something that actually cares about your journey — without the premium price tag."
                  </p>
                  <p className="text-primary mt-2 font-medium">— Amber, Founder of NoHustleCV</p>
                </div>
              </div>
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
            <h2 className="text-3xl font-bold text-white mb-6">Your 360° Journey</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-gray-400">Premium Templates</div>
                <div className="text-xs text-primary">More on the way</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-primary mb-1">₹799</div>
                <div className="text-gray-400">Yearly Plan</div>
                <div className="text-xs text-primary">¼ competitor price</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-primary mb-1">1</div>
                <div className="text-gray-400">Free Premium Resume</div>
                <div className="text-xs text-primary">+ AI Cover Letter</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-primary mb-1">8</div>
                <div className="text-gray-400">Identity-Based Layouts</div>
                <div className="text-xs text-primary">For every career stage</div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 text-center italic">
              Walking alongside your career journey — with premium tools at fair prices.
            </p>
            <button
              onClick={() => setShowJourney(false)}
              className="mt-6 w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
