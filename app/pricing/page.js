'use client'

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Check, Sparkles, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const [showFaq, setShowFaq] = useState(null)

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      description: 'Perfect for trying out',
      features: [
        '1 premium template (Modern Professional)',
        '1 AI cover letter (total)',
        'No watermark on exports',
        'Save 1 resume',
        'Basic support',
      ],
      cta: 'Start Free',
      href: '/signup?plan=free',
      popular: false,
      color: 'gray',
    },
    {
      name: 'One-Time',
      price: '₹49',
      description: 'Pay once, use forever',
      features: [
        'Choose 1 template from 3',
        '1 AI cover letter (total)',
        'No watermark',
        'Never expires',
        'Upgrade anytime',
      ],
      cta: 'Choose One-Time',
      href: '/signup?plan=onetime',
      popular: false,
      color: 'from-primary to-secondary',
      badge: 'Best for occasional use',
    },
    {
      name: 'Monthly',
      price: '₹249',
      period: '/month',
      description: 'For active job seekers',
      features: [
        'All templates',
        'Unlimited AI cover letters',
        'No watermark',
        'Save unlimited resumes',
        'AI resume review',
        'LinkedIn import',
        'Job match score',
        'Priority support',
      ],
      cta: 'Go Monthly',
      href: '/signup?plan=monthly',
      popular: false,
      color: 'gray',
    },
    {
      name: 'Yearly',
      price: '₹799',
      period: '/year',
      description: 'Best value — save 78%',
      features: [
        'All templates',
        'Unlimited AI cover letters',
        'No watermark',
        'Save unlimited resumes',
        'AI resume review',
        'LinkedIn import',
        'Job match score',
        'Priority support',
      ],
      cta: 'Go Yearly',
      href: '/signup?plan=yearly',
      popular: true,
      color: 'from-primary to-secondary',
      badge: 'Most Popular',
    },
  ]

  const faqs = [
    {
      q: 'Can I switch plans later?',
      a: 'Yes! You can upgrade or downgrade anytime. Changes take effect at the end of your current billing period.',
    },
    {
      q: 'What happens after I use my one AI cover letter?',
      a: 'Free and One-Time plans include 1 AI cover letter total. For unlimited letters, upgrade to Monthly or Yearly.',
    },
    {
      q: 'Is there a refund policy?',
      a: 'All sales are final. No refunds. Please try our Free plan first to ensure NoHustleCV meets your needs.',
    },
    {
      q: 'Can I change my template later?',
      a: 'Monthly/Yearly users can switch anytime. One-Time users get 1 template permanently — upgrade to change.',
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple,{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Fair Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Premium quality at ¼ the price of competitors. No hidden fees. No surprises.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border ${
                  plan.popular
                    ? 'border-primary shadow-xl scale-105 z-10'
                    : 'border-gray-200 dark:border-gray-700'
                } flex flex-col h-full`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className={`bg-gradient-to-r ${plan.color} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg`}>
                      <Sparkles className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">
                    {plan.price}
                    {plan.period && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 px-4 rounded-xl font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Note about upgrades */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            All plans can be upgraded or downgraded anytime. Changes apply at the end of current period.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setShowFaq(showFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium text-dark dark:text-light">{faq.q}</span>
                  <HelpCircle className={`w-5 h-5 text-gray-500 transition-transform ${
                    showFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {showFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact for colleges */}
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
            <h3 className="text-xl font-bold mb-3">🏫 Exclusive Plans for College Partners</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Coming soon — special pricing for institutions, bulk registrations, and custom templates.
            </p>
            <Link
              href="/campus"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
