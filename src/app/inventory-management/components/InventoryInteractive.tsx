"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";



import StatsCards from './StatsCards';
import ProductTable from './ProductTable';
import ProductCard from './ProductCard';
import ProductEditorModal from './ProductEditorModal';


interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  stock_quantity: number;
  category_id: string | null;
  image_url: string | null;
  status: string;
  sku: string | null;
  created_at: string;
}

// Add transformed product interface for display
interface DisplayProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low_stock' | 'out_of_stock';
  image: string;
  alt: string;
  lastUpdated: string;
}

interface Category {
  id: string;
  name: string;
}

export default function InventoryInteractive() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Real data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    }
  };

  // Transform products for display with alt text
  const transformProductsForDisplay = (products: Product[], categories: Category[]): DisplayProduct[] => {
    return products.map((product) => {
      const category = categories.find((cat) => cat.id === product.category_id);
      const status = product.stock_quantity === 0 
        ? 'out_of_stock' 
        : product.stock_quantity < 20 
        ? 'low_stock' :'available';
      
      return {
        id: product.id,
        name: product.name,
        category: category?.name || 'Uncategorized',
        price: product.price,
        stock: product.stock_quantity,
        status,
        image: product.image_url || '/assets/images/no_image.png',
        alt: `${product.name} product image`,
        lastUpdated: new Date(product.created_at).toLocaleDateString('es-CO'),
      };
    });
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter and transform products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesCategory = selectedCategory === "all" || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayProducts = transformProductsForDisplay(filteredProducts, categories);

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    lowStock: products.filter((p) => p.stock_quantity < 20).length,
    outOfStock: products.filter((p) => p.stock_quantity === 0).length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0),
  };

  // Handle product save
  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (selectedProduct) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", selectedProduct.id);

        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase
          .from("products")
          .insert([productData]);

        if (error) throw error;
      }

      await fetchProducts();
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (err: any) {
      console.error("Error saving product:", err);
      setError(err.message);
    }
  };

  // Handle product delete
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;
      await fetchProducts();
    } catch (err: any) {
      console.error("Error deleting product:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Inventory</h3>
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Manage your products and stock levels
          </p>
        </div>

        {/* Stats */}
        <StatsCards
          totalProducts={stats.totalProducts}
          lowStock={stats.lowStock}
          outOfStock={stats.outOfStock}
          totalValue={stats.totalValue}
        />

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Product
              </button>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => {
                  const originalProduct = products.find(p => p.id === product.id);
                  if (originalProduct) {
                    setSelectedProduct(originalProduct);
                    setIsModalOpen(true);
                  }
                }}
                onDelete={() => handleDeleteProduct(product.id)}
                onToggleStatus={(productId) => {
                  // Toggle status implementation
                  console.log('Toggle status for:', productId);
                }}
              />
            ))}
          </div>
        ) : (
          <ProductTable
            products={displayProducts}
            onEdit={(product) => {
              const originalProduct = products.find(p => p.id === product.id);
              if (originalProduct) {
                setSelectedProduct(originalProduct);
                setIsModalOpen(true);
              }
            }}
            onDelete={handleDeleteProduct}
          />
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setIsModalOpen(true);
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Your First Product
            </button>
          </div>
        )}

        {/* Product Editor Modal */}
        {isModalOpen && (
          <ProductEditorModal
            product={selectedProduct}
            categories={categories}
            onSave={handleSaveProduct}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}