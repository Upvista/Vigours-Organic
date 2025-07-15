"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon, HeartIcon, EyeIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

const CATEGORIES = [
  "Hunza foods",
  "Desi foods",
  "Tibbi foods",
  "General grocery",
];

// Generate deterministic product data
const PRODUCTS = [
  // Hunza foods
  { id: 1, name: "Buckwheat", price: 450, originalPrice: 500, image: "/assets/quail.jpeg", category: "Hunza foods", rating: "4.8", reviews: 120, inStock: true, isNew: true, isSale: false },
  { id: 2, name: "Hunza Tea", price: 350, originalPrice: 400, image: "/assets/quail.jpeg", category: "Hunza foods", rating: "4.7", reviews: 80, inStock: true, isNew: false, isSale: true },
  { id: 3, name: "Hunza Valley Dry Fruits", price: 1200, originalPrice: 1400, image: "/assets/quail.jpeg", category: "Hunza foods", rating: "4.9", reviews: 60, inStock: true, isNew: false, isSale: false },
  { id: 4, name: "Berries Mix", price: 900, originalPrice: 1000, image: "/assets/quail.jpeg", category: "Hunza foods", rating: "4.6", reviews: 45, inStock: true, isNew: true, isSale: true },
  // Desi foods
  { id: 5, name: "Desi Ghee", price: 1800, originalPrice: 2000, image: "/assets/quail.jpeg", category: "Desi foods", rating: "4.9", reviews: 150, inStock: true, isNew: false, isSale: true },
  { id: 6, name: "Quail Meat", price: 950, originalPrice: 1100, image: "/assets/quail.jpeg", category: "Desi foods", rating: "4.8", reviews: 70, inStock: true, isNew: true, isSale: false },
  { id: 7, name: "Multigrain Flour", price: 400, originalPrice: 450, image: "/assets/quail.jpeg", category: "Desi foods", rating: "4.7", reviews: 90, inStock: true, isNew: false, isSale: false },
  { id: 8, name: "Mixed Pickles", price: 350, originalPrice: 400, image: "/assets/quail.jpeg", category: "Desi foods", rating: "4.6", reviews: 55, inStock: true, isNew: true, isSale: true },
  { id: 9, name: "Jaggery (Gur)", price: 300, originalPrice: 350, image: "/assets/quail.jpeg", category: "Desi foods", rating: "4.8", reviews: 100, inStock: true, isNew: false, isSale: false },
  // Tibbi foods
  { id: 10, name: "Chia Seeds", price: 600, originalPrice: 700, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.9", reviews: 110, inStock: true, isNew: true, isSale: false },
  { id: 11, name: "Pumpkin Seeds", price: 650, originalPrice: 750, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.8", reviews: 60, inStock: true, isNew: false, isSale: true },
  { id: 12, name: "Olive Oil", price: 1200, originalPrice: 1400, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.7", reviews: 80, inStock: true, isNew: false, isSale: false },
  { id: 13, name: "Mustard Oil", price: 900, originalPrice: 1000, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.6", reviews: 50, inStock: true, isNew: true, isSale: true },
  { id: 14, name: "Triphla", price: 500, originalPrice: 600, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.8", reviews: 40, inStock: true, isNew: false, isSale: false },
  { id: 15, name: "Moringa", price: 700, originalPrice: 800, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.7", reviews: 30, inStock: true, isNew: true, isSale: false },
  { id: 16, name: "Bakhra Powder", price: 550, originalPrice: 650, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.6", reviews: 25, inStock: true, isNew: false, isSale: true },
  { id: 17, name: "Methi Dana", price: 300, originalPrice: 350, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.8", reviews: 20, inStock: true, isNew: false, isSale: false },
  { id: 18, name: "Kalwanji", price: 350, originalPrice: 400, image: "/assets/quail.jpeg", category: "Tibbi foods", rating: "4.7", reviews: 15, inStock: true, isNew: true, isSale: false },
  // General grocery
  { id: 19, name: "Kidney Beans", price: 250, originalPrice: 300, image: "/assets/quail.jpeg", category: "General grocery", rating: "4.8", reviews: 60, inStock: true, isNew: false, isSale: false },
  { id: 20, name: "Chickpeas", price: 200, originalPrice: 250, image: "/assets/quail.jpeg", category: "General grocery", rating: "4.7", reviews: 50, inStock: true, isNew: true, isSale: true },
  { id: 21, name: "Black Beans", price: 300, originalPrice: 350, image: "/assets/quail.jpeg", category: "General grocery", rating: "4.6", reviews: 40, inStock: true, isNew: false, isSale: false },
  { id: 22, name: "Lentils", price: 180, originalPrice: 220, image: "/assets/quail.jpeg", category: "General grocery", rating: "4.8", reviews: 30, inStock: true, isNew: true, isSale: false },
  { id: 23, name: "Green Peas", price: 220, originalPrice: 270, image: "/assets/quail.jpeg", category: "General grocery", rating: "4.7", reviews: 25, inStock: true, isNew: false, isSale: true },
];

const ITEMS_PER_PAGE = 12;

// Define Product type
export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: string;
  reviews: number;
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
};

export default function Shop() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(PRODUCTS.slice(0, ITEMS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showQuickView, setShowQuickView] = useState<number | null>(null);
  // Add state for cartCount
  const [cartCount, setCartCount] = useState(0);

  // Filter and sort products
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
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
  }, [searchTerm, selectedCategory, sortBy, priceRange, products]);

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
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
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
    showSuccessPopup(`${product.name} added to cart!`);
  };

  // Open quick view modal
  const openQuickView = (product: Product) => {
    setShowQuickView(product.id);
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
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum: number, item: {quantity: number}) => sum + item.quantity, 0));
      // Optionally, listen for cart updates
      const handler = () => {
        const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(updatedCart.reduce((sum: number, item: {quantity: number}) => sum + item.quantity, 0));
      };
      window.addEventListener('cartUpdated', handler);
      return () => window.removeEventListener('cartUpdated', handler);
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
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium"
              />
            </div>

            {/* Sort */}
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

            {/* Cart */}
            <button className="relative p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
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
          <div className="lg:w-72 flex-shrink-0">
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
                    key={product.id} 
                    data-product-id={product.id}
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
                          src={product.image}
                          alt={product.name}
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
                            -{getDiscount(product.originalPrice, product.price)}% OFF
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
                      <h3 className="font-bold text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2 text-gray-900 leading-tight line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800">{product.rating}</span>
                        <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <span className="text-emerald-600 font-bold text-lg sm:text-xl lg:text-2xl">PKR {product.price}</span>
                        {product.isSale && (
                          <span className="text-gray-500 line-through text-sm sm:text-base lg:text-lg font-medium">PKR {product.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(product.id)}
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
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all border border-gray-100">
                    <div className="flex gap-4 sm:gap-6">
                      <div className="w-20 h-20 sm:w-32 sm:h-32 relative flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2 text-gray-900 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                          <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                          <span className="text-sm sm:text-lg font-semibold text-gray-800">{product.rating}</span>
                          <span className="text-xs sm:text-base text-gray-600">({product.reviews} reviews)</span>
                        </div>
                        <p className="text-sm sm:text-lg text-gray-700 mb-2 sm:mb-4 font-medium line-clamp-1">{product.category}</p>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="text-emerald-600 font-bold text-lg sm:text-xl lg:text-2xl">PKR {product.price}</span>
                          {product.isSale && (
                            <span className="text-gray-500 line-through text-sm sm:text-lg lg:text-xl font-medium">PKR {product.originalPrice}</span>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">Quick View</h2>
                  <button
                    onClick={() => setShowQuickView(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                {(() => {
                  const product = products.find(p => p.id === showQuickView);
                  if (!product) return null;
                  return (
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/2">
                        <div className="w-full h-64 relative">
                          <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                        </div>
                        <p className="text-gray-600 mb-4">{product.category}</p>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-emerald-600 font-bold text-2xl">PKR {product.price}</span>
                          {product.isSale && (
                            <span className="text-gray-400 line-through">PKR {product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(product.id)}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            {wishlist.includes(product.id) ? (
                              <HeartSolidIcon className="w-5 h-5 text-red-500" />
                            ) : (
                              <HeartIcon className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
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