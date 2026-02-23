'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    
    if (!formData.password) newErrors.password = 'Password is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      // Here you would integrate with Firebase Auth
      console.log('Login with:', formData)
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to dashboard or templates
        window.location.href = '/dashboard'
      }, 1500)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue your journey
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Create free account
              </Link>
            </p>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Demo credentials:
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-medium">Email:</span> demo@nohustlecv.com</p>
                <p><span className="font-medium">Password:</span> demo123</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                (These will work after Firebase Auth is implemented)
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
