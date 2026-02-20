'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CoverLetterForm from '../../components/coverletter/CoverLetterForm'
import CoverLetterResult from '../../components/coverletter/CoverLetterResult'

export default function CoverLetterPage() {
  const [resumeData, setResumeData] = useState(null)
  const [generatedLetter, setGeneratedLetter] = useState(null)
  const [savedLetters, setSavedLetters] = useState([])

  // Load resume data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      try {
        setResumeData(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load resume data', e)
      }
    }
  }, [])

  const handleGenerate = (letter) => {
    setGeneratedLetter(letter)
  }

  const handleSave = (letter) => {
    const newSaved = [...savedLetters, {
      id: Date.now(),
      content: letter,
      date: new Date().toLocaleDateString()
    }]
    setSavedLetters(newSaved)
    localStorage.setItem('savedCoverLetters', JSON.stringify(newSaved))
  }

  const handleRegenerate = () => {
    setGeneratedLetter(null)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cover Letter Generator
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Let our AI write personalized cover letters based on your resume and job details.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Warning if no resume exists */}
          {!resumeData && (
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl text-center">
              <p className="text-yellow-800 dark:text-yellow-200">
                ⚠️ No resume data found. Please{' '}
                <a href="/resume" className="underline font-medium">
                  create a resume first
                </a>{' '}
                for better personalization.
              </p>
            </div>
          )}

          {/* Form */}
          <CoverLetterForm 
            userData={resumeData} 
            onGenerate={handleGenerate}
          />

          {/* Result */}
          {generatedLetter && (
            <CoverLetterResult 
              letter={generatedLetter}
              onSave={handleSave}
              onRegenerate={handleRegenerate}
            />
          )}

          {/* Saved letters (if any) */}
          {savedLetters.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Saved Cover Letters</h3>
              <div className="space-y-3">
                {savedLetters.map((letter) => (
                  <div 
                    key={letter.id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setGeneratedLetter(letter.content)}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Saved on {letter.date}
                    </p>
                    <p className="text-sm text-dark dark:text-light line-clamp-2 mt-1">
                      {letter.content.substring(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
