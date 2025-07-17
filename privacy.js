// pages/privacy.js

import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | NoHustleCV</title>
        <meta
          name="description"
          content="Our Privacy Policy outlines how we collect, use, and protect your personal data at NoHustleCV."
        />
      </Head>

      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>NoHustleCV</strong>, your privacy is important to us. This Privacy Policy
          outlines how we collect, use, protect, and handle your personal data.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Name, email address, and other contact information</li>
          <li>Resume content and user-generated documents</li>
          <li>Usage data like browser type, pages visited, etc.</li>
          <li>Payment details (handled securely via Razorpay)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide resume building services</li>
          <li>To personalize your experience and save templates</li>
          <li>To improve our platform based on usage analytics</li>
          <li>To respond to customer service requests</li>
          <li>To process payments (we do not store card data)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Storage & Security</h2>
        <p className="mb-4">
          We host data securely using <strong>{`Vercel & Firestore`}</strong> or <strong>AWS</strong> depending on deployment,
          with encryption and access control. We use industry-standard SSL/TLS to protect data
          transmission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
        <p className="mb-4">
          We use third-party tools like Google Analytics and Razorpay. These services may collect
          data as per their own privacy policies. We do not sell or share your data for marketing.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Cookies</h2>
        <p className="mb-4">
          We use cookies to enhance your experience. You can control cookie settings in your browser.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Data Retention</h2>
        <p className="mb-4">
          We retain your data only for as long as necessary to provide services or comply with legal
          obligations.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Your Rights</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Access, edit, or delete your personal information</li>
          <li>Request data export or correction</li>
          <li>Withdraw consent or delete account</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Children’s Privacy</h2>
        <p className="mb-4">
          Our service is not intended for users under the age of 13. We do not knowingly collect data
          from minors.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Updates to This Policy</h2>
        <p className="mb-4">
          We may update this policy occasionally. All changes will be posted here with the effective
          date.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Contact Us</h2>
        <p className="mb-4">
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:ambersinha11@gmail.com" className="text-blue-600 dark:text-blue-400 underline">
            ambersinha11@gmail.com
          </a>.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: July 2025
        </p>
      </div>
    </>
  );
}
