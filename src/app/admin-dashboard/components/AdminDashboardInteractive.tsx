"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import MetricCard from './MetricCard';
import RecentOrderCard from './RecentOrderCard';
import InventoryHeatmapItem from './InventoryHeatmapItem';







// Remove mock data - will fetch from Supabase
interface Product {
  id: string;
  name: string;
  stock_quantity: number;
  status: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  activeProducts: number;
  lowStockCount: number;
  todayRevenue: number;
  todayOrders: number;
}

export default function AdminDashboardInteractive() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotification, setShowNotification] = useState(false);
  
  // Real data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    totalOrders: 0,
    activeProducts: 0,
    lowStockCount: 0,
    todayRevenue: 0,
    todayOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, stock_quantity, status")
        .order("stock_quantity", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, customer_name, total_amount, status, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setOrders(data || []);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError(err.message);
    }
  };

  // Calculate metrics
  const calculateMetrics = async () => {
    try {
      // Get all orders for total calculations
      const { data: allOrders, error: ordersError } = await supabase
        .from("orders")
        .select("total_amount, created_at, status");

      if (ordersError) throw ordersError;

      // Get products for stock calculations
      const { data: allProducts, error: productsError } = await supabase
        .from("products")
        .select("status, stock_quantity");

      if (productsError) throw productsError;

      // Calculate totals
      const totalRevenue = allOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const totalOrders = allOrders?.length || 0;
      const activeProducts = allProducts?.filter(p => p.status === "active").length || 0;
      const lowStockCount = allProducts?.filter(p => p.stock_quantity < 20).length || 0;

      // Calculate today's metrics
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayOrders = allOrders?.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= today;
      }) || [];

      const todayRevenue = todayOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      const todayOrdersCount = todayOrders.length;

      setMetrics({
        totalRevenue,
        totalOrders,
        activeProducts,
        lowStockCount,
        todayRevenue,
        todayOrders: todayOrdersCount,
      });
    } catch (err: any) {
      console.error("Error calculating metrics:", err);
      setError(err.message);
    }
  };

  // Load all data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchOrders(), calculateMetrics()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Handle status change for orders
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
      // Recalculate metrics after status change
      await calculateMetrics();
    } catch (err: any) {
      console.error("Error updating order status:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Order status updated successfully!
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Panel de Control</h1>
            <p className="text-text-secondary">Gestiona tu minimarket en tiempo real</p>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value={`$${metrics.totalRevenue.toFixed(2)}`}
                change={`$${metrics.todayRevenue.toFixed(2)} today`}
                trend="up"
                icon="💰"
              />
              <MetricCard
                title="Total Orders"
                value={metrics.totalOrders.toString()}
                change={`${metrics.todayOrders} today`}
                trend="up"
                icon="📦"
              />
              <MetricCard
                title="Active Products"
                value={metrics.activeProducts.toString()}
                change={`${metrics.lowStockCount} low stock`}
                trend="neutral"
                icon="📊"
              />
              <MetricCard
                title="Low Stock Items"
                value={metrics.lowStockCount.toString()}
                change="Need attention"
                trend="down"
                icon="⚠️"
              />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <RecentOrderCard
                    key={order.id}
                    orderNumber={order.order_number}
                    customerName={order.customer_name}
                    amount={order.total_amount}
                    status={order.status}
                    onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                  />
                ))}
              </div>
            </div>

            {/* Inventory Heatmap */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Inventory Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.map((product) => (
                  <InventoryHeatmapItem
                    key={product.id}
                    productName={product.name}
                    stock={product.stock_quantity}
                    status={product.status}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}