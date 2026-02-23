'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useIdentity } from '../context/IdentityContext'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { identity, setIdentity } = useIdentity()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about'},
    { name: 'Templates', href: '/templates' },
    { name: 'Resume', href: '/resume' },
    { name: 'Cover Letter', href: '/cover-letter' },
    { name: 'ATS Checker', href: '/ats-checker' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Campus', href: '/campus' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-dark/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo - Clickable to Home */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
            <span className="text-xl sm:text-2xl font-bold text-dark dark:text-light font-serif whitespace-nowrap">
              NoHustle<span className="text-primary">CV</span>
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-2 xl:px-3 py-2 text-sm xl:text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Identity + Theme + Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Identity Dropdown - Desktop */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <span className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">I am</span>
              <select
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-1 xl:px-2 py-1.5 text-xs xl:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary w-20 xl:w-24"
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="career_switcher">Career Switcher</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              )}
            </button>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors whitespace-nowrap"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex flex-col space-y-3">
              
              {/* Mobile Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Identity Dropdown */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-800 mt-2 pt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">I am a</span>
                <select
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                >
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                  <option value="career_switcher">Career Switcher</option>
                </select>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 mb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 bg-primary text-white rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
