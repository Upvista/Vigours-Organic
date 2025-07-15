"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// Remove: import { PRODUCTS } from '../shop/page';
// If PRODUCTS is needed, import from a shared data file or define locally.

const desiProducts = [
  {
    id: 1,
    name: "Desi Ghee",
    price: 1800,
    originalPrice: 2000,
    image: "/assets/quail.jpeg",
    category: "Desi foods",
    rating: 4.9,
    reviews: 150,
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Handmade Papad",
    price: 350,
    originalPrice: 400,
    image: "/assets/quail.jpeg",
    category: "Desi foods",
    rating: 4.8,
    reviews: 70,
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Pickles",
    price: 250,
    originalPrice: 300,
    image: "/assets/quail.jpeg",
    category: "Desi foods",
    rating: 4.7,
    reviews: 90,
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: "Chutneys",
    price: 200,
    originalPrice: 250,
    image: "/assets/quail.jpeg",
    category: "Desi foods",
    rating: 4.6,
    reviews: 55,
    isNew: true,
    isSale: true,
  },
];

export default function DesiFoodsPage() {
  return (
    <main className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 flex items-center justify-center mb-10">
        <Image src="/assets/b2.jpg" alt="Desi Foods" fill className="object-cover w-full h-full absolute z-0" />
        <div className="absolute inset-0 bg-yellow-900/60 z-10" />
        <div className="relative z-20 text-center">
          <nav className="mb-4 text-yellow-100 text-sm flex justify-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="font-semibold">Desi Foods</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">Desi Foods</h1>
          <p className="text-lg text-yellow-100 max-w-2xl mx-auto drop-shadow">Experience the richness of traditional Desi foods: pure desi ghee, quail meat, multigrain flour, pickles, jaggery, and more. Authentic flavors, pure ingredients, and wholesome nutrition.</p>
        </div>
      </section>
      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {desiProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-yellow-300 transition-all group relative">
              {product.isNew && <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">NEW</span>}
              {product.isSale && <span className="absolute top-4 right-4 bg-orange-400 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold shadow">SALE</span>}
              <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain rounded-xl mb-4" />
              <h3 className="font-bold text-lg text-yellow-900 mb-2 text-center">{product.name}</h3>
              <span className="text-yellow-600 font-bold text-xl mb-1">PKR {product.price}</span>
              <span className="text-gray-500 line-through text-sm">PKR {product.originalPrice}</span>
              <span className="text-yellow-500 font-semibold text-sm mt-2">{product.rating} ★ ({product.reviews})</span>
              <button className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded-full font-semibold shadow transition-all">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 