import React from "react";

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
        <div className="flex flex-wrap justify-between gap-8">
          <div>
            <h4 className="font-bold mb-2 text-emerald-700">FRUIT & VEGETABLES</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>Fresh Vegetables</li>
              <li>Herbs & Seasonings</li>
              <li>Fresh Fruits</li>
              <li>Cuts & Sprouts</li>
              <li>Exotic Fruits & Veggies</li>
              <li>Packaged Produce</li>
              <li>Party Trays</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-emerald-700">BREAKFAST & DAIRY</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>Milk & Flavoured Milk</li>
              <li>Butter and Margarine</li>
              <li>Cheese</li>
              <li>Eggs Substitutes</li>
              <li>Honey</li>
              <li>Marmalades</li>
              <li>Sour Cream and Dips</li>
              <li>Yogurt</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-emerald-700">MEAT & SEAFOOD</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>Breakfast Sausage</li>
              <li>Dinner Sausage</li>
              <li>Beef</li>
              <li>Chicken</li>
              <li>Sliced Deli Meat</li>
              <li>Shrimp</li>
              <li>Wild Caught Fillets</li>
              <li>Crab and Shellfish</li>
              <li>Farm Raised Fillets</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-emerald-700">BEVERAGES</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>Water</li>
              <li>Sparkling Water</li>
              <li>Soda & Pop</li>
              <li>Coffee</li>
              <li>Milk & Plant-Based Milk</li>
              <li>Tea & Kombucha</li>
              <li>Drink Boxes & Pouches</li>
              <li>Craft Beer</li>
              <li>Wine</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-emerald-700">BREADS & BAKERY</h4>
            <ul className="text-sm text-emerald-800 space-y-1">
              <li>Milk & Flavoured Milk</li>
              <li>Butter and Margarine</li>
              <li>Cheese</li>
              <li>Eggs Substitutes</li>
              <li>Honey</li>
              <li>Marmalades</li>
              <li>Sour Cream and Dips</li>
              <li>Yogurt</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t pt-6 text-sm text-emerald-700">
          <div className="mb-2 md:mb-0 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24"><path d="M12 2C7 7 2 12 12 22C22 12 17 7 12 2Z" fill="#2dc870" stroke="#1d9c54" strokeWidth="2"/></svg>
            <span className="font-bold">8 800 555-55</span> Working 8:00 - 22:00
          </div>
          <div className="flex gap-4 mb-2 md:mb-0 items-center">
            <span>Download App on Mobile :</span>
            <span className="bg-emerald-100 px-2 py-1 rounded text-emerald-700 font-semibold">Google Play</span>
            <span className="bg-emerald-100 px-2 py-1 rounded text-emerald-700 font-semibold">App Store</span>
          </div>
          <div className="flex gap-2">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span className="hover:underline cursor-pointer">Cookie</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-emerald-400">
          <span>© 2025 Hamza Organic. All rights reserved. Inspired by Bacola.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 