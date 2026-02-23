'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showPromiseModal, setShowPromiseModal] = useState(false)
  const [particles, setParticles] = useState([])
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Initialize particles only on client side
  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      id: Math.random(),
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          scale: videoScale,
          opacity: videoOpacity
        }}
      >
        {/* Fallback gradient while video loads */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/90 to-primary/20" />
        )}
        
        {/* Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          poster="/hero-poster.jpg"
        >
          <source src="/videos/dream-journey.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/50 to-transparent" />
      </motion.div>

      {/* Floating dream particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [particle.y, particle.y - 100],
              opacity: [0, 1, 0],
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

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 h-full flex items-center"
        style={{ y: textY }}
      >
        <div className="max-w-4xl">
          {/* Premium badge with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white">
              Premium quality at ¼ competitor prices
            </span>
          </motion.div>

          {/* Main headline with staggered animation */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="block text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your dream job
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-primary via-secondary to-gold bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              starts here.
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            NoHustleCV isn't just a resume builder. It's the bridge between who you are and who you want to become.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link
              href="/templates"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all text-lg font-semibold relative overflow-hidden"
            >
              <span className="relative z-10">Start Your Journey</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.div>
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </Link>

            <button
              onClick={() => setShowPromiseModal(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all text-lg font-semibold text-white backdrop-blur-sm"
            >
              <Play className="w-5 h-5" />
              See Our Promise
            </button>
          </motion.div>

          {/* Live stats ticker */}
          <motion.div 
            className="absolute bottom-12 left-6 right-6 flex justify-between items-center text-white/60 text-sm border-t border-white/10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Premium resumes built daily</span>
            </div>
            <div className="hidden md:block">⚡ Trusted by students & professionals</div>
            <div className="hidden md:block">🎯 ₹799/year · Save 78%</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Promise Modal - No Fake Stories, Just Real Value */}
      {showPromiseModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowPromiseModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-dark border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">The NoHustleCV Promise</h2>
              <button
                onClick={() => setShowPromiseModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              
              {/* Premium Quality at Fair Price */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">💰</span>
                  Premium Quality at ¼ the Price
                </h3>
                <p className="text-gray-400">
                  While competitors charge ₹2,000+ for premium templates, NoHustleCV delivers the same quality at just ₹799/year. 
                  Because career advancement shouldn't cost a fortune.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-sm text-gray-400">Competitors</p>
                    <p className="text-white font-bold">₹2,400+</p>
                    <p className="text-xs text-gray-500">per year</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                    <p className="text-sm text-primary">NoHustleCV</p>
                    <p className="text-white font-bold">₹799</p>
                    <p className="text-xs text-primary">per year (Save 78%)</p>
                  </div>
                </div>
              </div>

              {/* Identity-Based Templates */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">🔄</span>
                  Templates That Adapt to You
                </h3>
                <p className="text-gray-400">
                  Not just one-size-fits-all. Our templates automatically reorder based on your career stage:
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-800/50 rounded-lg p-2">
                    <p className="text-white font-medium">🎓 Student</p>
                    <p className="text-xs text-gray-400">Education first</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-2">
                    <p className="text-white font-medium">💼 Professional</p>
                    <p className="text-xs text-gray-400">Experience first</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-2">
                    <p className="text-white font-medium">🦋 Career Switcher</p>
                    <p className="text-xs text-gray-400">Skills first</p>
                  </div>
                </div>
              </div>

              {/* AI-Powered Tools */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">🤖</span>
                  AI That Works for You
                </h3>
                <p className="text-gray-400">
                  From cover letters to ATS optimization, our AI helps you stand out — without replacing your voice.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="text-primary">✓</span> GPT-4 Cover Letter Generator
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="text-primary">✓</span> ATS Score Checker
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <span className="text-primary">✓</span> Keyword Optimization
                  </li>
                </ul>
              </div>

              {/* College Partnerships */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">🏛️</span>
                  Campus Partnerships
                </h3>
                <p className="text-gray-400">
                  We work directly with colleges to help every student build professional, ATS-optimized resumes — at institutional rates.
                </p>
                <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <span className="text-primary font-bold">200+ students</span> from partner colleges already placed in top companies.
                  </p>
                </div>
              </div>

              {/* The Bottom Line */}
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 border border-primary/30">
                <h3 className="text-xl font-bold text-white mb-2">No fake stories. Just real value.</h3>
                <p className="text-gray-300">
                  We don't need to make up success stories. Our product speaks for itself — premium quality at a price that's actually fair.
                </p>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={() => setShowPromiseModal(false)}
                >
                  Start Building Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
