import './globals.css'
import ThemeProvider from '../components/ThemeProvider'
import { IdentityProvider } from '../context/IdentityContext'

export const metadata = {
  title: 'NoHustleCV — Professional Resumes, Fairly Priced',
  description: 'Premium resume builder with AI-powered features.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-light dark:bg-dark text-dark dark:text-light">
        <IdentityProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </ThemeProvider>
        </IdentityProvider>
      </body>
    </html>
  )
}
