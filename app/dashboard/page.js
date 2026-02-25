'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { FileText, Download, User, Settings, Sparkles, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, userData, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
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

  const stats = [
    { label: 'Resumes Created', value: '3', icon: FileText },
    { label: 'Cover Letters', value: '2', icon: Sparkles },
    { label: 'Downloads', value: '5', icon: Download },
  ]

  const recentResumes = [
    { id: 1, name: 'Software Engineer Resume', updated: '2 days ago', template: 'Modern Professional' },
    { id: 2, name: 'Product Manager Resume', updated: '1 week ago', template: 'Creative Edge' },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Welcome Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
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
            <div className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
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
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark dark:text-light">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Resumes */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Resumes</h2>
            <Link
              href="/templates"
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Create New
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentResumes.map((resume) => (
              <Link
                key={resume.id}
                href={`/resume?id=${resume.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {resume.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {resume.template}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Updated {resume.updated}
                </p>
              </Link>
            ))}
          </div>

          {recentResumes.length === 0 && (
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
