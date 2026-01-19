import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface SuggestedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: string;
}

interface SuggestedProductsProps {
  products: SuggestedProduct[];
}

const SuggestedProducts = ({ products }: SuggestedProductsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-warm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="SparklesIcon" size={24} className="text-accent" variant="solid" />
        <h2 className="text-lg font-heading font-bold">Productos Sugeridos</h2>
      </div>
      <p className="text-sm text-text-secondary mb-4">Basado en tu compra actual</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-muted rounded-lg p-3 hover:shadow-warm transition-smooth cursor-pointer"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-background">
              <AppImage
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
            <p className="text-xs text-text-secondary mb-2">{product.category}</p>
            <p className="font-bold text-primary data-text">{formatCurrency(product.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;