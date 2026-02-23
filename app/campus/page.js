'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { GraduationCap, Users, Sparkles, ArrowRight, Check, Building2, Award, TrendingUp, Mail } from 'lucide-react'

export default function CampusPage() {
  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Bulk Student Access',
      description: 'Every student gets premium access at a fraction of the cost.',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Custom College Templates',
      description: 'Resumes with your college logo, colors, and branding.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Placement Analytics',
      description: 'Track resume completion rates and placement readiness.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Higher Placement Rates',
      description: 'Better resumes = more interviews = better placements.',
    },
  ]

  const plans = [
    {
      name: 'Pilot Program',
      students: 'Up to 50',
      price: 'Custom quote',
      features: [
        'Full platform access',
        'Basic analytics',
        'Email support',
        '1 custom template',
      ],
    },
    {
      name: 'Campus Partner',
      students: '50-200',
      price: '₹499/student/year',
      popular: true,
      features: [
        'Full platform access',
        'Advanced analytics',
        'Priority support',
        '3 custom templates',
        'Placement dashboard',
        'Student workshops',
      ],
    },
    {
      name: 'University Network',
      students: '200+',
      price: 'Custom pricing',
      features: [
        'Full platform access',
        'Enterprise analytics',
        'Dedicated success manager',
        'Unlimited templates',
        'API access',
        'White-label option',
      ],
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Coming Soon</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Campus Partnerships
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Exclusive plans for colleges and institutions. Give every student a professional edge.
          </p>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl border border-primary/20 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">We're Cooking Something Special</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Our campus partnerships program is launching soon. Join the waitlist to be the first to know.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:ambersinha11@gmail.com?subject=Campus Partnership Interest"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Join Waitlist
              </Link>
              <Link
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-primary/50 transition-colors"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Why Partner With Us?</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Give your students the tools they need to stand out in a competitive job market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Flexible Plans</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Whether you're a small department or a large university, we have a plan for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 border ${
                  plan.popular
                    ? 'border-primary shadow-xl scale-105 z-10'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plan.students} students</p>
                  <div className="text-2xl font-bold text-primary">{plan.price}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="mailto:ambersinha11@gmail.com?subject=Campus Partnership Inquiry"
                  className="block text-center py-3 px-4 rounded-xl font-medium transition-all border border-primary/50 hover:bg-primary/5"
                >
                  Contact Sales
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="space-y-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    {step === 1 && 'Reach Out'}
                    {step === 2 && 'We Create a Custom Plan'}
                    {step === 3 && 'Students Get Instant Access'}
                    {step === 4 && 'Track Success Together'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step === 1 && 'Fill out the form or email us. We\'ll schedule a call to understand your needs.'}
                    {step === 2 && 'Based on your student count and requirements, we\'ll design a tailored partnership.'}
                    {step === 3 && 'Your students sign up with college email — auto-detected and ready to build.'}
                    {step === 4 && 'Monitor usage, placement readiness, and impact through your dashboard.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Empower Your Students?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the growing list of institutions preparing their students for dream careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:ambersinha11@gmail.com?subject=Campus Partnership Interest"
              className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-lg font-semibold inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Join Waitlist
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition-colors text-lg font-semibold"
            >
              View Individual Plans
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Limited spots available for pilot partners. Be the first.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
