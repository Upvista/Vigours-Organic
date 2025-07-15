import React from "react";
import Image from "next/image";

const AboutUsPage = () => (
  <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-white py-12 px-4">
    <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12 flex flex-col items-center">
      <Image src="/assets/logo2.png" alt="Vigours Organic Logo" width={90} height={90} className="mb-4" />
      <h1 className="text-4xl font-extrabold text-emerald-700 mb-2 text-center">About Vigours Organic</h1>
      <p className="text-lg text-emerald-900 mb-6 text-center max-w-2xl">Vigours Organic is dedicated to bringing you the purest, healthiest, and most authentic organic foods from the heart of nature. Our mission is to empower healthy living by making natural, high-quality products accessible to everyone.</p>
    </section>
    <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-emerald-50 rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Our Story</h2>
        <p className="text-emerald-900">Founded with a passion for wellness and sustainability, Vigours Organic started as a small family initiative in the valleys of Hunza. We believe in the power of nature and the importance of traditional wisdom. Our journey began by sourcing the finest organic foods from local farmers and artisans, ensuring every product is pure, ethical, and full of vitality.</p>
      </div>
      <div className="bg-emerald-50 rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Our Mission</h2>
        <p className="text-emerald-900">To inspire and nurture a healthier world by providing organic, natural, and wholesome foods. We are committed to quality, transparency, and supporting sustainable agriculture that respects both people and the planet.</p>
      </div>
    </section>
    <section className="max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-xl p-6 shadow flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-emerald-900 space-y-2">
            <li>Purity & Authenticity</li>
            <li>Health & Wellness</li>
            <li>Sustainability & Ethics</li>
            <li>Community Empowerment</li>
            <li>Transparency & Trust</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <Image src="/assets/quail.jpeg" alt="Vigours Organic Team" width={180} height={180} className="rounded-full object-cover shadow-lg" />
          <span className="mt-4 text-emerald-700 font-semibold">Our Founders & Team</span>
        </div>
      </div>
    </section>
    <section className="max-w-4xl mx-auto mb-12">
      <div className="bg-emerald-50 rounded-xl p-6 shadow text-center">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Join Our Journey</h2>
        <p className="text-emerald-900 mb-2">We invite you to be part of the Vigours Organic family. Whether you’re a customer, partner, or advocate for healthy living, together we can make a difference—one organic product at a time.</p>
        <p className="text-emerald-700">Contact us: <a href="mailto:vigoursorganic@gmail.com" className="underline hover:text-emerald-500">vigoursorganic@gmail.com</a></p>
      </div>
    </section>
  </main>
);

export default AboutUsPage; 