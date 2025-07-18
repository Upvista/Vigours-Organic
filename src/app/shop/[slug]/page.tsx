"use client";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "../../products";
import Image from "next/image";
import { useState } from "react";

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "");
  const [slide, setSlide] = useState(0);

  if (!product) return <div className="p-10 text-center text-2xl">Product not found.</div>;

  return (
    <div className="relative min-h-screen bg-white">
      {/* Slideshow */}
      <div className="w-full max-w-2xl mx-auto pt-8 pb-4">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-6">
          <Image
            src={product.images[slide]}
            alt={product.title}
            fill
            className="object-cover object-center w-full h-full transition-all duration-700"
            priority
          />
          {/* Slide dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 border-emerald-200 bg-white/80 transition-all ${slide === idx ? "bg-emerald-600 border-emerald-600 scale-110" : ""}`}
                onClick={() => setSlide(idx)}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div className="max-w-2xl mx-auto px-4 pb-32">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-emerald-600 font-bold text-2xl">PKR {product.newPrice}</span>
          {product.isSale && (
            <span className="text-gray-500 line-through text-lg font-medium">PKR {product.oldPrice}</span>
          )}
          <span className="ml-4 text-yellow-500 font-semibold">{product.reviewStars} ★ ({product.reviews})</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <span className="font-semibold text-black">Quantity:</span>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 bg-gray-200 text-black border border-black rounded-l font-bold">-</button>
          <span className="px-4 text-black">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-200 text-black border border-black rounded-r font-bold">+</button>
          <span className="ml-2 text-black">{product.quantityUnit}</span>
        </div>
        {product.variants && product.variants.length > 0 && (
          <div className="mb-4">
            <span className="font-semibold text-black">Variant:</span>
            <select value={selectedVariant} onChange={e => setSelectedVariant(e.target.value)} className="border border-black text-black rounded px-2 py-1">
              {product.variants.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        )}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-1">Description</h2>
          <p className="text-gray-900 mb-4">{product.description}</p>
          <h2 className="text-lg font-bold text-black mb-1">Pros</h2>
          <ul className="list-disc pl-5 text-gray-900 mb-4">{product.pros?.map((p: string) => <li key={p}>{p}</li>)}</ul>
          <h2 className="text-lg font-bold text-black mb-1">Cons</h2>
          <ul className="list-disc pl-5 text-gray-900 mb-4">{product.cons?.map((c: string) => <li key={c}>{c}</li>)}</ul>
          <h2 className="text-lg font-bold text-black mb-1">Health Benefits</h2>
          <p className="text-gray-900 mb-4">{product.healthBenefits}</p>
        </div>
      </div>
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl z-50 flex items-center justify-center gap-6 py-4 px-4">
        <button
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-lg transition-all shadow-lg"
          onClick={() => {/* Add to cart logic here */}}
        >
          Add to Cart
        </button>
        <button
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-lg transition-all shadow-lg"
          onClick={() => {/* Buy now logic here, e.g., redirect to checkout */ router.push("/checkout") }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
} 