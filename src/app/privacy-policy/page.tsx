import React from "react";

const PrivacyPolicyPage = () => (
  <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-white py-12 px-4">
    <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h1 className="text-4xl font-extrabold text-emerald-700 mb-4">Privacy Policy</h1>
      <p className="text-lg text-emerald-900 mb-6">Your privacy is important to us. This policy explains how Vigours Organic collects, uses, and protects your information.</p>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>Personal information you provide (name, email, address, etc.)</li>
        <li>Order and payment details</li>
        <li>Usage data and cookies</li>
      </ul>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>To process orders and provide services</li>
        <li>To improve our website and offerings</li>
        <li>To communicate with you about your account or promotions</li>
      </ul>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">Your Rights</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>Access, update, or delete your personal data</li>
        <li>Opt out of marketing communications</li>
        <li>Request information about our data practices</li>
      </ul>
      <p className="text-emerald-700 mt-8">For questions, contact us at <a href="mailto:vigoursorganic@gmail.com" className="underline hover:text-emerald-500">vigoursorganic@gmail.com</a>.</p>
    </section>
  </main>
);

export default PrivacyPolicyPage; 