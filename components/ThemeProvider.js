'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// FIXED: Context with default values
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
})

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Initialize theme safely (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nohustlecv-theme')
      if (savedTheme) {
        setTheme(savedTheme)
      }
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('nohustlecv-theme', theme)
      }
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
