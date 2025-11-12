import React from "react";

const CookiePage = () => (
  <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-white py-12 px-4">
    <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h1 className="text-4xl font-extrabold text-emerald-700 mb-4">Cookie Policy</h1>
      <p className="text-lg text-emerald-900 mb-6">Vigours Organic uses cookies to enhance your experience. This policy explains what cookies are and how we use them.</p>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">What Are Cookies?</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>Cookies are small text files stored on your device.</li>
        <li>They help us remember your preferences and improve site functionality.</li>
      </ul>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">How We Use Cookies</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>To keep you logged in and remember your cart</li>
        <li>To analyze site traffic and usage</li>
        <li>To personalize your experience</li>
      </ul>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">Managing Cookies</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>You can disable cookies in your browser settings</li>
        <li>Some features may not work if cookies are disabled</li>
      </ul>
      <p className="text-emerald-700 mt-8">For questions, contact us at <a href="mailto:vigoursorganic@gmail.com" className="underline hover:text-emerald-500">vigoursorganic@gmail.com</a>.</p>
    </section>
  </main>
);

export default CookiePage; 