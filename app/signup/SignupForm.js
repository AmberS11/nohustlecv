'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Sparkles, Check, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function SignupForm() {
  const searchParams = useSearchParams()
  const { signup } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    identity: 'professional',
  })
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  const plans = {
    free: { name: 'Free', price: '₹0' },
    onetime: { name: 'One-Time', price: '₹49' },
    monthly: { name: 'Monthly', price: '₹249/month' },
    yearly: { name: 'Yearly', price: '₹799/year' },
  }

  const validateStep = () => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await signup(
      formData.email,
      formData.password,
      formData.name,
      formData.identity
    )
    
    if (result.success) {
      // Redirect based on plan
      if (selectedPlan === 'free') {
        window.location.href = '/templates'
      } else {
        window.location.href = '/pricing?checkout=' + selectedPlan
      }
    } else {
      setErrors({ form: result.error })
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Selected Plan Banner */}
      <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Selected plan:</span>
            <p className="font-semibold text-lg">{plans[selectedPlan]?.name}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
            <p className="font-semibold text-lg text-primary">{plans[selectedPlan]?.price}</p>
          </div>
        </div>
        <Link href="/pricing" className="text-sm text-primary hover:text-primary/80 mt-2 inline-block">
          Change plan →
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        <div className={`flex-1 text-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
            step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}>
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <span className="text-sm">Account</span>
        </div>
        <div className={`flex-1 text-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
            step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'
          }`}>
            2
          </div>
          <span className="text-sm">Profile</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

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
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {['student', 'professional', 'career_switcher', 'other'].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFormData({...formData, identity: id})}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      formData.identity === id
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <span className="block text-sm font-medium capitalize">
                      {id.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {errors.form && (
              <p className="text-red-500 text-sm text-center">{errors.form}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </>
        )}
      </form>

      <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>

      {selectedPlan !== 'free' && (
        <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Your {plans[selectedPlan]?.name} plan includes:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {selectedPlan === 'onetime' && (
              <>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>1 premium template of your choice</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>1 AI cover letter</span>
                </li>
              </>
            )}
            {(selectedPlan === 'monthly' || selectedPlan === 'yearly') && (
              <>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>All premium templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Unlimited AI cover letters</span>
                </li>
              </>
            )}
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>No watermark on exports</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
