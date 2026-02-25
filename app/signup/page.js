import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// Dynamically import the SignupForm with SSR disabled
const SignupForm = dynamic(
  () => import('./SignupForm'),
  { ssr: false }
)

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands of dreamers building their futures
            </p>
          </div>
          
          <Suspense fallback={
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          }>
            <SignupForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  )
}
