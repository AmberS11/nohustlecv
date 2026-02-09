'use client'

import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Menu, X, Sun, Moon } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // SAFE THEME DESTRUCTURING (FIX FOR BUILD ERROR)
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'
  const toggleTheme = themeContext?.toggleTheme || (() => {})

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Resume Builder', href: '#' },
    { name: 'Cover Letter', href: '#' },
    { name: 'ATS Checker', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'For Organizations', href: '#' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-dark/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
            <span className="text-2xl font-bold text-dark dark:text-light font-serif">
              NoHustle<span className="text-primary">CV</span>
            </span>
          </div>

          {/* Desktop Navigation - HIDDEN ON MOBILE */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
              title="Toggle dark/light mode"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Desktop Auth buttons - HIDDEN ON MOBILE */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="#"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Log in
              </a>
              <a
                href="#"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Get Started
              </a>
            </div>

            {/* Mobile menu button - VISIBLE ONLY ON MOBILE */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            
          </div>
        </div>

        {/* Mobile Navigation - ONLY SHOWS WHEN mobileMenuOpen IS TRUE */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 bg-primary text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
        
      </nav>
    </header>
  )
}
