'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import TemplateGallery from '../../components/templates/TemplateGallery'
import Footer from '../../components/Footer'
import { useIdentity } from '../context/IdentityContext'

export default function TemplatesPage() {
  const { identity, setIdentity } = useIdentity()
  const [selectedTemplate, setSelectedTemplate] = useState('modern-professional')

  // Listen for identity changes from Header
  useEffect(() => {
    const handleIdentityChange = (event) => {
      setIdentity(event.detail)
    }
    
    window.addEventListener('identityChanged', handleIdentityChange)
    return () => window.removeEventListener('identityChanged', handleIdentityChange)
  }, [])

  // Update Header's identity when it changes (for consistency)
  useEffect(() => {
    const event = new CustomEvent('identityChanged', { detail: identity })
    window.dispatchEvent(event)
  }, [identity])

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    localStorage.setItem('selectedTemplate', templateId)
  }

  // Load saved template on mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate')
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate)
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Perfect Template
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Each template adapts to your career stage. Start with Modern Professional (free), 
            or upgrade to unlock premium designs.
          </p>
          
          {/* Identity selector */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Preview as:</span>
            <select
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="career_switcher">Career Switcher</option>
            </select>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <TemplateGallery 
        userIdentity={identity}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-dark to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to build your resume?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            You've selected{' '}
            <span className="text-primary font-semibold">
              {selectedTemplate === 'modern-professional' && 'Modern Professional'}
              {selectedTemplate === 'creative-edge' && 'Creative Edge'}
              {selectedTemplate === 'minimal-elegance' && 'Minimal Elegance'}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-lg font-semibold">
              Start Building →
            </button>
            <button className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition-colors text-lg font-semibold">
              Compare All Features
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Free users get 1 template. PRO users get all templates + AI features.
          </p>
        </div>
      </section>

      <Footer />

      {/* Premium background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </main>
  )
}
