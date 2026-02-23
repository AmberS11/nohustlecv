'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Zap, CheckCircle } from 'lucide-react'
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
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Live resume counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Rotating stats
  const stats = [
    { value: "3", label: "Premium Templates", sub: "More on the way", icon: <Sparkles className="w-4 h-4" /> },
    { value: "₹799", label: "Yearly Plan", sub: "¼ competitor price", icon: <TrendingUp className="w-4 h-4" /> },
    { value: "1", label: "Free Premium Resume", sub: "+ AI Cover Letter", icon: <Zap className="w-4 h-4" /> },
    { value: "8", label: "Identity-Based Layouts", sub: "For every stage", icon: <Users className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // 360° Journey Stages
  const journeyStages = [
    { stage: "Resume Built", icon: "📄", color: "from-blue-600 to-cyan-600", value: "3 templates" },
    { stage: "ATS Optimized", icon: "⚡", color: "from-green-600 to-emerald-600", value: "94% success" },
    { stage: "Applications", icon: "📨", color: "from-purple-600 to-pink-600", value: "1-click apply" },
    { stage: "Interviews", icon: "🎯", color: "from-orange-600 to-red-600", value: "8 avg calls" },
    { stage: "Growth", icon: "📈", color: "from-primary to-secondary", value: "Career path" },
  ]

  const handleRotate = (direction) => {
    if (direction === 'next') {
      setRotation(prev => prev - 72)
    } else {
      setRotation(prev => prev + 72)
    }
  }

  // Particles
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = [...Array(15)].map(() => ({
      id: Math.random(),
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      size: Math.random() * 2,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Video Background - Darker overlay for better contrast */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale: videoScale }}
      >
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-primary/10" />
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

        {/* Darker gradient overlay - increased opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
      </motion.div>

      {/* Dynamic Particles - More subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-primary/30 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [particle.y, particle.y - 150],
              opacity: [0, 0.3, 0],
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

      {/* Main Content with scroll-based opacity */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 pt-32 pb-20"
        style={{ opacity: contentOpacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Authority Badges - Darker background */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-dark flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {['A', 'M', 'K'][i-1]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-300 bg-dark/30 px-3 py-1 rounded-full backdrop-blur-sm">
                Trusted by early adopters
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white drop-shadow-lg">Built different.</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-gold bg-clip-text text-transparent drop-shadow-lg">
                Built for you.
              </span>
            </h1>

            {/* Dynamic Stat Display - Darker background */}
            <motion.div
              key={currentStat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-dark/50 backdrop-blur-md rounded-xl border border-gray-800 inline-block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/30 rounded-lg">
                  {stats[currentStat].icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats[currentStat].value}</div>
                  <div className="text-sm text-gray-300">{stats[currentStat].label}</div>
                  <div className="text-xs text-primary">{stats[currentStat].sub}</div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid - Darker cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3", label: "Premium Templates", sub: "More on the way" },
                { value: "₹799", label: "Yearly Plan", sub: "¼ competitor price" },
                { value: "1", label: "Free Premium Resume", sub: "+ AI Cover Letter" },
                { value: "8", label: "Identity-Based Layouts", sub: "For every stage" },
              ].map((stat, i) => (
                <div key={i} className="bg-dark/40 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-primary/30 transition-colors">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                  <div className="text-xs text-primary mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Subheadline */}
            <p className="text-lg text-gray-300 bg-dark/20 px-4 py-2 rounded-lg inline-block backdrop-blur-sm">
              Walking alongside your career journey — with premium tools at fair prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/templates"
                className="group relative px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all text-lg font-semibold overflow-hidden shadow-lg"
              >
                <span className="relative z-10">Start Your Journey</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
              
              <button
                onClick={() => setShowJourney(true)}
                className="px-8 py-4 bg-dark/50 backdrop-blur-md border border-gray-700 rounded-xl hover:border-primary/50 hover:bg-dark/70 transition-all text-white text-lg font-semibold"
              >
                Explore 360° Journey
              </button>
            </div>

            {/* Live Activity Feed */}
            <div className="space-y-2 bg-dark/30 p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>{liveCount}+ early users building resumes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Monthly & Lifetime plans available</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - 360° Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className="bg-dark/40 backdrop-blur-md rounded-2xl p-8 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Your 360° Journey</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRotate('prev')}
                    className="p-2 bg-dark/60 rounded-lg hover:bg-dark/80 transition-colors text-white border border-gray-700"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => handleRotate('next')}
                    className="p-2 bg-dark/60 rounded-lg hover:bg-dark/80 transition-colors text-white border border-gray-700"
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
                        <div className={`w-48 h-48 bg-gradient-to-br ${stage.color} rounded-2xl p-6 shadow-2xl border border-gray-700 flex flex-col items-center justify-center text-center`}>
                          <div className="text-4xl mb-3 drop-shadow-lg">{stage.icon}</div>
                          <h4 className="text-white font-bold mb-2 drop-shadow">{stage.stage}</h4>
                          <p className="text-white/90 text-sm drop-shadow">{stage.value}</p>
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
                    className={`h-2 rounded-full transition-all ${
                      Math.abs(rotation + i * 72) % 360 < 10
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Founder Quote Card - Moved inside to avoid overlap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 w-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md rounded-xl p-6 border border-primary/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-white text-lg italic drop-shadow">
                    "We're not here to copy. We're here to build something that actually cares about your journey — without the premium price tag."
                  </p>
                  <p className="text-primary mt-2 font-medium">— Amber, Founder of NoHustleCV</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 360° Modal */}
      {showJourney && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setShowJourney(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-dark border border-gray-800 rounded-2xl max-w-4xl w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Your 360° Journey</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-gray-300">Premium Templates</div>
                <div className="text-xs text-primary mt-1">More on the way</div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-3xl font-bold text-primary mb-1">₹799</div>
                <div className="text-gray-300">Yearly Plan</div>
                <div className="text-xs text-primary mt-1">¼ competitor price</div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-3xl font-bold text-primary mb-1">1</div>
                <div className="text-gray-300">Free Premium Resume</div>
                <div className="text-xs text-primary mt-1">+ AI Cover Letter</div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-3xl font-bold text-primary mb-1">8</div>
                <div className="text-gray-300">Identity-Based Layouts</div>
                <div className="text-xs text-primary mt-1">For every stage</div>
              </div>
            </div>
            <p className="text-gray-400 mt-6 text-center">
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
