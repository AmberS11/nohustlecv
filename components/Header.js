'use client'

import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useIdentity } from '../context/IdentityContext'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { identity, setIdentity } = useIdentity()

  const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Templates', href: '/templates' },  // ← ADD THIS LINE
  { name: 'Resume Builder', href: '#' },
  { name: 'Cover Letter', href: '#' },
  { name: 'ATS Checker', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Campus Partnerships', href: '#' },
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

          {/* Desktop Navigation + Auth */}
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
            
            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
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
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            
            {/* IDENTITY DROPDOWN - STEP 1 */}
            <div className="hidden md:flex items-center gap-2 mr-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">I am a</span>
              <select 
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="career_switcher">Career Switcher</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
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
              
              {/* Mobile Identity Dropdown */}
              <div className="flex items-center gap-2 px-4 py-2 border-t border-gray-200 dark:border-gray-800 mt-2 pt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">I am a</span>
                <select 
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                >
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                  <option value="career_switcher">Career Switcher</option>
                </select>
              </div>

              {/* Mobile Auth Buttons */}
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
