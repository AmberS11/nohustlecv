'use client'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />  {/* Hero now contains the 3D preview */}
      <Features />
      <Footer />

      {/* Premium background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed" />
      </div>
    </main>
  )
}
