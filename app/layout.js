import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '../components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NoHustleCV — Professional Resumes, Fairly Priced',
  description: 'Premium resume builder with AI-powered features. Professional quality at ¼ competitor prices.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
