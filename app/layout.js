import './globals.css'
import ThemeProvider from '../components/ThemeProvider'
import { IdentityProvider } from '../context/IdentityContext'
import { AuthProvider } from '../context/AuthContext'

export const metadata = {
  title: 'NoHustleCV — Professional Resumes, Fairly Priced',
  description: 'Premium resume builder with AI-powered features. Professional quality at ¼ competitor prices.',
  keywords: 'resume builder, AI cover letter, ATS checker, career tools, India',
  authors: [{ name: 'Amber Sinha' }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300">
        <AuthProvider>
          <IdentityProvider>
            <ThemeProvider>
              <div className="min-h-screen flex flex-col">
                {children}
              </div>
            </ThemeProvider>
          </IdentityProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
