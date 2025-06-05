// about.js
import Navbar from "./components/Navbar";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - NoHustleCV</title>
        <meta name="description" content="Learn more about NoHustleCV – Our mission, vision, and team." />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <Navbar />

        <main className="max-w-4xl mx-auto py-16 px-6">
          <h1 className="text-4xl font-bold mb-6">About NoHustleCV</h1>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">🚀 Our Vision</h2>
            <p className="text-lg leading-relaxed">
              Every resume builder helps you get in the door. But NoHustleCV? We help you walk through it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">🧠 Why We Exist</h2>
            <p className="text-lg leading-relaxed">
              We noticed a gap. Candidates struggle not because they're underqualified, but because they undersell
              themselves. That's where we come in. With AI-driven precision, our platform crafts resumes and cover
              letters that highlight your potential and personality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">🔧 What We Offer</h2>
            <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
              <li>Instant resume and cover letter generation</li>
              <li>Industry-tailored templates</li>
              <li>ATS-optimized formats</li>
              <li>Customization by experience level (student, fresher, pro, switcher)</li>
              <li>Dark mode and clean interface</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">🙌 Built For You</h2>
            <p className="text-lg leading-relaxed">
              Whether you’re applying for your first job or your fiftieth, we’ve built NoHustleCV to support you with
              simplicity, confidence, and zero fluff. No jargon. No hustle. Just results.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
