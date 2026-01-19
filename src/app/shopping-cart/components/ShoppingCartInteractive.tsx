'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomerBottomNav from '@/components/common/CustomerBottomNav';
import CartItemCard from './CartItemCard';
import OrderSummary from './OrderSummary';
import DeliveryOptions from './DeliveryOptions';
import PromoCodeInput from './PromoCodeInput';
import AIRecommendations from './AIRecommendations';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
  category: string;
  unit: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface DeliveryOption {
  id: string;
  name: string;
  estimatedTime: string;
  cost: number;
  description: string;
}

function ShoppingCartInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string>('express');
  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Aguacate Hass Premium',
    price: 3500,
    imageUrl: "https://images.unsplash.com/photo-1728365796061-c6431c027687",
    alt: 'Aguacate Hass maduro con piel oscura y textura rugosa sobre fondo blanco',
    category: 'Frutas',
    unit: 'unidad'
  },
  {
    id: 'prod-002',
    name: 'Leche Entera Alpina 1L',
    price: 4200,
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1f67bca5b-1766529777771.png",
    alt: 'Botella de leche entera fresca con etiqueta azul sobre superficie blanca',
    category: 'Lácteos',
    unit: '1L'
  },
  {
    id: 'prod-003',
    name: 'Pan Integral Artesanal',
    price: 6500,
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1f5b1d2-1766445301490.png",
    alt: 'Hogaza de pan integral artesanal con semillas en la corteza sobre tabla de madera',
    category: 'Panadería',
    unit: '500g'
  },
  {
    id: 'prod-004',
    name: 'Jugo de Naranja Natural 500ml',
    price: 5800,
    imageUrl: "https://images.unsplash.com/photo-1578128389925-ef910845bd75",
    alt: 'Vaso de jugo de naranja recién exprimido con rodajas de naranja fresca',
    category: 'Bebidas',
    unit: '500ml'
  },
  {
    id: 'prod-005',
    name: 'Tomate Chonto Fresco',
    price: 2800,
    imageUrl: "https://images.unsplash.com/photo-1694529674608-4702f575f9cb",
    alt: 'Tomates rojos frescos brillantes sobre fondo de madera',
    category: 'Frutas y Verduras',
    unit: 'lb'
  }];


  const deliveryOptions: DeliveryOption[] = [
  {
    id: 'express',
    name: 'Express (30 min)',
    estimatedTime: '25-35 min',
    cost: 5000,
    description: 'Entrega ultrarrápida'
  },
  {
    id: 'standard',
    name: 'Estándar (1 hora)',
    estimatedTime: '45-60 min',
    cost: 3000,
    description: 'Entrega normal'
  },
  {
    id: 'scheduled',
    name: 'Programada',
    estimatedTime: 'Selecciona horario',
    cost: 2000,
    description: 'Elige tu horario'
  }];


  const recommendedProducts: Product[] = [
  {
    id: 'prod-006',
    name: 'Queso Doble Crema',
    price: 8500,
    imageUrl: "https://images.unsplash.com/photo-1632200729570-1043effd1b77",
    alt: 'Queso doble crema blanco fresco sobre tabla de madera',
    category: 'Lácteos',
    unit: '500g'
  },
  {
    id: 'prod-007',
    name: 'Huevos AA x12',
    price: 9200,
    imageUrl: "https://images.unsplash.com/photo-1660224286794-fc173fa9295c",
    alt: 'Docena de huevos frescos en cartón sobre superficie clara',
    category: 'Huevos y Lácteos',
    unit: '12 unidades'
  }];


  useEffect(() => {
    setIsHydrated(true);
    const savedCart = localStorage.getItem('minimarket_cart');
    const savedAddress = localStorage.getItem('delivery_address');

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }

    if (savedAddress) {
      setDeliveryAddress(savedAddress);
    } else {
      setDeliveryAddress('Calle 123 #45-67, Bogotá, Colombia');
    }
  }, []);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
    item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('minimarket_cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('minimarket_cart', JSON.stringify(updatedCart));
  };

  const handleSaveForLater = (productId: string) => {
    const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]');
    const item = cartItems.find((i) => i.productId === productId);

    if (item && !savedItems.find((s: CartItem) => s.productId === productId)) {
      savedItems.push(item);
      localStorage.setItem('saved_items', JSON.stringify(savedItems));
      handleRemoveItem(productId);
    }
  };

  const handleApplyPromo = (code: string) => {
    setPromoCode(code);

    const validCodes: Record<string, number> = {
      'PRIMERA10': 10,
      'VERANO15': 15,
      'CLIENTE20': 20
    };

    if (validCodes[code.toUpperCase()]) {
      setDiscount(validCodes[code.toUpperCase()]);
    } else {
      setDiscount(0);
    }
  };

  const handleAddRecommended = (productId: string) => {
    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      handleUpdateQuantity(productId, existingItem.quantity + 1);
    } else {
      const newCart = [...cartItems, { productId, quantity: 1 }];
      setCartItems(newCart);
      localStorage.setItem('minimarket_cart', JSON.stringify(newCart));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const selectedDeliveryOption = deliveryOptions.find((d) => d.id === selectedDelivery);
  const deliveryFee = selectedDeliveryOption?.cost || 0;
  const discountAmount = subtotal * discount / 100;
  const total = subtotal + deliveryFee - discountAmount;
  const minimumOrder = 20000;
  const isMinimumMet = subtotal >= minimumOrder;

  const cartItemsWithProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!
  })).filter((item) => item.product);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerBottomNav cartItemCount={0} />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-card rounded w-48" />
            <div className="h-64 bg-card rounded-xl" />
          </div>
        </div>
      </div>);

  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerBottomNav cartItemCount={0} />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-text-secondary mb-6">
              Agrega productos para comenzar tu compra
            </p>
            <Link
              href="/home-product-catalog"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale">

              Explorar productos
            </Link>
          </div>
        </main>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <CustomerBottomNav cartItemCount={cartItems.length} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Mi Carrito
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          <Link
            href="/home-product-catalog"
            className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth">

            ← Seguir comprando
          </Link>
        </div>

        {/* Minimum Order Alert */}
        {!isMinimumMet &&
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  Pedido mínimo: ${minimumOrder.toLocaleString('es-CO')} COP
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  Te faltan ${(minimumOrder - subtotal).toLocaleString('es-CO')} COP para realizar el pedido
                </p>
              </div>
            </div>
          </div>
        }

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItemsWithProducts.map(({ product, quantity }) =>
              <CartItemCard
                key={product.id}
                product={product}
                quantity={quantity}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                onSaveForLater={handleSaveForLater} />

              )}
            </div>

            {/* Delivery Options */}
            <DeliveryOptions
              options={deliveryOptions}
              selectedId={selectedDelivery}
              onSelect={setSelectedDelivery}
              deliveryAddress={deliveryAddress} />


            {/* Promo Code */}
            <PromoCodeInput
              promoCode={promoCode}
              discount={discount}
              onApply={handleApplyPromo} />


            {/* AI Recommendations */}
            <AIRecommendations
              products={recommendedProducts}
              onAddToCart={handleAddRecommended} />

          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <OrderSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                discount={discountAmount}
                total={total}
                isMinimumMet={isMinimumMet} />

            </div>
          </div>
        </div>
      </main>
    </div>);

}

export default ShoppingCartInteractive;

