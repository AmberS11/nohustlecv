import { Mail, Twitter, Linkedin, Heart, Briefcase, GraduationCap, Shield, FileText } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'For Organizations', href: '/campus' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
  ]

  const productLinks = [
    { name: 'Resume Builder', href: '/resume' },
    { name: 'Cover Letter AI', href: '/cover-letter' },
    { name: 'ATS Checker', href: '/ats-checker' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Templates', href: '/templates' },
  ]

  return (
    <footer className="bg-dark text-light pt-16 pb-8">
      <div className="container mx-auto px-6">
        
        {/* Main footer content - 4 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
              <span className="text-2xl font-bold font-serif">
                NoHustle<span className="text-primary">CV</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium resumes, fairly priced. Your career's secret weapon — built for every stage of your journey.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="mailto:ambersinha11@gmail.com" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              Product
            </h4>
            <ul className="space-y-2 text-gray-400">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              Company
            </h4>
            <ul className="space-y-2 text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-bold mb-4 text-lg flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Legal
            </h4>
            <ul className="space-y-2 text-gray-400">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Campus Partnerships Highlight */}
        <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">🏫 Exclusive Plans for College Partners</h3>
                <p className="text-gray-400 text-sm">
                  Coming soon — special pricing for institutions, bulk registrations, and custom templates.
                </p>
              </div>
            </div>
            <Link 
              href="/campus" 
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
            >
              Learn more →
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
            © {currentYear} NoHustleCV. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-primary transition-colors">Refunds</Link>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <span className="mr-2">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="ml-2">in India</span>
          </div>
        </div>

        {/* Contact email visible in footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Contact: <a href="mailto:ambersinha11@gmail.com" className="hover:text-primary transition-colors">ambersinha11@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}
