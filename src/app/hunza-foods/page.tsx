"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// Remove: import { PRODUCTS } from '../shop/page';
// If PRODUCTS is needed, import from a shared data file or define locally.

const hunzaProducts = [
  {
    id: 1,
    name: "Buckwheat",
    price: 450,
    originalPrice: 500,
    image: "/assets/quail.jpeg",
    category: "Hunza foods",
    rating: 4.8,
    reviews: 120,
    isNew: true,
    isSale: false,
  },
  {
    id: 2,
    name: "Hunza Tea",
    price: 350,
    originalPrice: 400,
    image: "/assets/quail.jpeg",
    category: "Hunza foods",
    rating: 4.7,
    reviews: 80,
    isNew: false,
    isSale: true,
  },
  {
    id: 3,
    name: "Hunza Valley Dry Fruits",
    price: 1200,
    originalPrice: 1400,
    image: "/assets/quail.jpeg",
    category: "Hunza foods",
    rating: 4.9,
    reviews: 60,
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: "Berries Mix",
    price: 900,
    originalPrice: 1000,
    image: "/assets/quail.jpeg",
    category: "Hunza foods",
    rating: 4.6,
    reviews: 45,
    isNew: true,
    isSale: true,
  },
];

export default function HunzaFoodsPage() {
  return (
    <main className="bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 flex items-center justify-center mb-10">
        <Image src="/assets/b1.jpg" alt="Hunza Valley" fill className="object-cover w-full h-full absolute z-0" />
        <div className="absolute inset-0 bg-emerald-900/60 z-10" />
        <div className="relative z-20 text-center">
          <nav className="mb-4 text-emerald-100 text-sm flex justify-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="font-semibold">Hunza Foods</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">Hunza Foods</h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto drop-shadow">Discover the purest organic treasures from the Hunza Valley: buckwheat, Hunza tea, dry fruits, berries, and more. Sourced directly from the mountains for your health and taste.</p>
        </div>
      </section>
      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {hunzaProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-emerald-300 transition-all group relative">
              {product.isNew && <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">NEW</span>}
              {product.isSale && <span className="absolute top-4 right-4 bg-yellow-400 text-emerald-900 text-xs px-3 py-1 rounded-full font-bold shadow">SALE</span>}
              <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain rounded-xl mb-4" />
              <h3 className="font-bold text-lg text-emerald-900 mb-2 text-center">{product.name}</h3>
              <span className="text-emerald-600 font-bold text-xl mb-1">PKR {product.price}</span>
              <span className="text-gray-500 line-through text-sm">PKR {product.originalPrice}</span>
              <span className="text-yellow-500 font-semibold text-sm mt-2">{product.rating} ★ ({product.reviews})</span>
              <button className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-700 text-white rounded-full font-semibold shadow transition-all">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 