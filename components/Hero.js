'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Play } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showStoryModal, setShowStoryModal] = useState(false)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Sample success stories for modal
  const successStories = [
    {
      name: "Priya S.",
      role: "Software Engineer @ Google",
      image: "/stories/priya.jpg", // Placeholder
      video: "/stories/priya-story.mp4", // Placeholder
      quote: "I applied to 12 companies. Got 8 interview calls. NoHustleCV didn't just format my resume — it formatted my confidence.",
      beforeAfter: {
        before: "2 interviews",
        after: "8 interviews",
        salaryBefore: "₹12 LPA",
        salaryAfter: "₹45 LPA"
      }
    },
    // Add more stories as needed
  ]

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
          poster="/hero-poster.jpg" // Add a poster image
        >
          <source src="/videos/dream-journey.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/50 to-transparent" />
      </motion.div>

      {/* Floating dream particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
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
              Your dream job starts here
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
              onClick={() => setShowStoryModal(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all text-lg font-semibold text-white backdrop-blur-sm"
            >
              <Play className="w-5 h-5" />
              Watch Stories
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
              <span>3 resumes being built right now</span>
            </div>
            <div className="hidden md:block">⚡ 2 just got downloaded</div>
            <div className="hidden md:block">🎯 1 just landed an interview</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Story Modal */}
      {showStoryModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowStoryModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-dark border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Dreamers' Stories</h2>
              <button
                onClick={() => setShowStoryModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl">
                      {story.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{story.name}</h3>
                      <p className="text-primary mb-3">{story.role}</p>
                      <p className="text-gray-400 mb-4">"{story.quote}"</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <p className="text-sm text-gray-400">Before</p>
                          <p className="text-white font-bold">{story.beforeAfter.before}</p>
                          <p className="text-sm text-gray-400">{story.beforeAfter.salaryBefore}</p>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                          <p className="text-sm text-primary">After</p>
                          <p className="text-white font-bold">{story.beforeAfter.after}</p>
                          <p className="text-sm text-primary">{story.beforeAfter.salaryAfter}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
