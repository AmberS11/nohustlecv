'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

export default function CoverLetterForm({ userData, onGenerate }) {
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    jobDescription: '',
    tone: 'professional'
  })
  const [loading, setLoading] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const [isPro] = useState(false) // Will be replaced with real plan check

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userData
        })
      })

      const data = await response.json()
      
      if (data.success) {
        onGenerate(data.letter)
        if (!isPro) {
          setUsageCount(prev => prev + 1)
        }
      } else {
        alert('Failed to generate cover letter. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isLimitReached = !isPro && usageCount >= 1

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark dark:text-light mb-2">
          AI Cover Letter Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Let our AI write a personalized cover letter based on your resume and job details.
        </p>
        {!isPro && (
          <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-dark dark:text-light">
              <span className="font-medium">Free plan:</span> 1 cover letter per month
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {usageCount}/1 used this month. Upgrade to PRO for unlimited.
            </p>
          </div>
        )}
      </div>

      {/* Limit reached message */}
      {isLimitReached ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Monthly limit reached</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Upgrade to PRO for unlimited cover letters and premium features.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Upgrade to PRO — ₹799/year
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Role & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g. Google, Microsoft, Startup"
              />
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description <span className="text-gray-400 text-xs">(Optional but recommended)</span>
            </label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
              rows="5"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
              placeholder="Paste the job description here for better personalization..."
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({...formData, tone: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="professional">Professional</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="confident">Confident</option>
              <option value="creative">Creative</option>
              <option value="concise">Concise</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Generate Cover Letter
              </>
            )}
          </button>

          {/* Usage info */}
          {!isPro && (
            <p className="text-xs text-center text-gray-500 mt-4">
              You have {1 - usageCount} free generation{1 - usageCount !== 1 ? 's' : ''} remaining this month.
            </p>
          )}
        </form>
      )}

      {/* Preview of user data being used */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Using data from your resume:
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {userData?.personal?.name || 'Your name'}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {userData?.skills?.length || 0} skills
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {userData?.experience?.length || 0} experiences
          </span>
        </div>
      </div>
    </div>
  )
}
