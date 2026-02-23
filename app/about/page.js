'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { 
  Sparkles, 
  Users, 
  GraduationCap, 
  Heart, 
  ArrowRight, 
  Shield, 
  Target, 
  Globe,
  Quote
} from 'lucide-react'

export default function AboutPage() {
  const identities = [
    'Student', 'Professional', 'Career Switcher', 'Break Returnee',
    'Maternity Returnee', 'Paternity Returnee', 'Business → Job', 'Govt → Private'
  ]

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Help, Not Hustle',
      description: 'We\'re not here to profit from your necessity. We\'re here to help you run.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Every Stage Matters',
      description: '8 identities. One platform. Your resume grows with you.'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Students First',
      description: 'Because 90% of students never learn this in college.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Radical Transparency',
      description: 'We show you how ATS works. No black boxes. No mystery.'
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Magical background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Story Behind{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NoHustleCV
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a simple observation to a movement. This is why we exist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Why */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6">🎯 The Why</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Most resume builders charge <span className="font-bold text-primary">₹2,000–₹3,000 per year</span>. 
              OTT platforms charge <span className="font-bold text-secondary">less than ₹299/month</span> for endless entertainment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl font-medium border-l-4 border-primary pl-6 py-2 my-8">
              Premium career tools should not be a luxury.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I wanted to change that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">📛 The Name</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NoHustleCV
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
                <span className="font-semibold">No Hustle</span> because your job search shouldn't feel like a scam. 
                No hidden fees. No confusing tiers. Just fair pricing, premium quality, and the help you actually need.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Realization */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">🧠 The Realization</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Every person is at a different stage of their career. One template does NOT fit all.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {identities.map((identity, index) => (
                <motion.div
                  key={identity}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 bg-primary/5 rounded-lg border border-primary/10 text-center"
                >
                  <span className="text-sm font-medium">{identity}</span>
                </motion.div>
              ))}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-bold text-primary">8 identities.</span> One platform. 
              Your resume evolves as you do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Ground Reality */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">🇮🇳 The Ground Reality</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="text-6xl font-bold text-primary mb-2">7-10%</div>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                of Indian students get placed through campus.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The rest are left to figure it out alone.
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Students spend years building skills. But before anyone sees those skills — 
              <span className="font-bold text-primary"> their resume must survive the algorithm.</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <p className="text-sm">Most don't know what <span className="font-bold">ATS</span> means</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm">Resumes disappear into <span className="font-bold">black holes</span></p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <p className="text-sm">Cover letters are <span className="font-bold">mythical</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-bold text-dark dark:text-light mb-6 leading-relaxed">
              "Help will always be given at NoHustleCV to those who{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                dare to dream beyond their circumstances.
              </span>"
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Magic */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">✨ The Magic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team - WITH YOUR NAME */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">👥 The Team</h2>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  A
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-2 border-primary flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary fill-current" />
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold text-xl">Amber Sinha</span>
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400 mb-4">
              Founder, NoHustleCV
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-xl mx-auto italic">
              "I built this for the student I used to be, and the professional I wanted to become."
            </p>
            <p className="text-xl font-medium text-dark dark:text-light">
              But every student who uses NoHustleCV?{' '}
              <span className="text-primary">That's my team.</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              And I want my team to succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Future */}
      <section className="py-20 bg-gradient-to-br from-dark to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">🔮 The Future</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              This is just the beginning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Premium Learning</h3>
                <p className="text-sm text-gray-400">Affordable courses. Real skills.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Interview Prep</h3>
                <p className="text-sm text-gray-400">Practice. Prepare. Perform.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">College Partnerships</h3>
                <p className="text-sm text-gray-400">Every student. Every college.</p>
              </div>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The math behind resume shortlisting will no longer be hidden.
            </p>
            <p className="text-primary text-xl font-bold mt-4">
              NoHustleCV exists to make the invisible, visible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build yours?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of dreamers who've started their journey.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-lg font-semibold"
          >
            Start Building Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
