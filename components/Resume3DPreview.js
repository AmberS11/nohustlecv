'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

export default function Resume3DPreview() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateXValue = useTransform(y, [-100, 100], [10, -10])
  const rotateYValue = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto perspective-1000">
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 3D Card */}
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
        style={{
          rotateX: rotateXValue,
          rotateY: rotateYValue,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            rotateX: rotateXValue,
            rotateY: rotateYValue,
            translateZ: "20px",
          }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg"
                animate={{
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div>
                <motion.div
                  className="font-bold text-lg text-dark dark:text-light"
                  style={{ translateZ: "30px" }}
                >
                  Johnathan Rhodes
                </motion.div>
                <div className="text-gray-500 text-sm">Senior Product Manager</div>
              </div>
            </div>
            <motion.div
              className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0)",
                  "0 0 20px 0 rgba(16, 185, 129, 0.3)",
                  "0 0 0 0 rgba(16, 185, 129, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ATS Score: 92/100
            </motion.div>
          </div>

          {/* Resume Sections with Parallax */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="space-y-4"
                style={{
                  translateZ: `${20 + i * 5}px`,
                  rotateX: rotateXValue,
                  rotateY: rotateYValue,
                }}
              >
                <motion.div
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
                  animate={{
                    width: ["75%", "80%", "75%"],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              </motion.div>
            ))}
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-2 -right-2 w-20 h-20 bg-primary/10 rounded-full blur-xl"
            animate={{
              y: [0, -10, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-20 h-20 bg-secondary/10 rounded-full blur-xl"
            animate={{
              y: [0, 10, 0],
              x: [0, -10, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Edge highlight */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-2xl"
          style={{
            borderImage: "linear-gradient(45deg, var(--primary), var(--secondary)) 1",
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
