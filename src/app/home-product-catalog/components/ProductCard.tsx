'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
  stock: number;
  onAddToCart: (productId: string) => void;
}

const ProductCard = ({ id, name, price, imageUrl, alt, stock, onAddToCart }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(id);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth">
      <div className="relative h-40 overflow-hidden">
        <AppImage
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
        />
        {stock < 10 && stock > 0 && (
          <div className="absolute top-2 right-2 bg-warning text-warning-foreground text-xs font-bold px-2 py-1 rounded-lg shadow-warm">
            ¡Últimas {stock}!
          </div>
        )}
        {stock === 0 && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-error font-bold">Agotado</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-base font-medium text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary data-text">
            {formatCurrency(price)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={stock === 0 || isAdding}
            className={`p-2 rounded-lg transition-smooth press-scale ${
              stock === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : isAdding
                ? 'bg-success text-success-foreground scale-110'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            <Icon
              name={isAdding ? 'CheckIcon' : 'PlusIcon'}
              size={20}
              variant="solid"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;