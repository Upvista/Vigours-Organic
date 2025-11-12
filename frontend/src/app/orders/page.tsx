"use client";
import { useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  ArrowPathIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface Order {
  id: string;
  order_number: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  shipping_address: string;
  shipping_city: string;
  total: number;
  payment_method: string;
  order_status: string;
  created_at: string;
  order_items: Array<{
    id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    unit_price: number;
  }>;
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', icon: ClockIcon, color: 'text-yellow-600 bg-yellow-50' },
  { value: 'processing', label: 'Processing', icon: ArrowPathIcon, color: 'text-blue-600 bg-blue-50' },
  { value: 'shipped', label: 'Shipped', icon: TruckIcon, color: 'text-purple-600 bg-purple-50' },
  { value: 'delivered', label: 'Delivered', icon: CheckCircleIcon, color: 'text-green-600 bg-green-50' },
  { value: 'cancelled', label: 'Cancelled', icon: XCircleIcon, color: 'text-red-600 bg-red-50' },
];

export default function OrderTracking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // Search by order number (you can also add email search)
      const response = await fetch(`/api/orders/${searchQuery.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Order not found. Please check your order number.");
        } else {
          setError("Failed to fetch order. Please try again.");
        }
        return;
      }

      const data = await response.json();
      setOrder(data.order);
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = order ? ORDER_STATUSES.find(s => s.value === order.order_status) : null;
  const StatusIcon = statusInfo?.icon || ClockIcon;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Track Your Order</h1>
          <p className="text-lg text-gray-600">
            Enter your order number to check the status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={searchOrder} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Order Number
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  id="orderNumber"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., VO12345678901"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                You can find your order number in the confirmation email
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order #{order.order_number}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-PK', { dateStyle: 'full' })}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo?.color}`}>
                  {StatusIcon && <StatusIcon className="w-6 h-6" />}
                  <span className="font-bold text-lg">{statusInfo?.label}</span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="relative py-6">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {ORDER_STATUSES.slice(0, 4).map((status, index) => {
                  const isCompleted = ORDER_STATUSES.findIndex(s => s.value === order.order_status) >= index;
                  const Icon = status.icon;
                  
                  return (
                    <div key={status.value} className="relative flex items-center gap-4 mb-6 last:mb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        isCompleted ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}>
                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <div className={`font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                          {status.label}
                        </div>
                        {isCompleted && order.order_status === status.value && (
                          <div className="text-sm text-gray-600">Current Status</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Customer</div>
                  <div className="font-semibold">{order.customer_first_name} {order.customer_last_name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{order.customer_email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Shipping Address</div>
                  <div className="font-semibold">
                    {order.shipping_address}<br />
                    {order.shipping_city}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Payment Method</div>
                  <div className="font-semibold capitalize">{order.payment_method}</div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.product_name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">
                        PKR {(item.unit_price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        PKR {item.unit_price} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    PKR {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
              <ShoppingBagIcon className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                Contact us for any questions about your order
              </p>
              <div className="space-y-1">
                <p className="font-semibold">Email: {process.env.NEXT_PUBLIC_STORE_EMAIL || 'vigoursorganic@gmail.com'}</p>
                <p className="font-semibold">Phone: {process.env.NEXT_PUBLIC_STORE_PHONE || '03334286566'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

