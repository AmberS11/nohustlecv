'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { FileText, Download, User, Settings, Sparkles, ArrowRight, Clock, Trash2 } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, userData, loading } = useAuth()
  const [resumes, setResumes] = useState([])
  const [coverLetters, setCoverLetters] = useState([])
  const [isLoadingResumes, setIsLoadingResumes] = useState(true)
  const [stats, setStats] = useState({
    resumes: 0,
    coverLetters: 0,
    downloads: 0
  })

  // Fetch user's resumes
  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/resume/list', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        const result = await response.json()
        
        if (result.success) {
          setResumes(result.resumes)
          setStats(prev => ({
            ...prev,
            resumes: result.resumes.length
          }))
        }
      } catch (error) {
        console.error('Failed to fetch resumes:', error)
      } finally {
        setIsLoadingResumes(false)
      }
    }

    // Load saved cover letters from localStorage
    const loadCoverLetters = () => {
      const saved = localStorage.getItem('savedCoverLetters')
      if (saved) {
        try {
          const letters = JSON.parse(saved)
          setCoverLetters(letters)
          setStats(prev => ({
            ...prev,
            coverLetters: letters.length
          }))
        } catch (e) {
          console.error('Failed to parse cover letters', e)
        }
      }
    }

    if (user) {
      fetchResumes()
      loadCoverLetters()
    }
  }, [user])

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleDeleteResume = async (resumeId, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this resume?')) return

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setResumes(resumes.filter(r => r.id !== resumeId))
        setStats(prev => ({
          ...prev,
          resumes: prev.resumes - 1
        }))
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const handleDeleteCoverLetter = (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this cover letter?')) return

    const updated = coverLetters.filter(l => l.id !== id)
    setCoverLetters(updated)
    localStorage.setItem('savedCoverLetters', JSON.stringify(updated))
    setStats(prev => ({
      ...prev,
      coverLetters: updated.length
    }))
  }

  if (loading || (user && isLoadingResumes)) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Welcome Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {userData?.name || 'Dreamer'}
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {userData?.identity === 'student' && 'Ready to land your first job?'}
                {userData?.identity === 'professional' && 'Time to take the next step in your career.'}
                {userData?.identity === 'career_switcher' && 'Your new journey starts here.'}
                {!userData?.identity && 'Continue building your future.'}
              </p>
            </div>
            
            {/* Plan Badge */}
            <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20 self-start">
              <span className="text-sm font-medium text-primary">
                {userData?.plan === 'free' && 'Free Plan'}
                {userData?.plan === 'onetime' && 'One-Time Plan'}
                {userData?.plan === 'monthly' && 'Monthly Pro'}
                {userData?.plan === 'yearly' && 'Yearly Pro'}
                {!userData?.plan && 'Free Plan'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-light">{stats.resumes}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Resumes Created</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-light">{stats.coverLetters}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cover Letters</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark dark:text-light">{stats.downloads}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Downloads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Resumes */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Resumes</h2>
            <Link
              href="/templates"
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Create New
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumes.map((resume) => (
                <div key={resume.id} className="relative group">
                  <Link
                    href={`/resume?id=${resume.id}`}
                    className="block bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {resume.data?.personal?.name || 'Untitled Resume'}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {resume.templateId === 'modern-professional' && 'Modern'}
                        {resume.templateId === 'creative-edge' && 'Creative'}
                        {resume.templateId === 'minimal-elegance' && 'Minimal'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => handleDeleteResume(resume.id, e)}
                    className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:border-red-500 hover:text-red-500"
                    title="Delete resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start building your first resume to see it here.
              </p>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Your First Resume
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Saved Cover Letters */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Saved Cover Letters</h2>

          {coverLetters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverLetters.map((letter) => (
                <div key={letter.id} className="relative group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {letter.content.substring(0, 100)}...
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Saved on {new Date(letter.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteCoverLetter(letter.id, e)}
                    className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:border-red-500 hover:text-red-500"
                    title="Delete cover letter"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No cover letters yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Generate your first AI-powered cover letter.
              </p>
              <Link
                href="/cover-letter"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Cover Letter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/templates"
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all text-center"
            >
              <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="font-medium">New Resume</span>
            </Link>
            <Link
              href="/cover-letter"
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all text-center"
            >
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="font-medium">Cover Letter</span>
            </Link>
            <Link
              href="/ats-checker"
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all text-center"
            >
              <Download className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="font-medium">ATS Check</span>
            </Link>
            <Link
              href="/profile"
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all text-center"
            >
              <User className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Super Admin Link (visible only to Amber) */}
      {user?.email === 'ambersinha11@gmail.com' && (
        <section className="py-12">
          <div className="container mx-auto px-6">
            <Link
              href="/admin"
              className="block p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 text-center hover:opacity-90 transition-opacity"
            >
              <p className="text-sm font-medium text-primary">🔐 Super Admin Dashboard</p>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
