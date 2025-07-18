import React from "react";
import Image from "next/image";
// Add icon imports
import { FaInstagram, FaFacebookF, FaXTwitter, FaWhatsapp, FaFacebookMessenger, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-emerald-50 via-emerald-100 to-white border-t mt-8 pt-2">
      {/* Top Newsletter/Promo Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-emerald-50 py-8 relative overflow-hidden rounded-b-3xl shadow-lg">
        {/* Organic SVG leaf background */}
        <svg className="absolute left-0 top-0 h-full w-32 opacity-10" viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="50" ry="50" fill="#2dc870" /></svg>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-8">
          <div className="mb-4 md:mb-0 max-w-md">
            <h3 className="text-2xl font-extrabold mb-2 text-emerald-50 drop-shadow">Get 20% Off Your First Organic Order</h3>
            <p className="text-sm mb-3 text-emerald-100">Join our newsletter for exclusive offers, recipes, and natural living tips.</p>
            <form className="flex rounded-xl overflow-hidden shadow-lg">
              <input className="px-4 py-3 flex-1 text-emerald-900 placeholder-emerald-400 outline-none" placeholder="Your email address" />
              <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-6 py-3 font-bold transition hover:from-emerald-500 hover:to-emerald-700">Subscribe</button>
            </form>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-4xl font-extrabold mb-1 text-emerald-200">20% OFF</span>
            <span className="text-sm text-emerald-100">ON YOUR FIRST ORDER</span>
            <span className="text-xs text-emerald-100">JOIN US</span>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-6 md:mb-0">
            <Image src="/assets/logo2.png" alt="Vigours Organic Logo" width={80} height={80} className="object-contain mb-2" />
            <span className="font-extrabold text-2xl text-emerald-800 tracking-tight" style={{ fontFamily: 'serif', letterSpacing: '0.02em' }}>
              Vigours <span className="text-emerald-500 font-black">Organic</span>
            </span>
          </div>
          <div className="flex flex-wrap justify-between gap-8 w-full">
            {/* Category columns here */}
          <div>
              <h4 className="font-bold mb-2 text-emerald-700">Hunza Foods</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
                <li>Organic Apricots</li>
                <li>Dried Mulberries</li>
                <li>Pure Honey</li>
                <li>Walnuts</li>
                <li>Almonds</li>
                <li>Chilgoza Pine Nuts</li>
                <li>Sun-Dried Figs</li>
            </ul>
          </div>
          <div>
              <h4 className="font-bold mb-2 text-emerald-700">Desi Foods</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
                <li>Desi Ghee</li>
                <li>Handmade Papad</li>
                <li>Pickles</li>
                <li>Chutneys</li>
                <li>Traditional Spices</li>
                <li>Desi Sweets</li>
                <li>Makki di Roti</li>
            </ul>
          </div>
          <div>
              <h4 className="font-bold mb-2 text-emerald-700">Tibbi Foods</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
                <li>Herbal Teas</li>
                <li>Black Seeds (Kalonji)</li>
                <li>Ajwain</li>
                <li>Isabgol</li>
                <li>Senna Leaves</li>
                <li>Qahwa</li>
                <li>Unani Oils</li>
            </ul>
          </div>
          <div>
              <h4 className="font-bold mb-2 text-emerald-700">General Grocery</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
                <li>Whole Wheat Flour</li>
                <li>Organic Rice</li>
                <li>Lentils & Pulses</li>
                <li>Cold-Pressed Oils</li>
                <li>Natural Sweeteners</li>
                <li>Spices & Herbs</li>
                <li>Healthy Snacks</li>
            </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t pt-6 text-sm text-emerald-700">
          <div className="mb-2 md:mb-0 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24"><path d="M12 2C7 7 2 12 12 22C22 12 17 7 12 2Z" fill="#2dc870" stroke="#1d9c54" strokeWidth="2"/></svg>
            <span className="font-bold">+92 (0) 3334 286566</span> Working 8:00 - 22:00
          </div>
          <div className="flex gap-4 mb-2 md:mb-0 items-center">
            <span>Download App on Mobile :</span>
            <span className="bg-emerald-100 px-2 py-1 rounded text-emerald-700 font-semibold">Google Play</span>
            <span className="bg-emerald-100 px-2 py-1 rounded text-emerald-700 font-semibold">App Store</span>
          </div>
          <div className="flex gap-2">
            <a href="/privacy-policy" className="hover:underline cursor-pointer transition-colors duration-200 hover:text-emerald-600">Privacy Policy</a>
            <a href="/terms" className="hover:underline cursor-pointer transition-colors duration-200 hover:text-emerald-600">Terms</a>
            <a href="/cookie" className="hover:underline cursor-pointer transition-colors duration-200 hover:text-emerald-600">Cookie</a>
          </div>
        </div>
        {/* Social Media Icons Row */}
        <div className="flex justify-center gap-6 mt-6 mb-2">
          <a href="#" aria-label="Instagram" className="text-emerald-500 hover:text-emerald-700 transition-colors text-2xl"><FaInstagram /></a>
          <a href="#" aria-label="Facebook" className="text-emerald-500 hover:text-emerald-700 transition-colors text-2xl"><FaFacebookF /></a>
          <a href="#" aria-label="X" className="text-emerald-500 hover:text-emerald-700 transition-colors text-2xl"><FaXTwitter /></a>
          <a href="#" aria-label="WhatsApp" className="text-emerald-500 hover:text-emerald-700 transition-colors text-2xl"><FaWhatsapp /></a>
          <a href="#" aria-label="Messenger" className="text-emerald-500 hover:text-emerald-700 transition-colors text-2xl"><FaFacebookMessenger /></a>
          <a href="#" aria-label="YouTube" className="text-emerald-500 hover:text-emerald-700 transition-colors text-2xl"><FaYoutube /></a>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-emerald-400">
          <span>© 2025 Vigours Organic. All rights reserved. Made by <a href="https://www.upvistadigital.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600 font-semibold">Upvista Digital</a>.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 