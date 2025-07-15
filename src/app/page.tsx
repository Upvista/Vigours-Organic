"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import type { Product } from "./shop/page";

const HERO_IMAGES = [
  "/assets/1.jpg",
  "/assets/b1.jpg",
  "/assets/b2.jpg",
  "/assets/b3.jpg",
];

const HERO_TEXTS = [
  {
    title: "Welcome to Vigours Organic Haven",
    subtitle: "Freshness Delivered, Happiness Guaranteed!",
    description: "Discover the best groceries, handpicked for you. Enjoy exclusive deals, fast delivery, and a shopping experience like no other. Shop now and make every meal special!",
    cta: "Shop Now"
  },
  {
    title: "Taste the Difference with Vigours",
    subtitle: "Organic, Local, and Always Fresh",
    description: "From farm to table, our products are sourced with care. Experience the joy of healthy eating with our premium selection.",
    cta: "Browse Products"
  },
  {
    title: "Your Neighborhood Store, Online",
    subtitle: "Groceries at Your Fingertips",
    description: "Skip the lines and get your essentials delivered to your door. Fast, easy, and reliable – that's the Vigours promise!",
    cta: "Start Shopping"
  },
  {
    title: "Vigours Weekly Specials",
    subtitle: "Save More, Live Better",
    description: "Don't miss out on our exclusive weekly deals. Stock up and save big on your favorite products!",
    cta: "See Offers"
  },
];

const PRODUCT_IMAGE = "/assets/quail.jpeg";

// Sample product data
const BEST_SELLERS = [
  { id: 1, name: "Organic Eggs", price: 299, originalPrice: 399, rating: "4.7", reviews: 123, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: false, isSale: true },
  { id: 2, name: "Fresh Strawberries", price: 499, originalPrice: 599, rating: "4.9", reviews: 89, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: false, isSale: true },
  { id: 3, name: "Almond Butter", price: 799, originalPrice: 899, rating: "4.8", reviews: 56, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: false, isSale: true },
  { id: 4, name: "Wildflower Honey", price: 399, originalPrice: 499, rating: "4.6", reviews: 34, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: false, isSale: true },
];

const NEW_PRODUCTS = [
  { id: 5, name: "Avocado Premium", price: 599, originalPrice: 699, rating: "4.5", reviews: 67, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: true, isSale: false },
  { id: 6, name: "Greek Yogurt", price: 449, originalPrice: 549, rating: "4.8", reviews: 98, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: true, isSale: false },
  { id: 7, name: "Quinoa Organic", price: 899, originalPrice: 999, rating: "4.6", reviews: 45, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: true, isSale: false },
  { id: 8, name: "Almond Milk", price: 349, originalPrice: 399, rating: "4.7", reviews: 112, image: "/assets/quail.jpeg", category: "Groceries", inStock: true, isNew: true, isSale: false },
];

const HOT_PRODUCT = {
  id: 9,
  name: "Chobani Complete Vanilla Greek Yogurt",
  price: 449,
  originalPrice: 549,
  rating: "4.9",
  reviews: 234,
  discount: 19,
  image: "/assets/quail.jpeg",
  category: "Groceries",
  inStock: true,
  isNew: false,
  isSale: true
};

const BANNER_IMAGES = [
  {
    src: "/assets/b1.jpg",
    alt: "Banner 1",
    title: "Fresh Fruits and Vegetables",
    desc: "Discover the best fruits and vegetables for a healthy diet",
    cta: "Shop Now"
  },
  {
    src: "/assets/b2.jpg",
    alt: "Banner 2",
    title: "Organic Dairy Products",
    desc: "Experience the goodness of organic dairy products",
    cta: "Learn More"
  },
  {
    src: "/assets/b3.jpg",
    alt: "Banner 3",
    title: "Weekly Specials",
    desc: "Don't miss out on our exclusive weekly deals",
    cta: "See Offers"
  },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide for banners
  useEffect(() => {
    const timer = setTimeout(() => {
      setBannerIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [bannerIndex]);

  // Add to cart with beautiful animation
  const addToCart = (productId: number) => {
    // Find product in any of the arrays
    const allProducts = [...BEST_SELLERS, ...NEW_PRODUCTS, HOT_PRODUCT];
    const product = allProducts.find((p: Product) => p.id === productId);
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: PRODUCT_IMAGE,
      quantity: 1,
      category: "Groceries",
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((item: {id: number, quantity: number}) => item.id === productId);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't exist
      existingCart.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Dispatch custom event to update header cart
    const cartUpdatedEvent = new CustomEvent('cartUpdated', {
      detail: existingCart
    });
    window.dispatchEvent(cartUpdatedEvent);

    // Create beautiful add to cart animation
    createAddToCartAnimation(product);
    
    // Show success message with beautiful animated popup
    showSuccessPopup(`${product.name} added to cart!`);
  };

  // Beautiful add to cart animation
  const createAddToCartAnimation = (product: Product) => {
    // Create floating product image
    const productCard = document.querySelector(`[data-product-id="${product.id}"]`);
    if (!productCard) return;

    const rect = productCard.getBoundingClientRect();
    const cartButton = document.querySelector('[aria-label="Open cart"]');
    if (!cartButton) return;

    const cartRect = cartButton.getBoundingClientRect();

    // Create floating image
    const floatingImage = document.createElement('div');
    floatingImage.className = 'fixed z-50 pointer-events-none';
    floatingImage.style.left = `${rect.left + rect.width / 2 - 25}px`;
    floatingImage.style.top = `${rect.top + rect.height / 2 - 25}px`;
    floatingImage.style.width = '50px';
    floatingImage.style.height = '50px';
    floatingImage.style.backgroundImage = `url(${product.image})`;
    floatingImage.style.backgroundSize = 'cover';
    floatingImage.style.backgroundPosition = 'center';
    floatingImage.style.borderRadius = '50%';
    floatingImage.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    floatingImage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    document.body.appendChild(floatingImage);

    // Animate to cart
    setTimeout(() => {
      floatingImage.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
      floatingImage.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
      floatingImage.style.transform = 'scale(0.3) rotate(360deg)';
      floatingImage.style.opacity = '0';
    }, 50);

    // Remove after animation
    setTimeout(() => {
      document.body.removeChild(floatingImage);
      
      // Add cart bounce animation
      cartButton.classList.add('animate-bounce');
      setTimeout(() => {
        cartButton.classList.remove('animate-bounce');
      }, 600);
    }, 850);
  };

  // Beautiful animated popup
  const showSuccessPopup = (message: string) => {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex items-center gap-3';
    popup.innerHTML = `
      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="font-semibold">${message}</span>
    `;
    
    document.body.appendChild(popup);
    
    // Animate in
    setTimeout(() => {
      popup.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      popup.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);
    }, 3000);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Slider - Desktop */}
      <section className="container mx-auto py-8 px-4 hidden md:block">
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl flex items-stretch bg-gradient-to-r from-emerald-50 to-white">
          {/* Text Block */}
          <div className="flex-1 flex flex-col justify-center pl-12 pr-8 z-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight drop-shadow-sm">{HERO_TEXTS[heroIndex].title}</h1>
            <h2 className="text-2xl font-semibold text-emerald-600 mb-4">{HERO_TEXTS[heroIndex].subtitle}</h2>
            <p className="text-lg text-gray-800 mb-6 max-w-lg font-medium">{HERO_TEXTS[heroIndex].description}</p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg shadow transition text-lg w-max">{HERO_TEXTS[heroIndex].cta}</button>
          </div>
          {/* Image Block */}
          <div className="flex-1 relative h-full min-w-[350px] max-w-[50%]">
            <Image
              src={HERO_IMAGES[heroIndex]}
              alt={`Hero Slide ${heroIndex + 1}`}
              fill
              className="object-cover object-center h-full w-full transition-all duration-700 rounded-l-2xl shadow-lg"
              priority
            />
          </div>
          {/* Dots */}
          <div className="absolute bottom-6 left-12 flex gap-2 z-20">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 border-emerald-200 bg-white/80 transition-all ${heroIndex === idx ? "bg-emerald-600 border-emerald-600 scale-110" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Hero Slider - Mobile */}
      <section className="container mx-auto py-4 px-2 md:hidden">
        <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={HERO_IMAGES[heroIndex]}
            alt={`Hero Slide ${heroIndex + 1}`}
            fill
            className="object-cover object-center h-full w-full transition-all duration-700"
            priority
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full border-2 border-white bg-white/70 transition-all ${heroIndex === idx ? "bg-emerald-500 border-emerald-500 scale-110" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{HERO_TEXTS[heroIndex].title}</h1>
          <h2 className="text-lg font-semibold text-emerald-600 mb-2">{HERO_TEXTS[heroIndex].subtitle}</h2>
          <p className="text-base text-gray-800 mb-3 font-medium">{HERO_TEXTS[heroIndex].description}</p>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg shadow transition text-base w-max mx-auto">{HERO_TEXTS[heroIndex].cta}</button>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto py-6 px-4">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Best Sellers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BEST_SELLERS.map((product) => (
            <div key={product.id} data-product-id={product.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform border border-gray-100">
              <div className="w-24 h-24 mb-3 relative">
                <Image src={PRODUCT_IMAGE} alt={product.name} fill className="object-cover rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 text-center mb-2 text-sm line-clamp-2">{product.name}</h4>
              <div className="flex items-center gap-1 mb-2">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-600">({product.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-600 font-bold text-lg">PKR {product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-500 line-through text-sm">PKR {product.originalPrice}</span>
                )}
              </div>
              <button 
                onClick={() => addToCart(product.id)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Product for This Week */}
      <section className="container mx-auto py-6 px-4">
        <h3 className="text-2xl font-bold mb-6 text-red-600">Hot Product for This Week</h3>
        <div data-product-id={HOT_PRODUCT.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform">
          <div className="w-32 h-32 mb-4 md:mb-0 relative">
            <Image src={PRODUCT_IMAGE} alt={HOT_PRODUCT.name} fill className="object-cover rounded-lg" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-xl text-gray-900 mb-3">{HOT_PRODUCT.name}</h4>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="text-red-500 font-bold text-2xl">PKR {HOT_PRODUCT.price}</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">{HOT_PRODUCT.discount}% OFF</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-gray-800">{HOT_PRODUCT.rating}</span>
              <span className="text-gray-600">({HOT_PRODUCT.reviews} reviews)</span>
            </div>
            <button 
              onClick={() => addToCart(HOT_PRODUCT.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="container mx-auto py-6 px-4">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">New Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {NEW_PRODUCTS.map((product) => (
            <div key={product.id} data-product-id={product.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform border border-gray-100">
              <div className="w-24 h-24 mb-3 relative">
                <Image src={PRODUCT_IMAGE} alt={product.name} fill className="object-cover rounded-lg" />
              </div>
              <h4 className="font-bold text-gray-900 text-center mb-2 text-sm line-clamp-2">{product.name}</h4>
              <div className="flex items-center gap-1 mb-2">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-600">({product.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-emerald-600 font-bold text-lg">PKR {product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-500 line-through text-sm">PKR {product.originalPrice}</span>
                )}
              </div>
              <button 
                onClick={() => addToCart(product.id)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter & Category Quick Links */}
      {/* Sliding Banners Section - Replaces Newsletter & Quick Links */}
      <section className="container mx-auto py-8 px-4">
        <div className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl">
          {/* Banner Slides */}
          <div className="absolute inset-0 w-full h-full">
            {/* Sliding logic */}
            <div className="w-full h-full relative transition-all duration-700" style={{ transform: `translateX(-${bannerIndex * 100}%)` }}>
              <div className="flex w-full h-full">
                {BANNER_IMAGES.map((img, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0 relative">
          <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover w-full h-full transition-all duration-700"
                      priority={idx === bannerIndex}
                    />
                    {/* Organic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-emerald-700/40 to-emerald-400/20 rounded-2xl z-10" />
                    {/* Text overlay */}
                    <div className="absolute left-8 bottom-8 md:left-16 md:bottom-12 z-20 max-w-[70%] md:max-w-[50%]">
                      <h3 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow mb-2 animate-fade-in-up">{img.title}</h3>
                      <p className="text-md md:text-lg text-emerald-100 mb-4 animate-fade-in-up delay-100">{img.desc}</p>
                      {img.cta && (
                        <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-base animate-fade-in-up delay-200">{img.cta}</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {BANNER_IMAGES.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 border-emerald-200 bg-white/80 transition-all ${bannerIndex === idx ? "bg-emerald-600 border-emerald-600 scale-110" : ""}`}
                onClick={() => setBannerIndex(idx)}
                aria-label={`Go to banner ${idx + 1}`}
              />
            ))}
          </div>
    </div>
      </section>
    </main>
  );
}
