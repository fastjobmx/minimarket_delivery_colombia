'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
  category: string;
  unit: string;
}

interface CartItemCardProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onSaveForLater: (productId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
  onSaveForLater
}) => {
  const subtotal = product.price * quantity;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-smooth">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <AppImage
            src={product.imageUrl}
            alt={product.alt}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-medium text-foreground line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {product.category} • {product.unit}
              </p>
            </div>
            <button
              onClick={() => onRemove(product.id)}
              className="text-destructive hover:text-destructive/80 p-1 transition-smooth"
              aria-label="Eliminar producto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-lg font-bold text-primary">
                ${product.price.toLocaleString('es-CO')}
              </p>
              <p className="text-xs text-text-secondary">
                Subtotal: ${subtotal.toLocaleString('es-CO')}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-smooth press-scale"
                aria-label="Disminuir cantidad"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="w-12 text-center font-medium text-foreground">
                {quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-smooth press-scale"
                aria-label="Aumentar cantidad"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onSaveForLater(product.id)}
              className="text-sm text-text-secondary hover:text-foreground transition-smooth"
            >
              💾 Guardar para después
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;