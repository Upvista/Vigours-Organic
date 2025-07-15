"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// Remove: import { PRODUCTS } from '../shop/page';
// If PRODUCTS is needed, import from a shared data file or define locally.

const generalProducts = [
  {
    id: 1,
    name: "Basmati Rice",
    price: 120,
    originalPrice: 150,
    image: "/assets/rice.jpg",
    category: "General grocery",
    rating: 4.5,
    reviews: 120,
    isNew: false,
    isSale: false,
  },
  {
    id: 2,
    name: "Wheat Flour",
    price: 80,
    originalPrice: 100,
    image: "/assets/flour.jpg",
    category: "General grocery",
    rating: 4.0,
    reviews: 80,
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Sugar",
    price: 60,
    originalPrice: 70,
    image: "/assets/sugar.jpg",
    category: "General grocery",
    rating: 4.8,
    reviews: 150,
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Salt",
    price: 30,
    originalPrice: 40,
    image: "/assets/salt.jpg",
    category: "General grocery",
    rating: 4.2,
    reviews: 100,
    isNew: true,
    isSale: false,
  },
  {
    id: 5,
    name: "Tea Powder",
    price: 100,
    originalPrice: 120,
    image: "/assets/tea.jpg",
    category: "General grocery",
    rating: 4.7,
    reviews: 200,
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Coffee Powder",
    price: 150,
    originalPrice: 180,
    image: "/assets/coffee.jpg",
    category: "General grocery",
    rating: 4.6,
    reviews: 180,
    isNew: true,
    isSale: false,
  },
  {
    id: 7,
    name: "Rice Bran Oil",
    price: 250,
    originalPrice: 280,
    image: "/assets/oil.jpg",
    category: "General grocery",
    rating: 4.9,
    reviews: 250,
    isNew: false,
    isSale: true,
  },
  {
    id: 8,
    name: "Maida",
    price: 50,
    originalPrice: 60,
    image: "/assets/maida.jpg",
    category: "General grocery",
    rating: 4.4,
    reviews: 120,
    isNew: true,
    isSale: false,
  },
];

export default function GeneralGroceryPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 flex items-center justify-center mb-10">
        <Image src="/assets/b1.jpg" alt="General Grocery" fill className="object-cover w-full h-full absolute z-0" />
        <div className="absolute inset-0 bg-gray-900/60 z-10" />
        <div className="relative z-20 text-center">
          <nav className="mb-4 text-gray-100 text-sm flex justify-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="font-semibold">General Grocery</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">General Grocery</h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow">All your essential beans, lentils, peas, and more. Stock up on the best general grocery items for your kitchen and family.</p>
        </div>
      </section>
      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {generalProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-gray-300 transition-all group relative">
              {product.isNew && <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">NEW</span>}
              {product.isSale && <span className="absolute top-4 right-4 bg-gray-400 text-blue-900 text-xs px-3 py-1 rounded-full font-bold shadow">SALE</span>}
              <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain rounded-xl mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">{product.name}</h3>
              <span className="text-gray-700 font-bold text-xl mb-1">PKR {product.price}</span>
              <span className="text-gray-500 line-through text-sm">PKR {product.originalPrice}</span>
              <span className="text-emerald-500 font-semibold text-sm mt-2">{product.rating} ★ ({product.reviews})</span>
              <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-semibold shadow transition-all">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 