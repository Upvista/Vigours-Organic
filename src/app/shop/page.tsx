"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FunnelIcon, Squares2X2Icon, ListBulletIcon, HeartIcon, EyeIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { PRODUCTS, Product } from "../products";
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  "Hunza foods",
  "Desi foods",
  "Tibbi foods",
  "General grocery",
];

const ITEMS_PER_PAGE = 12;

export default function Shop() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(PRODUCTS.slice(0, ITEMS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showQuickView, setShowQuickView] = useState<string | null>(null);
  // 1. Add state for mobile filter panel
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewSlide, setQuickViewSlide] = useState(0);

  const router = useRouter();

  // Filter and sort products
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
      const matchesPrice = product.newPrice >= priceRange[0] && product.newPrice <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.newPrice - a.newPrice);
        break; 
      case "rating":
        filtered.sort((a, b) => b.reviewStars - a.reviewStars);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
    setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE));
  }, [selectedCategory, sortBy, priceRange, products]);

  // Slideshow effect for modal
  useEffect(() => {
    if (!showQuickView) return;
    const product = products.find(p => p.id.toString() === showQuickView);
    if (!product) return;
    const timer = setInterval(() => {
      setQuickViewSlide((prev) => (prev + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [showQuickView, products]);

  // Load more products
  const loadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProducts = filteredProducts.slice(startIndex, endIndex);
    setDisplayedProducts([...displayedProducts, ...newProducts]);
    setCurrentPage(nextPage);
  };

  // Toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Add to cart
  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.newPrice,
      originalPrice: product.oldPrice,
      image: product.coverImage,
      quantity: 1,
      category: product.category,
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
    showSuccessPopup(`${product.title} added to cart!`);
  };

  // Open quick view modal
  const openQuickView = (product: Product) => {
    setShowQuickView(product.id.toString());
    setQuickViewSlide(0);
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
    floatingImage.style.backgroundImage = `url(${product.coverImage})`;
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

  // Calculate discount percentage
  const getDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
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

  // useEffect to update cartCount on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      // setCartCount(cart.reduce((sum: number, item: {quantity: number}) => sum + item.quantity, 0));
      // Optionally, listen for cart updates
      // const handler = () => {
      //   const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      //   setCartCount(updatedCart.reduce((sum: number, item: {quantity: number}) => sum + item.quantity, 0));
      // };
      // window.addEventListener('cartUpdated', handler);
      // return () => window.removeEventListener('cartUpdated', handler);
    }
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Shop All Products</h1>
          <p className="text-lg text-gray-700 font-medium">Discover our premium selection of fresh groceries</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-end gap-3 mb-4">
            <button className="lg:hidden p-2 rounded-full bg-emerald-100 hover:bg-emerald-200" onClick={() => setMobileFilterOpen(true)}>
              <FunnelIcon className="w-6 h-6 text-emerald-600" />
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>

            {/* View Mode */}
            <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${viewMode === "grid" ? "bg-emerald-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${viewMode === "list" ? "bg-emerald-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <ListBulletIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-base font-semibold text-gray-900">Price Range:</span>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-lg font-bold text-gray-900">PKR {priceRange[1]}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-gray-100">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-gray-900">
                <FunnelIcon className="w-6 h-6 text-emerald-600" />
                Filters
              </h3>
              
              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Categories</h4>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                        selectedCategory === category
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "text-gray-800 hover:bg-gray-100 hover:text-emerald-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-base font-semibold text-gray-900 bg-gray-50 p-4 rounded-xl">
                Showing {displayedProducts.length} of {filteredProducts.length} products
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {displayedProducts.map((product, index) => (
                  <div 
                    key={product.id.toString()} 
                    data-product-id={product.id.toString()}
                    onClick={() => openQuickView(product)}
                    className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform group border border-gray-100"
                    style={{
                      animationName: 'fadeInUp',
                      animationDuration: '0.8s',
                      animationTimingFunction: 'ease-out',
                      animationFillMode: 'forwards',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative mb-3 sm:mb-4 lg:mb-6">
                      <div className="w-full h-32 sm:h-40 lg:h-56 relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                        <Image
                          src={product.coverImage}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        {/* Animated overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2">
                        {product.isNew && (
                          <span className="bg-emerald-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-bold shadow-lg">NEW</span>
                        )}
                        {product.isSale && (
                          <span className="bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-bold shadow-lg">
                            -{getDiscount(product.oldPrice, product.newPrice)}% OFF
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 transform"
                        >
                          {wishlist.includes(product.id) ? (
                            <HeartSolidIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 animate-pulse" />
                          ) : (
                            <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                          )}
                        </button>
                        <button
                          onClick={() => openQuickView(product)}
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 transform"
                        >
                          <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        </button>
                      </div>

                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-bold shadow-lg">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <h3 className="font-bold text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2 text-gray-900 leading-tight line-clamp-2">{product.title}</h3>
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800">{product.reviewStars}</span>
                        <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="text-emerald-600 font-bold text-lg sm:text-xl lg:text-2xl">PKR {product.newPrice}</span>
                        {product.isSale && (
                          <span className="text-gray-500 line-through text-sm sm:text-base lg:text-lg font-medium">PKR {product.oldPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); addToCart(product.id); }}
                        disabled={!product.inStock}
                        className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 disabled:bg-gray-400 text-white py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform group-hover:shadow-emerald-500/25"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4 sm:space-y-6">
                {displayedProducts.map((product) => (
                  <div key={product.id.toString()} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all border border-gray-100">
                    <div className="flex gap-4 sm:gap-6">
                      <div className="w-20 h-20 sm:w-32 sm:h-32 relative flex-shrink-0">
                        <Image
                          src={product.coverImage}
                          alt={product.title}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2 text-gray-900 line-clamp-2">{product.title}</h3>
                        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                          <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                          <span className="text-sm sm:text-lg font-semibold text-gray-800">{product.reviewStars}</span>
                          <span className="text-xs sm:text-base text-gray-600">({product.reviews} reviews)</span>
                        </div>
                        <p className="text-sm sm:text-lg text-gray-700 mb-2 sm:mb-4 font-medium line-clamp-1">{product.category}</p>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="text-emerald-600 font-bold text-lg sm:text-xl lg:text-2xl">PKR {product.newPrice}</span>
                          {product.isSale && (
                            <span className="text-gray-500 line-through text-sm sm:text-lg lg:text-xl font-medium">PKR {product.oldPrice}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                          {wishlist.includes(product.id) ? (
                            <HeartSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                          )}
                        </button>
                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-colors shadow-lg whitespace-nowrap"
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {displayedProducts.length < filteredProducts.length && (
              <div className="text-center mt-8 sm:mt-12">
                <button
                  onClick={loadMore}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick View Modal */}
        {showQuickView && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-full w-full h-full sm:max-w-2xl sm:h-auto overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-black">Quick View</h2>
                  <button
                    onClick={() => setShowQuickView(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                {(() => {
                  const product = products.find(p => p.id.toString() === showQuickView);
                  if (!product) return null;
                  const shortDesc = product.description.length > 80 ? product.description.slice(0, 80) + '...' : product.description;
                  return (
                    <div className="flex flex-col md:flex-row gap-4 p-2 sm:gap-8 sm:p-8 w-full max-w-full">
                      <div className="w-full md:w-1/2 flex flex-col items-center">
                        <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow-lg mb-3 bg-gradient-to-br from-emerald-100 to-emerald-50">
                          <Image src={product.images[quickViewSlide]} alt={product.title} fill className="object-cover object-center w-full h-full transition-all duration-700" />
                          {/* Arrows */}
                          <button onClick={() => setQuickViewSlide((quickViewSlide - 1 + product.images.length) % product.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-emerald-200 text-emerald-700 rounded-full p-2 shadow-lg z-10">
                            &#8592;
                          </button>
                          <button onClick={() => setQuickViewSlide((quickViewSlide + 1) % product.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-emerald-200 text-emerald-700 rounded-full p-2 shadow-lg z-10">
                            &#8594;
                          </button>
                          {/* Dots */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {product.images.map((_, idx) => (
                              <button
                                key={idx}
                                className={`w-2.5 h-2.5 rounded-full border-2 border-emerald-300 bg-white/80 transition-all ${quickViewSlide === idx ? "bg-emerald-600 border-emerald-600 scale-110" : ""}`}
                                onClick={() => setQuickViewSlide(idx)}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col gap-2">
                        <h3 className="text-2xl font-extrabold text-emerald-900 mb-1 text-black">{product.title}</h3>
                        <div className="flex items-center gap-2 mb-1">
                          <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-base font-semibold text-gray-800">{product.reviewStars}</span>
                          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                        </div>
                        <span className="text-emerald-700 font-semibold text-base mb-1 text-black">{product.category}</span>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-emerald-600 font-bold text-2xl">PKR {product.newPrice}</span>
                          {product.isSale && (
                            <span className="text-gray-400 line-through text-lg font-medium">PKR {product.oldPrice}</span>
                          )}
                          <span className="ml-2 text-gray-600">{product.quantityUnit}</span>
                        </div>
                        {product.variants && product.variants.length > 0 && (
                          <div className="mb-2">
                            <span className="font-semibold mr-2 text-emerald-800">Variant:</span>
                            <select className="border rounded px-2 py-1">
                              {product.variants.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                          </div>
                        )}
                        <div className="mb-2">
                          <h4 className="font-semibold text-emerald-800">Description</h4>
                          <p className="text-gray-700 text-base line-clamp-2">
                            {shortDesc}
                            {product.description.length > 80 && (
                              <button onClick={() => router.push(`/shop/${product.slug}`)} className="ml-2 text-emerald-600 hover:underline font-semibold">Read more</button>
                            )}
                          </p>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-semibold text-emerald-800">Health Benefits</h4>
                          <p className="text-gray-700 text-base">{product.healthBenefits}</p>
                        </div>
                        <div className="flex gap-3 mb-2">
                          <button
                            onClick={() => addToCart(product.id)}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition-all"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => { addToCart(product.id); window.location.href = '/checkout'; }}
                            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition-all"
                          >
                            Buy Now
                          </button>
                        </div>
                        <button
                          onClick={() => router.push(`/shop/${product.slug}`)}
                          className="w-full mt-2 bg-gray-100 hover:bg-emerald-100 text-emerald-900 py-3 rounded-xl font-bold text-lg transition-all shadow"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Filter Sliding Panel */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
            <div className="relative bg-white w-64 max-w-full h-full shadow-xl p-6">
              <button className="absolute top-2 right-2 text-gray-500" onClick={() => setMobileFilterOpen(false)}>&times;</button>
              <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-gray-900">
                <FunnelIcon className="w-6 h-6 text-emerald-600" /> Filters
              </h3>
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Categories</h4>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => { setSelectedCategory(category); setMobileFilterOpen(false); }}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${selectedCategory === category ? "bg-emerald-600 text-white shadow-lg" : "text-gray-800 hover:bg-gray-100 hover:text-emerald-600"}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </main>
  );
} 