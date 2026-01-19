'use client';

import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
  stock: number;
}

interface FrequentlyBoughtTogetherProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

const FrequentlyBoughtTogether = ({ products, onAddToCart }: FrequentlyBoughtTogetherProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-warm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Frecuentemente comprados juntos
          </h2>
          <p className="text-sm text-text-secondary caption">
            Sugerencias inteligentes basadas en tu navegación
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;