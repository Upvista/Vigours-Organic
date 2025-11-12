"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MapPinIcon,
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  LockClosedIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  category: string;
}

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery", icon: <TruckIcon className="w-6 h-6 text-emerald-600" /> },
  { value: "jazzcash", label: "JazzCash", icon: <DevicePhoneMobileIcon className="w-6 h-6 text-pink-500" /> },
  { value: "easypaisa", label: "EasyPaisa", icon: <DevicePhoneMobileIcon className="w-6 h-6 text-green-500" /> },
  { value: "nayapay", label: "NayaPay", icon: <BanknotesIcon className="w-6 h-6 text-yellow-500" /> },
  { value: "card", label: "Credit/Debit Card", icon: <CreditCardIcon className="w-6 h-6 text-emerald-700" /> },
];

const emeraldGradient = "bg-gradient-to-br from-emerald-600 via-emerald-400 to-emerald-200";

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });
  const [couponDiscount, setCouponDiscount] = useState(0);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    const savedDiscount = localStorage.getItem("couponDiscount");
    if (savedDiscount) setCouponDiscount(parseFloat(savedDiscount));
    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) {
      setFormData((prev) => ({ ...prev, ...JSON.parse(savedAddress) }));
      setAddressSaved(true);
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 200;
  const total = subtotal + shipping - couponDiscount;

  // Save address for returning users
  const saveAddress = () => {
    localStorage.setItem("shippingAddress", JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
    }));
    setAddressSaved(true);
  };

  // Stepper UI
  const steps = [
    "Shipping Address",
    "Payment Method",
    "Confirm & Review",
    "Order Placed"
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Place order logic
  const placeOrder = async () => {
    setLoading(true);
    
    try {
      // Prepare order data
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        subtotal,
        shipping,
        discount: couponDiscount,
        total,
      };

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to place order');
      }

      const result = await response.json();
      
      // Clear cart and proceed to success
      localStorage.removeItem("cart");
      localStorage.removeItem("couponDiscount");
      
      // Store order number for display
      sessionStorage.setItem('lastOrderNumber', result.orderNumber);
      
      setStep(4);
    } catch (error: any) {
      console.error('Order placement error:', error);
      alert(error.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Confetti animation for order placed
  useEffect(() => {
    if (step === 4) {
      // Simple DOM confetti
      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'fixed z-50 w-2 h-2 rounded-full pointer-events-none';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.top = '-10px';
          confetti.style.backgroundColor = [
            '#059669', '#047857', '#10b981', '#34d399', '#f59e42', '#fbbf24', '#f87171', '#6366f1', '#f472b6'
          ][Math.floor(Math.random() * 9)];
          confetti.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
          document.body.appendChild(confetti);
          setTimeout(() => {
            if (document.body.contains(confetti)) document.body.removeChild(confetti);
          }, 4000);
        }, i * 30);
      }
    }
  }, [step]);

  // Print invoice handler
  const handlePrint = () => {
    if (!invoiceRef.current) return;
    const printContents = invoiceRef.current.innerHTML;
    const win = window.open('', '', 'width=900,height=700');
    if (!win) return;
    win.document.write(`
      <html><head><title>Order Invoice</title>
      <style>
        body { font-family: sans-serif; color: #222; background: #fff; }
        .invoice-container { max-width: 700px; margin: 0 auto; padding: 32px; border-radius: 16px; border: 1px solid #e5e7eb; }
        h2 { color: #059669; }
        .section { margin-bottom: 24px; }
        .section-title { font-weight: bold; color: #047857; margin-bottom: 8px; }
        .details-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        .details-table th, .details-table td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
        .details-table th { background: #f0fdf4; }
        .total { font-weight: bold; color: #059669; }
        .store-info { color: #047857; font-size: 14px; margin-top: 24px; }
      </style>
      </head><body><div class="invoice-container">${printContents}</div></body></html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  // Payment method details
  const paymentDetails = {
    cod: <div className="text-emerald-800 text-sm mt-2">Pay with cash when your order is delivered to your address.</div>,
    jazzcash: <div className="text-emerald-800 text-sm mt-2">JazzCash Account: <b>0300-1234567</b><br/>You will receive a payment request on your mobile after order confirmation.</div>,
    easypaisa: <div className="text-emerald-800 text-sm mt-2">EasyPaisa Account: <b>0311-7654321</b><br/>You will receive a payment request on your mobile after order confirmation.</div>,
    nayapay: <div className="text-emerald-800 text-sm mt-2">NayaPay ID: <b>vigoursorganic@naya.pk</b><br/>You will receive a payment request after order confirmation.</div>,
    card: <div className="text-emerald-800 text-sm mt-2">Pay securely with your credit or debit card. Your information is encrypted and secure.</div>,
  };

  // If cart is empty
  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before checkout.</p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mb-2 transition-all duration-300
                ${step === idx + 1 ? emeraldGradient + " text-white shadow-lg scale-110" : "bg-emerald-100 text-emerald-600"}
                ${step > idx + 1 ? "ring-4 ring-emerald-300" : ""}`}>{idx + 1}</div>
              <span className={`text-xs font-semibold ${step === idx + 1 ? "text-emerald-700" : "text-emerald-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Shipping Address */}
        {step === 1 && (
          <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-extrabold text-emerald-700 mb-4 flex items-center gap-2"><MapPinIcon className="w-7 h-7 text-emerald-500" /> Shipping Address</h2>
            {addressSaved ? (
              <div className="mb-6 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <div className="mb-2 text-emerald-700 font-semibold">Welcome back! Please confirm your shipping info:</div>
                <div className="mb-2">{formData.firstName} {formData.lastName}, {formData.email}, {formData.phone}</div>
                <div className="mb-2">{formData.address}, {formData.city}, {formData.postalCode}</div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(2)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">Looks Good!</button>
                  <button onClick={() => setAddressSaved(false)} className="bg-emerald-100 text-emerald-700 font-bold px-6 py-3 rounded-xl shadow border border-emerald-200 transition-all">Edit</button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); saveAddress(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="First Name" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="Last Name" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                  <input name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Phone" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                </div>
                <textarea name="address" value={formData.address} onChange={handleInputChange} required placeholder="Delivery Address" rows={2} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900 resize-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="city" value={formData.city} onChange={handleInputChange} required placeholder="City" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                  <input name="postalCode" value={formData.postalCode} onChange={handleInputChange} required placeholder="Postal Code" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                </div>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-lg w-full">Continue to Payment</button>
              </form>
            )}
          </section>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-extrabold text-emerald-800 mb-4 flex items-center gap-2"><CreditCardIcon className="w-7 h-7 text-emerald-500" /> Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {PAYMENT_METHODS.map((pm) => (
                <label key={pm.value} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 shadow-sm
                  ${formData.paymentMethod === pm.value ? "border-emerald-500 bg-emerald-50" : "border-emerald-100 bg-white hover:bg-emerald-50"}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={pm.value}
                    checked={formData.paymentMethod === pm.value}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600"
                  />
                  {pm.icon}
                  <span className="font-semibold text-gray-900">{pm.label}</span>
                </label>
              ))}
            </div>
            {/* Payment method details */}
            {paymentDetails[formData.paymentMethod as keyof typeof paymentDetails]}
            {/* Card fields if needed */}
            {formData.paymentMethod === "card" && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Card Number" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                  <input placeholder="Expiry (MM/YY)" className="px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900" />
                </div>
                <input placeholder="CVV" className="mt-4 px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900 w-1/2" />
              </div>
            )}
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="bg-emerald-100 text-emerald-800 font-bold px-6 py-3 rounded-xl shadow border border-emerald-200 transition-all">Back</button>
              <button onClick={() => setStep(3)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-lg flex-1">Review & Confirm</button>
            </div>
          </section>
        )}

        {/* Step 3: Confirm & Review */}
        {step === 3 && (
          <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in-up">
            <h2 className="text-2xl font-extrabold text-emerald-700 mb-4 flex items-center gap-2"><CheckCircleIcon className="w-7 h-7 text-emerald-500" /> Confirm Your Order</h2>
            <div className="mb-6">
              <div className="font-semibold text-emerald-700 mb-2">Shipping Address</div>
              <div className="mb-2">{formData.firstName} {formData.lastName}, {formData.email}, {formData.phone}</div>
              <div className="mb-2">{formData.address}, {formData.city}, {formData.postalCode}</div>
            </div>
            <div className="mb-6">
              <div className="font-semibold text-emerald-700 mb-2">Payment Method</div>
              <div className="mb-2 capitalize">{PAYMENT_METHODS.find(pm => pm.value === formData.paymentMethod)?.label}</div>
            </div>
            <div className="mb-6">
              <div className="font-semibold text-emerald-700 mb-2">Order Items</div>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-emerald-600 font-bold">PKR {item.price}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <div className="font-semibold text-emerald-700 mb-2">Order Total</div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">PKR {shipping.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Coupon Discount:</span>
                    <span className="font-semibold text-green-600">-PKR {couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
                  <span>Total:</span>
                  <span>PKR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(2)} className="bg-emerald-100 text-emerald-700 font-bold px-6 py-3 rounded-xl shadow border border-emerald-200 transition-all">Back</button>
              <button onClick={placeOrder} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-lg flex-1 flex items-center justify-center gap-2">
                {loading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <LockClosedIcon className="w-5 h-5" />}
                {loading ? "Placing Order..." : `Place Order - PKR ${total.toFixed(2)}`}
              </button>
            </div>
          </section>
        )}

        {/* Step 4: Order Placed */}
        {step === 4 && (
          <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col items-center animate-fade-in-up relative">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6 animate-bounceIn">
              <CheckCircleIcon className="w-16 h-16 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-emerald-800 mb-2">Thank You for Your Order!</h2>
            <p className="text-lg text-gray-800 mb-6 text-center max-w-xl">Your order has been placed successfully. We&#39;re preparing your items and will send you a confirmation soon. You can track your order status from your account.</p>
            {/* Print Invoice Button */}
            <button onClick={handlePrint} className="bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-lg flex items-center gap-2 mb-4">Print Invoice</button>
            {/* Printable Invoice (hidden by default) */}
            <div ref={invoiceRef} style={{ display: 'none' }}>
              <h2>Order Invoice</h2>
              <div className="section">
                <div className="section-title">Order Details</div>
                <table className="details-table">
                  <thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}><td>{item.name}</td><td>{item.quantity}</td><td>PKR {item.price}</td></tr>
                    ))}
                  </tbody>
                </table>
                <div className="total">Total: PKR {total.toFixed(2)}</div>
              </div>
              <div className="section">
                <div className="section-title">Shipping Address</div>
                <div>{formData.firstName} {formData.lastName}</div>
                <div>{formData.address}, {formData.city}, {formData.postalCode}</div>
                <div>{formData.email}, {formData.phone}</div>
              </div>
              <div className="section">
                <div className="section-title">Payment Method</div>
                <div>{PAYMENT_METHODS.find(pm => pm.value === formData.paymentMethod)?.label}</div>
                {paymentDetails[formData.paymentMethod as keyof typeof paymentDetails]}
              </div>
              <div className="section store-info">
                <div className="section-title">Store Details</div>
                <div>Vigours Organic Store</div>
                <div>123 Organic Street, DHA, Lahore, Pakistan</div>
                <div>vigoursorganic@gmail.com | +92 300 1234567</div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={() => router.push("/")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-lg flex items-center gap-2"><HomeIcon className="w-5 h-5" /> Go to Home</button>
              <button onClick={() => router.push("/orders")} className="bg-emerald-100 text-emerald-800 font-bold px-8 py-3 rounded-xl shadow border border-emerald-200 transition-all text-lg flex items-center gap-2"><TruckIcon className="w-5 h-5" /> Track Order</button>
            </div>
            {/* Confetti animation is handled by useEffect above */}
          </section>
        )}
      </div>
      {/* Add confetti animation keyframes */}
      <style jsx global>{`
      @keyframes fall {
        to {
          transform: translateY(110vh) rotate(720deg);
          opacity: 0.7;
        }
      }
      `}</style>
    </main>
  );
} 