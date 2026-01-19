'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import CustomerBottomNav from '@/components/common/CustomerBottomNav';
import FloatingCart from '@/components/common/FloatingCart';
import MarqueeSlider from './MarqueeSlider';
import HeroBanner from './HeroBanner';
import SearchBar from './SearchBar';
import CategoryCard from './CategoryCard';
import FrequentlyBoughtTogether from './FrequentlyBoughtTogether';
import { supabase } from '@/lib/supabase';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  alt: string;
  itemCount: number;
  route: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
  stock: number;
  category: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const HomeProductCatalogInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin mode toggle (for development - in production, this would check user role)
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    // Check if user has admin access (placeholder for auth check)
    const isAdmin = localStorage.getItem('user_role') === 'admin';
    setShowAdminButton(isAdmin);
    
    const savedCart = localStorage.getItem('minimarket_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }

    // Fetch categories and products from Supabase
    fetchCategoriesAndProducts();
  }, []);

  // Update filtered products when search query or products change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const fetchCategoriesAndProducts = async () => {
    try {
      setIsLoading(true);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch products with category names
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          image_url,
          description,
          stock_quantity,
          category_id,
          categories (name)
        `)
        .eq('status', 'active')
        .order('name');

      if (productsError) throw productsError;

      // Transform categories data
      const transformedCategories: Category[] = (categoriesData || []).map(cat => ({
        id: cat.id,
        name: cat.name,
        imageUrl: cat.image_url || '',
        alt: cat.description || `${cat.name} category`,
        itemCount: (productsData || []).filter((p: any) => p.category_id === cat.id).length,
        route: '/home-product-catalog'
      }));

      // Transform products data
      const transformedProducts: Product[] = (productsData || []).map((prod: any) => ({
        id: prod.id,
        name: prod.name,
        price: parseFloat(prod.price) || 0,
        imageUrl: prod.image_url || '',
        alt: prod.description || `${prod.name} product image`,
        stock: prod.stock_quantity || 0,
        category: prod.categories?.name || 'Unknown'
      }));

      setCategories(transformedCategories);
      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to empty arrays if there's an error
      setCategories([]);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const marqueeMessages = [
    '🎉 ¡Envío GRATIS en compras superiores a $50.000!',
    '⚡ Ofertas relámpago: 20% de descuento en frutas frescas',
    '🥖 Pan recién horneado todos los días a las 7:00 AM',
    '💳 Acepta Nequi, Daviplata y PSE - ¡Paga como prefieras!'
  ];

  const handleAddToCart = (productId: string) => {
    if (!isHydrated) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === productId);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { productId, quantity: 1 }];
      }

      localStorage.setItem('minimarket_cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Calculate cart totals - now always returns 0 during SSR
  const totalItems = isHydrated ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const totalAmount = isHydrated ? cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0) : 0;

  return (
    <div className="min-h-screen bg-background">
      <CustomerBottomNav cartItemCount={totalItems} />
      
      {/* Admin Access Button - Fixed Position */}
      {isHydrated && showAdminButton && (
        <Link
          href="/admin-settings"
          className="fixed bottom-24 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group"
          title="Panel de Administración"
        >
          <Cog6ToothIcon className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Admin Banner (visible only to admins) */}
        {isHydrated && showAdminButton && (
          <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Cog6ToothIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">Modo Administrador</h3>
                  <p className="text-sm text-muted-foreground">Personaliza tu tienda desde el panel admin</p>
                </div>
              </div>
              <Link
                href="/admin-settings"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/50"
              >
                Ir a Configuración
              </Link>
            </div>
          </div>
        )}

        <HeroBanner
          imageUrl="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="Interior moderno de minimarket colombiano con estantes organizados de productos frescos y clientes comprando"
          title="MiniMarket Delivery"
          subtitle="Productos frescos a tu puerta en 30 minutos"
        />

        <MarqueeSlider messages={marqueeMessages} speed={40} />

        <SearchBar onSearch={handleSearch} />

        {/* Show loading state */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div>
        ) : (
          <>
            {/* Show search results if searching */}
            {searchQuery.trim() !== '' && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Resultados de búsqueda
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredProducts.slice(0, 12).map((product) => (
                      <FrequentlyBoughtTogether
                        key={product.id}
                        products={[product]}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card rounded-xl p-12 text-center">
                    <p className="text-xl text-muted-foreground mb-2">
                      No se encontraron productos
                    </p>
                    <p className="text-muted-foreground">
                      Intenta con otros términos de búsqueda
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Show categories if not searching */}
            {searchQuery.trim() === '' && (
              <section>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Categorías
                </h2>
                {categories.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {categories.map((category) => (
                      <CategoryCard key={category.id} {...category} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No hay categorías disponibles
                  </p>
                )}
              </section>
            )}

            {/* Show products if not searching */}
            {searchQuery.trim() === '' && products.length > 0 && (
              <FrequentlyBoughtTogether
                products={products.slice(0, 8)}
                onAddToCart={handleAddToCart}
              />
            )}
          </>
        )}

        <section className="pb-8">
          <div className="bg-primary/5 rounded-xl p-6 text-center">
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-text-secondary mb-4">
              Contáctanos por WhatsApp para asistencia inmediata
            </p>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-success text-success-foreground px-6 py-3 rounded-lg font-medium hover:bg-success/90 transition-smooth press-scale"
            >
              <span className="text-xl">💬</span>
              Chatear en WhatsApp
            </a>
          </div>
        </section>
      </main>

      <FloatingCart
        itemCount={totalItems}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default HomeProductCatalogInteractive;