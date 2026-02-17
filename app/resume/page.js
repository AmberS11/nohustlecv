'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import ResumeEditor from '../../components/resume/ResumeEditor'
import Footer from '../../components/Footer'
import { templates } from '../../components/templates/TemplateData'

export default function ResumePage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Load selected template on mount
  useEffect(() => {
    const savedTemplateId = localStorage.getItem('selectedTemplate')
    const userPlan = localStorage.getItem('userPlan') || 'free' // 'free' or 'pro'
    
    if (!savedTemplateId) {
      // No template selected, redirect to templates page
      router.push('/templates')
      return
    }

    const template = templates.find(t => t.id === savedTemplateId)
    
    // Check if user can access this template
    if (template.isPremium && userPlan === 'free') {
      setShowUpgradeModal(true)
      return
    }

    setSelectedTemplate(template)
    setIsLoading(false)
  }, [router])

  const handleUpgrade = () => {
    // Redirect to pricing page (to be built in Phase 5)
    router.push('/pricing')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your resume builder...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md p-8 relative">
            <button 
              onClick={() => router.push('/templates')}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🔒</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-dark dark:text-light">
                Premium Template Locked
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You've selected a premium template. Upgrade to PRO to unlock it and get access to all premium features.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={handleUpgrade}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Upgrade to PRO — ₹799/year
                </button>
                <button 
                  onClick={() => router.push('/templates')}
                  className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Choose a different template
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                ₹799/year = ₹67/month. Save 78% vs monthly plan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resume Editor */}
      {selectedTemplate && !showUpgradeModal && (
        <ResumeEditor templateId={selectedTemplate.id} />
      )}

      <Footer />

      {/* Premium background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </main>
  )
}
