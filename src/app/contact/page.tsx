"use client";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-emerald-600 via-emerald-400 to-emerald-200 py-16 px-4 text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4">Contact Us</h1>
        <p className="text-lg md:text-2xl text-emerald-50 mb-6 max-w-2xl mx-auto">We&#39;d love to hear from you! Reach out for support, feedback, or partnership opportunities.</p>
        <div className="absolute right-0 top-0 w-64 h-64 opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="50" ry="50" fill="#2dc870" /></svg>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Form */}
        <form className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-emerald-700 mb-2">Send Us a Message</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-emerald-700">Name</label>
            <input id="name" type="text" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" placeholder="Your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-emerald-700">Email</label>
            <input id="email" type="email" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" placeholder="you@email.com" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-semibold text-emerald-700">Message</label>
            <textarea id="message" rows={5} className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900 resize-none" placeholder="How can we help you?" />
          </div>
          <button type="submit" className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-lg">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-emerald-700 mb-2">Contact Information</h3>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPinIcon className="w-6 h-6 text-emerald-500" />
              <span>123 Organic Street, DHA, Lahore, Pakistan</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <EnvelopeIcon className="w-6 h-6 text-emerald-500" />
              <span>support@hamzagrocery.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <PhoneIcon className="w-6 h-6 text-emerald-500" />
              <span>+92 300 1234567</span>
            </div>
          </div>
          {/* Map Placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-emerald-100 flex items-center justify-center h-64">
            <span className="text-emerald-700 font-bold text-lg">[Map Coming Soon]</span>
          </div>
        </div>
      </section>
    </main>
  );
} 