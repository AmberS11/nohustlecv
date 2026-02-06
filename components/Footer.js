import { Mail, Twitter, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light py-12">
      <div className="container mx-auto px-6">
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
              <span className="text-2xl font-bold font-serif">
                NoHustle<span className="text-primary">CV</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium resumes, fairly priced. Your career's secret weapon.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cover Letter AI</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">ATS Checker</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Organizations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Stay Connected</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">contact@nohustlecv.com</span>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
            © {currentYear} NoHustleCV. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-primary transition-colors">GDPR</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <span className="mr-2">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="ml-2">in India</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
