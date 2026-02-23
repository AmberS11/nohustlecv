'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, Heart, Users, Rocket } from 'lucide-react'

export default function CareersPage() {
  const openings = [
    {
      title: 'Frontend Developer',
      type: 'Full-time',
      location: 'Remote (India)',
      department: 'Engineering',
      description: 'Help build the most premium resume builder in India. Work with Next.js, Tailwind, and Framer Motion.',
      requirements: ['3+ years React experience', 'Next.js expertise', 'Eye for design'],
    },
    {
      title: 'AI/ML Engineer',
      type: 'Full-time',
      location: 'Remote (India)',
      department: 'AI',
      description: 'Shape the future of AI-powered career tools. Work with OpenAI, vector databases, and prompt engineering.',
      requirements: ['Python expertise', 'Experience with LLMs', 'API design'],
    },
    {
      title: 'Growth Marketing',
      type: 'Full-time',
      location: 'Remote (India)',
      department: 'Marketing',
      description: 'Tell the NoHustleCV story to students and professionals across India.',
      requirements: ['B2C SaaS experience', 'Content creation', 'College outreach'],
    },
    {
      title: 'Customer Success',
      type: 'Full-time',
      location: 'Remote (India)',
      department: 'Support',
      description: 'Help dreamers succeed. Guide users through their resume-building journey.',
      requirements: ['Empathy', 'Communication skills', 'Tech-savvy'],
    },
  ]

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Human First',
      description: 'We build for people, not metrics. Every feature starts with a human need.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Dreamers Welcome',
      description: 'We hire for potential, not just pedigree. Your story matters.',
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Bias for Action',
      description: 'We move fast, learn faster, and iterate with purpose.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Premium Mindset',
      description: 'We sweat the details. Quality is non-negotiable.',
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Join the{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dream Factory
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're building the future of career development — and we're looking for dreamers like you.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join NoHustleCV?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            We're a remote-first team building the future of careers. If you don't see your dream role, reach out anyway.
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {openings.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.department}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`mailto:ambersinha11@gmail.com?subject=Application for ${job.title}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No role found */}
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
            <h3 className="text-xl font-bold mb-3">Don't see your dream role?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We're always looking for talented dreamers. Send us your story.
            </p>
            <Link
              href="mailto:ambersinha11@gmail.com"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              careers@nohustlecv.com →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">More Than a Job</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              At NoHustleCV, you're not just writing code or selling a product. You're helping someone land their dream job. You're giving a student their first break. You're building the bridge between who people are and who they want to become.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-500">Remote</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-sm text-gray-500">Day Work Week</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-gray-500">Learning Budget</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-gray-500">Identities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
