import React from "react";

const TermsPage = () => (
  <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-white py-12 px-4">
    <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h1 className="text-4xl font-extrabold text-emerald-700 mb-4">Terms & Conditions</h1>
      <p className="text-lg text-emerald-900 mb-6">By using Vigours Organic, you agree to the following terms and conditions. Please read them carefully.</p>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">Use of Site</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>All content is for your general information and use only.</li>
        <li>Unauthorized use may give rise to a claim for damages.</li>
        <li>We reserve the right to update these terms at any time.</li>
      </ul>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">Orders & Payments</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>All orders are subject to availability and confirmation.</li>
        <li>Prices and availability are subject to change without notice.</li>
        <li>We reserve the right to refuse service to anyone.</li>
      </ul>
      <h2 className="text-2xl font-bold text-emerald-800 mt-8 mb-2">Limitation of Liability</h2>
      <ul className="list-disc pl-6 text-emerald-900 mb-4">
        <li>We are not liable for any indirect or consequential loss or damage.</li>
        <li>Our liability is limited to the value of your order.</li>
      </ul>
      <p className="text-emerald-700 mt-8">For questions, contact us at <a href="mailto:vigoursorganic@gmail.com" className="underline hover:text-emerald-500">vigoursorganic@gmail.com</a>.</p>
    </section>
  </main>
);

export default TermsPage; 