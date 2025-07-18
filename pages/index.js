// pages/index.js

import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white text-gray-800">
      <Head>
        <title>NoHustleCV | Land Your Dream Job</title>
        <meta name="description" content="NoHustleCV helps you walk through the door, not just get to it." />
      </Head>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold text-sky-800 mb-4">NoHustleCV</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Every resume builder helps you get in the door. <br /> We help you walk through it.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/login">
            <button className="bg-sky-600 text-white px-6 py-2 rounded-2xl shadow hover:bg-sky-700">Login</button>
          </Link>
          <Link href="/register">
            <button className="bg-white border border-sky-600 text-sky-700 px-6 py-2 rounded-2xl hover:bg-sky-50">Register</button>
          </Link>
        </div>
      </section>

      {/* Freemium Info */}
      <section className="bg-white py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold text-sky-800 mb-6">Explore Without Logging In</h2>
        <p className="max-w-xl mx-auto mb-8 text-gray-600">
          Preview a professional resume template, test our AI-powered cover letter generator, and discover job-winning tools.
        </p>
        <Link href="/guest-preview">
          <button className="bg-sky-500 text-white px-5 py-2 rounded-xl hover:bg-sky-600">Try Without Logging In</button>
        </Link>
      </section>

      {/* About Section */}
      <section className="bg-sky-50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-sky-800 mb-4">What is NoHustleCV?</h3>
          <p className="text-gray-700 mb-6">
            NoHustleCV is not just another resume tool. It’s your job hunt companion—offering AI-driven cover letters, smart suggestions, and templates tailored to your journey whether you're a fresher, professional, or switching careers.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h3 className="text-2xl font-semibold text-sky-800 mb-4">Contact Us</h3>
        <p className="text-gray-600">Questions, feedback, or just want to say hi? Reach out at <a href="mailto:support@nohustlecv.com" className="text-sky-600 underline">support@nohustlecv.com</a></p>
      </section>

      {/* Footer */}
      <footer className="bg-sky-100 text-center py-6 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} NoHustleCV. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/privacy" className="mr-4 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Use</Link>
        </div>
      </footer>
    </div>
  );
}

