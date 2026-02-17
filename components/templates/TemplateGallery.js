'use client'

import { useState, useEffect } from 'react'
import { templates } from './TemplateData'
import TemplateCard from './TemplateCard'

export default function TemplateGallery({ 
  userIdentity = 'professional',
  onSelectTemplate 
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Load saved template from localStorage on mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate')
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate)
    }
  }, [])

  // Separate templates by access
  const freeTemplates = templates.filter(t => !t.isPremium)
  const premiumTemplates = templates.filter(t => t.isPremium)

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId)
    
    // If premium template is selected by free user, show upgrade prompt
    if (template?.isPremium) {
      setShowUpgradeModal(true)
      return
    }
    
    setSelectedTemplate(templateId)
    localStorage.setItem('selectedTemplate', templateId)
    if (onSelectTemplate) {
      onSelectTemplate(templateId)
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Choose Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Premium Template
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Each template adapts to your career stage. Start with Modern Professional (free), 
            or upgrade to unlock all designs.
          </p>
        </div>

        {/* Free Template Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-dark dark:text-light">
              Free Template
            </span>
            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
              Included in Free plan
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onSelect={handleTemplateSelect}
                userIdentity={userIdentity}
              />
            ))}
          </div>
        </div>

        {/* Premium Templates Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-dark dark:text-light">
              Premium Templates
            </span>
            <span className="text-xs px-2 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-full">
              PRO only
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={false} // Never selected for free users
                onSelect={handleTemplateSelect}
                userIdentity={userIdentity}
              />
            ))}
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md p-8 relative">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-dark dark:text-light">
                  Unlock Premium Templates
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get access to all 3 premium templates, unlimited AI cover letters, 
                  and priority support for just ₹799/year.
                </p>
                
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                    Upgrade to PRO — ₹799/year
                  </button>
                  <button 
                    onClick={() => setShowUpgradeModal(false)}
                    className="w-full border border-gray-300 dark:border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  ₹799/year = ₹67/month. Save 78% vs monthly plan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current selection indicator */}
        {selectedTemplate && (
          <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-center text-dark dark:text-light">
              <span className="font-medium">Currently selected:</span>{' '}
              <span className="text-primary">
                {templates.find(t => t.id === selectedTemplate)?.name || 'Modern Professional'}
              </span>
            </p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
              This template will be used to build your resume.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
