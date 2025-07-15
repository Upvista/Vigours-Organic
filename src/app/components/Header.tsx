"use client";
import React, { useState, useEffect } from "react";
import { UserCircleIcon, ShoppingBagIcon, ChevronDownIcon, MapPinIcon, MagnifyingGlassIcon, Bars3Icon, GlobeAltIcon, CurrencyDollarIcon, HeartIcon, ShieldCheckIcon, XMarkIcon, PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Dialog } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const LOCATIONS = [
  { name: "DHA Lahore", rate: 200 },
  { name: "Gulberg", rate: 150 },
  { name: "Johar Town", rate: 100 },
  { name: "Model Town", rate: 120 },
  { name: "Bahria Town", rate: 250 },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ur", label: "Urdu" },
  { code: "ar", label: "Arabic" },
];

const CURRENCIES = [
  { code: "USD", label: "USD" },
  { code: "PKR", label: "PKR" },
  { code: "EUR", label: "EUR" },
];

const CATEGORIES = [
  "Fruits & Vegetables",
  "Breakfast & Dairy",
  "Meat & Seafood",
  "Beverages",
  "Breads & Bakery",
  "Snacks & Sweets",
  "Frozen Foods",
];

const NAV_LINKS = [
  { label: "Home", icon: null, href: "/" },
  { label: "Shop", icon: null, href: "/shop" },
  { label: "Blog", icon: null, href: "/blog" },
  { label: "Contact", icon: null, href: "/contact" },
];

// Cart item interface
interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  category: string;
}

const Header = () => {
  const pathname = usePathname();
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      setCartItems(event.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal - couponDiscount;

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Function to get link classes based on active state
  const getLinkClasses = (href: string, isMobile = false) => {
    const baseClasses = isMobile 
      ? "flex items-center gap-2 px-2 py-2 rounded font-medium transition-colors"
      : "flex items-center gap-1 transition-colors";
    
    if (isActiveLink(href)) {
      return `${baseClasses} ${isMobile ? 'bg-emerald-100 text-emerald-700' : 'text-emerald-600 font-bold'}`;
    }
    return `${baseClasses} ${isMobile ? 'text-emerald-700 hover:bg-emerald-50' : 'text-emerald-700 hover:text-emerald-600'}`;
  };

  // Cart functions
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      const discount = subtotal * 0.1;
      setCouponDiscount(discount);
      setCouponApplied(true);
      localStorage.setItem('couponDiscount', discount.toString());
      showSuccessPopup('SAVE10 coupon applied! 10% discount added.');
    } else if (couponCode.toLowerCase() === 'save20') {
      const discount = subtotal * 0.2;
      setCouponDiscount(discount);
      setCouponApplied(true);
      localStorage.setItem('couponDiscount', discount.toString());
      showSuccessPopup('SAVE20 coupon applied! 20% discount added.');
    } else if (couponCode.toLowerCase() === 'hamza30') {
      const discount = subtotal * 0.3;
      setCouponDiscount(discount);
      setCouponApplied(true);
      localStorage.setItem('couponDiscount', discount.toString());
      showSuccessPopup('HAMZA30 coupon applied! 30% discount added.');
    } else {
      showErrorPopup('Invalid coupon code. Try "SAVE10", "SAVE20", or "HAMZA30"');
    }
  };

  const clearCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
    setCouponDiscount(0);
    localStorage.removeItem('couponDiscount');
  };

  // Beautiful animated popup functions
  const showSuccessPopup = (message: string) => {
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
    
    setTimeout(() => {
      popup.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
      popup.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);
    }, 3000);
  };

  const showErrorPopup = (message: string) => {
    const popup = document.createElement('div');
    popup.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex items-center gap-3';
    popup.innerHTML = `
      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <span class="font-semibold">${message}</span>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
      popup.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
      popup.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);
    }, 3000);
  };

  // Mobile sidebar content
  const mobileSidebar = (
    <Transition show={sidebarOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-60"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-60"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={React.Fragment}
              enter="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
              enterFrom="-translate-x-full scale-90 opacity-0"
              enterTo="translate-x-0 scale-100 opacity-100"
              leave="transition-transform duration-400 [transition-timing-function:cubic-bezier(0.55,0,0.1,1)]"
              leaveFrom="translate-x-0 scale-100 opacity-100"
              leaveTo="-translate-x-full scale-90 opacity-0"
            >
              <Dialog.Panel className="absolute left-0 top-0 h-full w-80 max-w-full bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-300 rounded-full flex items-center justify-center shadow">
                      <ShoppingBagIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-extrabold text-xl text-emerald-900 tracking-tight">hamza</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="text-emerald-500 hover:text-emerald-600 text-2xl font-bold"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <div className="p-4 border-b">
                  <Menu as="div" className="w-full">
                    <Menu.Button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm hover:bg-emerald-50 transition font-semibold text-emerald-900 focus:outline-none">
                      <span className="flex items-center gap-2"><MapPinIcon className="w-5 h-5 text-emerald-500" />{selectedLocation.name}</span>
                      <ChevronDownIcon className="w-4 h-4 text-emerald-400" />
                    </Menu.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute left-4 mt-2 w-72 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        {LOCATIONS.map((loc) => (
                          <Menu.Item key={loc.name}>
                            {({ active }) => (
                              <button
                                onClick={() => { setSelectedLocation(loc); setSidebarOpen(false); }}
                                className={`${active ? "bg-emerald-100" : ""} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                              >
                                <MapPinIcon className="w-4 h-4 mr-2 text-emerald-400" />
                                <span>{loc.name}</span>
                                <span className="ml-auto text-xs text-gray-500">Rs. {loc.rate}</span>
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="p-4 border-b">
                  <Menu as="div" className="w-full">
                    <Menu.Button className="flex items-center justify-between w-full px-3 py-2 bg-emerald-400 text-white rounded-lg shadow font-bold">
                      <Bars3Icon className="w-5 h-5" />
                      <span>ALL CATEGORIES</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute left-4 mt-2 w-72 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        {CATEGORIES.map((cat) => (
                          <Menu.Item key={cat}>
                            {({ active }) => (
                              <a
                                href="#"
                                className={`${active ? "bg-emerald-100" : ""} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                              >
                                {cat}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="p-4 flex-1 overflow-y-auto">
                  <div className="text-xs text-gray-400 mb-2">Site Navigation</div>
                  <nav className="flex flex-col gap-2">
                    {NAV_LINKS.map((link) => (
                      <Link 
                        key={link.label} 
                        href={link.href} 
                        className={getLinkClasses(link.href, true)}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="p-4 border-t">
                  <Menu as="div" className="w-full mb-2">
                    <Menu.Button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-emerald-50 transition font-semibold text-emerald-900 focus:outline-none">
                      <GlobeAltIcon className="w-4 h-4" />
                      {selectedLanguage.label}
                      <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute left-4 mt-2 w-72 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        {LANGUAGES.map((lang) => (
                          <Menu.Item key={lang.code}>
                            {({ active }) => (
                              <button
                                onClick={() => { setSelectedLanguage(lang); setSidebarOpen(false); }}
                                className={`${active ? "bg-emerald-100" : ""} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                              >
                                {lang.label}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Menu as="div" className="w-full">
                    <Menu.Button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-emerald-50 transition font-semibold text-emerald-900 focus:outline-none">
                      <CurrencyDollarIcon className="w-4 h-4" />
                      {selectedCurrency.label}
                      <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute left-4 mt-2 w-72 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        {CURRENCIES.map((cur) => (
                          <Menu.Item key={cur.code}>
                            {({ active }) => (
                              <button
                                onClick={() => { setSelectedCurrency(cur); setSidebarOpen(false); }}
                                className={`${active ? "bg-emerald-100" : ""} group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                              >
                                {cur.label}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="text-xs text-gray-400 text-center p-2 border-t">Copyright 2025 © Bacola WordPress Theme. All rights reserved. Powered by KlbTheme.</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  // Cart slider content
  const cartSlider = (
    <Transition show={cartOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setCartOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-60"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-60"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={React.Fragment}
              enter="transition-transform duration-300 ease-in-out"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform duration-200 ease-in"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
                {/* Cart Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                  <div className="flex items-center gap-3">
                    <ShoppingBagIcon className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <span className="bg-white text-emerald-600 text-xs px-2 py-1 rounded-full font-bold">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setCartOpen(false)} 
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <ShoppingBagIcon className="w-16 h-16 mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                      <p className="text-sm text-center mb-6">Add some products to get started!</p>
                      <button
                        onClick={() => setCartOpen(false)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border">
                          <div className="w-16 h-16 relative flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.name}</h4>
                            <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-emerald-600 font-bold">PKR {item.price}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <MinusIcon className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                                >
                                  <PlusIcon className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-emerald-500 hover:text-emerald-700 transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Summary */}
                {cartItems.length > 0 && (
                  <div className="border-t bg-gray-50 p-6 space-y-4">
                    {/* Coupon Section */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Apply Coupon</h4>
                      {!couponApplied ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                          />
                          <button
                            onClick={applyCoupon}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div>
                            <p className="text-sm font-semibold text-green-800">Coupon Applied!</p>
                            <p className="text-xs text-green-600">Discount: PKR {couponDiscount.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={clearCoupon}
                            className="text-green-600 hover:text-green-800 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">Try: SAVE10 (10% off), SAVE20 (20% off), or HAMZA30 (30% off)</p>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal ({totalItems} items):</span>
                        <span className="font-semibold">PKR {subtotal.toFixed(2)}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Discount:</span>
                          <span className="font-semibold text-green-600">-PKR {couponDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total:</span>
                          <span>PKR {total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link
                        href="/checkout"
                        onClick={() => setCartOpen(false)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold text-center transition-colors block"
                      >
                        Proceed to Checkout
                      </Link>
                      <button
                        onClick={() => setCartOpen(false)}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  // Mobile header
  const mobileHeader = (
    <>
      {/* Main mobile header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-emerald-100 to-white shadow-sm md:hidden">
        {/* Hamburger */}
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-full hover:bg-emerald-50 transition">
          <Bars3Icon className="w-7 h-7 text-emerald-700" />
        </button>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M12 2C7 7 2 12 12 22C22 12 17 7 12 2Z" fill="#2dc870" stroke="#1d9c54" strokeWidth="2"/></svg>
          </div>
        </div>
        {/* Cart */}
        <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-emerald-50 transition">
          <ShoppingBagIcon className="w-7 h-7 text-emerald-700" />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
      {/* Compact search bar below header */}
      <div className="px-3 py-2 bg-white shadow-sm md:hidden flex items-center">
        <form className="flex items-center w-full bg-emerald-50 border border-emerald-200 rounded-xl overflow-hidden">
          <input className="flex-1 px-3 py-2 bg-transparent outline-none text-emerald-800 placeholder-emerald-400 text-sm" placeholder="Search organic products..." />
          <button type="submit" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-3 py-2 flex items-center">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </>
  );

  return (
    <header className="w-full bg-gradient-to-b from-emerald-50 via-emerald-100 to-white shadow-xl border-b sticky top-0 z-50 transition-all duration-300">
      {/* Top Info Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-emerald-50 text-xs py-2 px-2 md:px-8 hidden md:flex items-center justify-between relative overflow-hidden">
        {/* Organic SVG leaf background */}
        <svg className="absolute left-0 top-0 h-full w-32 opacity-10" viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="50" ry="50" fill="#2dc870" /></svg>
        <div className="flex flex-wrap gap-4 items-center relative z-10">
          <a href="#" className="hover:underline hover:text-emerald-200 transition-colors duration-200">About Us</a>
          <a href="#" className="hover:underline hover:text-emerald-200 transition-colors duration-200">My Account</a>
          <a href="#" className="hover:underline hover:text-emerald-200 transition-colors duration-200 flex items-center gap-1"><HeartIcon className="w-4 h-4 inline animate-pulse" />Wishlist</a>
          <a href="#" className="hover:underline hover:text-emerald-200 transition-colors duration-200">Order Tracking</a>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 whitespace-nowrap w-full justify-center pointer-events-none select-none z-10">
          <ShieldCheckIcon className="w-4 h-4 text-emerald-200 animate-bounce" />
          <span className="font-medium">100% Secure delivery without contacting the courier</span>
        </div>
        <div className="flex flex-wrap gap-4 items-center relative z-10">
          <span>Need help? <span className="text-emerald-200 font-bold hover:text-white transition-colors duration-200">+ 0020 500</span></span>
        </div>
      </div>
      {/* Main Header */}
      <div className="container mx-auto hidden md:flex flex-col md:flex-row items-center justify-between py-4 px-4 gap-4 bg-gradient-to-r from-emerald-100 to-white rounded-b-2xl shadow-md">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3 min-w-max group">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            {/* Organic leaf SVG */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none"><path d="M12 2C7 7 2 12 12 22C22 12 17 7 12 2Z" fill="#2dc870" stroke="#1d9c54" strokeWidth="2"/></svg>
          </div>
          <span className="font-extrabold text-3xl text-emerald-900 tracking-tight group-hover:text-emerald-700 transition-colors duration-300">hamza</span>
          <span className="text-xs text-emerald-700 ml-2 font-medium group-hover:text-emerald-900 transition-colors duration-300">Organic Grocery Shopping</span>
        </div>
        {/* Location Selector */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Menu as="div" className="relative inline-block text-left w-full max-w-xs">
            <Menu.Button className="flex items-center gap-2 px-4 py-2 w-full bg-white border-2 border-emerald-200 rounded-xl shadow-sm hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 font-semibold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 group">
              <MapPinIcon className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
              <span>{selectedLocation.name}</span>
              <span className="text-xs text-emerald-500">(Delivery: Rs. {selectedLocation.rate})</span>
              <ChevronDownIcon className="w-4 h-4 text-emerald-400 group-hover:rotate-180 transition-transform duration-300" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute left-0 mt-2 w-full origin-top-left bg-white divide-y divide-emerald-100 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-emerald-100">
                {LOCATIONS.map((loc) => (
                  <Menu.Item key={loc.name}>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedLocation(loc)}
                        className={`${active ? "bg-emerald-100" : ""} group flex w-full items-center px-4 py-3 text-sm text-emerald-700 hover:bg-emerald-50 transition-all duration-200 rounded-lg mx-2 my-1`}
                      >
                        <MapPinIcon className="w-4 h-4 mr-2 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">{loc.name}</span>
                        <span className="ml-auto text-xs text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">Rs. {loc.rate}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <form className="w-full max-w-lg flex items-center bg-white border-2 border-emerald-200 rounded-xl shadow-sm overflow-hidden hover:border-emerald-300 focus-within:border-emerald-500 focus-within:shadow-lg transition-all duration-300 group">
            <input className="flex-1 px-4 py-3 bg-transparent outline-none text-emerald-800 placeholder-emerald-400 font-medium" placeholder="Search for organic products, brands and more..." />
            <button type="submit" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 text-white px-4 py-3 flex items-center gap-1 font-semibold group-hover:shadow-lg">
              <MagnifyingGlassIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>
        </div>
        {/* User, Cart */}
        <div className="flex items-center gap-4 min-w-max">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 group">
            <UserCircleIcon className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform duration-300" />
          </button>
          <span className="text-emerald-700 font-bold text-lg group-hover:text-emerald-600 transition-colors duration-300">PKR {total.toFixed(2)}</span>
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-full border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 group"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBagIcon className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform duration-300" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Navigation Bar */}
      <nav className="w-full bg-gradient-to-r from-emerald-50 to-emerald-100 border-t border-b border-emerald-200 py-1 shadow-sm hidden md:flex">
        <div className="container mx-auto flex justify-center items-center gap-6 px-4">
          {/* Categories Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-1.5 rounded-xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl transition-all duration-300 font-bold text-base focus:outline-none group">
              <Bars3Icon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>ALL CATEGORIES</span>
              <span className="text-xs bg-emerald-900 px-2 py-0.5 rounded-full ml-2 group-hover:bg-emerald-800 transition-colors duration-300">TOTAL 63 PRODUCTS</span>
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white divide-y divide-emerald-100 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-emerald-100">
                {CATEGORIES.map((cat) => (
                  <Menu.Item key={cat}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active ? "bg-emerald-100" : ""} group flex w-full items-center px-4 py-3 text-sm text-emerald-700 hover:bg-emerald-50 transition-all duration-200 rounded-lg mx-2 my-1`}
                      >
                        {cat}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="flex gap-2 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center w-full">
            <Link href="/" className={getLinkClasses("/") + " beautify-nav-link compact-nav-link text-emerald-900"}>HOME</Link>
            <Link href="/shop" className={getLinkClasses("/shop") + " beautify-nav-link compact-nav-link text-emerald-900"}>SHOP</Link>
            <Link href="/blog" className={getLinkClasses("/blog") + " beautify-nav-link compact-nav-link text-emerald-900"}>BLOG</Link>
            <Link href="/contact" className={getLinkClasses("/contact") + " beautify-nav-link compact-nav-link text-emerald-900"}>CONTACT</Link>
          </div>
        </div>
      </nav>
      {/* Cart Slider, Mobile Header, etc. remain unchanged */}
      {sidebarOpen && mobileSidebar}
      {cartSlider}
      {mobileHeader}
    </header>
  );
};

export default Header; 