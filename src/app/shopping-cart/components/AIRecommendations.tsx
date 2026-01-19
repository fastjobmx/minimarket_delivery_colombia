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

interface AIRecommendationsProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  products,
  onAddToCart
}) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 shadow-sm border border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🤖</span>
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground">
            Recomendaciones IA
          </h2>
          <p className="text-sm text-text-secondary">
            Basado en tu carrito actual
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg p-4 hover:shadow-md transition-smooth"
          >
            <div className="flex gap-3">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <AppImage
                  src={product.imageUrl}
                  alt={product.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground line-clamp-2 text-sm mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-primary font-bold">
                    ${product.price.toLocaleString('es-CO')}
                  </p>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-smooth press-scale flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;