'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// FIX 1: Add default values to context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
})

export function useTheme() {
  const context = useContext(ThemeContext)
  // FIX 2: Return the context directly (no error during build)
  return context
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // FIX 3: Check if we're on client before using browser APIs
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nohustlecv-theme')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme) {
        setTheme(savedTheme)
      } else if (systemPrefersDark) {
        setTheme('dark')
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // FIX 4: Safely access document
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('nohustlecv-theme', theme)
      }
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Don't render until mounted (client-side)
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
