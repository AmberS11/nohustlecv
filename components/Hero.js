'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Resume3DPreview from './Resume3DPreview'

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Premium badge with hover animation */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Premium quality at ¼ competitor prices
          </span>
        </motion.div>

        {/* Main headline with staggered letters */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <motion.span 
            className="block text-dark dark:text-light"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Professional Resumes,
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Fairly Priced
          </motion.span>
        </motion.h1>

        {/* Animated tagline */}
        <motion.div 
          variants={itemVariants}
          className="h-16 mb-8"
        >
          <motion.p 
            key={flippingText}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {taglines[flippingText]}
          </motion.p>
        </motion.div>

        {/* Feature pills */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all text-lg font-semibold"
            >
              Start Building Free
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/ats-checker"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-primary dark:hover:border-primary transition-all text-lg font-semibold"
            >
              Check ATS Score
            </Link>
          </motion.div>
        </motion.div>

        {/* Social proof with count-up animation */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 dark:text-gray-400 mb-20"
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="text-3xl font-bold text-dark dark:text-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              5,000+
            </motion.div>
            <div className="text-sm">Resumes Created</div>
          </motion.div>
          
          <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-700" />
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="text-3xl font-bold text-dark dark:text-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              94%
            </motion.div>
            <div className="text-sm">ATS Pass Rate</div>
          </motion.div>
          
          <div className="hidden md:block w-px h-12 bg-gray-300 dark:bg-gray-700" />
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="text-3xl font-bold text-dark dark:text-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              ₹799
            </motion.div>
            <div className="text-sm">Yearly Plan (Save 78%)</div>
          </motion.div>
        </motion.div>

        {/* 3D Resume Preview - Now inside Hero */}
        <Resume3DPreview />

      </motion.div>
    </section>
  )
}
