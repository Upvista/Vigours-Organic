"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// Remove: import { PRODUCTS, Product } from "../shop/page";

// If PRODUCTS is needed, import from a shared data file or define locally.
// Also, replace any unescaped single quote (') in JSX with &apos; or similar.
const tibbiProducts = [
  {
    id: 1,
    name: "Chia Seeds",
    price: 150,
    originalPrice: 200,
    rating: 4.5,
    reviews: 120,
    image: "/assets/chia-seeds.jpg",
    category: "Tibbi foods",
    isNew: true,
    isSale: false,
  },
  {
    id: 2,
    name: "Pumpkin Seeds",
    price: 100,
    originalPrice: 120,
    rating: 4.0,
    reviews: 80,
    image: "/assets/pumpkin-seeds.jpg",
    category: "Tibbi foods",
    isNew: false,
    isSale: true,
  },
  {
    id: 3,
    name: "Olive Oil",
    price: 250,
    originalPrice: 300,
    rating: 4.8,
    reviews: 150,
    image: "/assets/olive-oil.jpg",
    category: "Tibbi foods",
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Mustard Oil",
    price: 180,
    originalPrice: 220,
    rating: 4.2,
    reviews: 100,
    image: "/assets/mustard-oil.jpg",
    category: "Tibbi foods",
    isNew: false,
    isSale: true,
  },
  {
    id: 5,
    name: "Triphla",
    price: 200,
    originalPrice: 250,
    rating: 4.7,
    reviews: 180,
    image: "/assets/triphla.jpg",
    category: "Tibbi foods",
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Moringa",
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviews: 130,
    image: "/assets/moringa.jpg",
    category: "Tibbi foods",
    isNew: false,
    isSale: true,
  },
  {
    id: 7,
    name: "Bakhra Powder",
    price: 100,
    originalPrice: 120,
    rating: 4.4,
    reviews: 90,
    image: "/assets/bakhra-powder.jpg",
    category: "Tibbi foods",
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Methi Dana",
    price: 80,
    originalPrice: 100,
    rating: 4.1,
    reviews: 70,
    image: "/assets/methi-dana.jpg",
    category: "Tibbi foods",
    isNew: false,
    isSale: true,
  },
  {
    id: 9,
    name: "Kalwanji",
    price: 150,
    originalPrice: 180,
    rating: 4.9,
    reviews: 200,
    image: "/assets/kalwanji.jpg",
    category: "Tibbi foods",
    isNew: true,
    isSale: false,
  },
];

export default function TibbiFoodsPage() {
  return (
    <main className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 flex items-center justify-center mb-10">
        <Image src="/assets/b3.jpg" alt="Tibbi Foods" fill className="object-cover w-full h-full absolute z-0" />
        <div className="absolute inset-0 bg-green-900/60 z-10" />
        <div className="relative z-20 text-center">
          <nav className="mb-4 text-green-100 text-sm flex justify-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="font-semibold">Tibbi Foods</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">Tibbi Foods</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto drop-shadow">Explore the healing power of Tibbi foods: chia seeds, pumpkin seeds, olive oil, mustard oil, triphla, moringa, bakhra powder, methi dana, kalwanji, and more. Nature&apos;s best for your wellness.</p>
        </div>
      </section>
      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tibbiProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-green-300 transition-all group relative">
              {product.isNew && <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">NEW</span>}
              {product.isSale && <span className="absolute top-4 right-4 bg-lime-400 text-green-900 text-xs px-3 py-1 rounded-full font-bold shadow">SALE</span>}
              <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain rounded-xl mb-4" />
              <h3 className="font-bold text-lg text-green-900 mb-2 text-center">{product.name}</h3>
              <span className="text-green-600 font-bold text-xl mb-1">PKR {product.price}</span>
              <span className="text-gray-500 line-through text-sm">PKR {product.originalPrice}</span>
              <span className="text-green-500 font-semibold text-sm mt-2">{product.rating} ★ ({product.reviews})</span>
              <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-full font-semibold shadow transition-all">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 