"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingBagIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface Order {
  id: string;
  order_number: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  subtotal: number;
  shipping_fee: number;
  discount: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes: string | null;
  created_at: string;
  order_items: Array<{
    id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', icon: ClockIcon, color: 'text-yellow-600 bg-yellow-50' },
  { value: 'processing', label: 'Processing', icon: ArrowPathIcon, color: 'text-blue-600 bg-blue-50' },
  { value: 'shipped', label: 'Shipped', icon: TruckIcon, color: 'text-purple-600 bg-purple-50' },
  { value: 'delivered', label: 'Delivered', icon: CheckCircleIcon, color: 'text-green-600 bg-green-50' },
  { value: 'cancelled', label: 'Cancelled', icon: XCircleIcon, color: 'text-red-600 bg-red-50' },
];

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
      return;
    }

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const auth = sessionStorage.getItem('adminAuth');
      
      const response = await fetch('/api/orders?limit=100', {
        headers: {
          'Authorization': `Bearer ${auth}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const auth = sessionStorage.getItem('adminAuth');
      
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth}`
        },
        body: JSON.stringify({ order_status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update order');

      await fetchOrders();
      if (selectedOrder?.id === orderId) {
        const updatedOrder = orders.find(o => o.id === orderId);
        if (updatedOrder) setSelectedOrder({ ...updatedOrder, order_status: newStatus });
      }
      
      alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.order_status === filterStatus;
    const matchesSearch = !searchQuery || 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${order.customer_first_name} ${order.customer_last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.order_status === 'pending').length,
    processing: orders.filter(o => o.order_status === 'processing').length,
    shipped: orders.filter(o => o.order_status === 'shipped').length,
    delivered: orders.filter(o => o.order_status === 'delivered').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ArrowPathIcon className="w-12 h-12 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBagIcon className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Vigours Organic</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Processing</div>
            <div className="text-3xl font-bold text-blue-600">{stats.processing}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Shipped</div>
            <div className="text-3xl font-bold text-purple-600">{stats.shipped}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Delivered</div>
            <div className="text-3xl font-bold text-green-600">{stats.delivered}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order number, email, or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Orders</option>
              {ORDER_STATUSES.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Refresh
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Orders ({filteredOrders.length})
            </h2>
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                No orders found
              </div>
            ) : (
              filteredOrders.map(order => {
                const statusInfo = ORDER_STATUSES.find(s => s.value === order.order_status);
                const StatusIcon = statusInfo?.icon || ClockIcon;
                
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedOrder?.id === order.id ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-lg text-gray-900">
                          #{order.order_number}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString('en-PK', {
                            dateStyle: 'medium'
                          })}
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo?.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-semibold">{statusInfo?.label}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>{order.customer_first_name} {order.customer_last_name}</strong>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {order.customer_email} • {order.customer_phone}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-sm text-gray-600">
                        {order.order_items.length} items
                      </div>
                      <div className="text-lg font-bold text-emerald-600">
                        PKR {order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Details */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {selectedOrder ? (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Order Details
                </h2>

                <div className="space-y-4">
                  {/* Order Info */}
                  <div>
                    <div className="text-sm text-gray-600">Order Number</div>
                    <div className="font-semibold">#{selectedOrder.order_number}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Order Date</div>
                    <div className="font-semibold">
                      {new Date(selectedOrder.created_at).toLocaleString('en-PK')}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">Customer</div>
                    <div>{selectedOrder.customer_first_name} {selectedOrder.customer_last_name}</div>
                    <div className="text-sm text-gray-600">{selectedOrder.customer_email}</div>
                    <div className="text-sm text-gray-600">{selectedOrder.customer_phone}</div>
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">Shipping Address</div>
                    <div className="text-sm">
                      {selectedOrder.shipping_address}<br />
                      {selectedOrder.shipping_city}, {selectedOrder.shipping_postal_code}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">Items</div>
                    <div className="space-y-2">
                      {selectedOrder.order_items.map(item => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="w-12 h-12 relative flex-shrink-0">
                            <Image
                              src={item.product_image}
                              alt={item.product_name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm">{item.product_name}</div>
                            <div className="text-xs text-gray-600">
                              Qty: {item.quantity} × PKR {item.unit_price}
                            </div>
                          </div>
                          <div className="font-semibold">
                            PKR {item.total_price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Subtotal:</span>
                      <span>PKR {selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Shipping:</span>
                      <span>PKR {selectedOrder.shipping_fee.toFixed(2)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-sm mb-1 text-green-600">
                        <span>Discount:</span>
                        <span>-PKR {selectedOrder.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-emerald-600">PKR {selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-600">Payment Method</div>
                    <div className="font-semibold capitalize">{selectedOrder.payment_method}</div>
                  </div>

                  {/* Update Status */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-bold text-gray-700 mb-2">Update Status</div>
                    <div className="grid grid-cols-2 gap-2">
                      {ORDER_STATUSES.map(status => {
                        const StatusIcon = status.icon;
                        return (
                          <button
                            key={status.value}
                            onClick={() => updateOrderStatus(selectedOrder.id, status.value)}
                            disabled={selectedOrder.order_status === status.value}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                              selectedOrder.order_status === status.value
                                ? status.color + ' cursor-not-allowed opacity-50'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {status.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                Select an order to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

