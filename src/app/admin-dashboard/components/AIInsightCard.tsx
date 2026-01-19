import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ProductPair {
  product1: {
    name: string;
    image: string;
    alt: string;
  };
  product2: {
    name: string;
    image: string;
    alt: string;
  };
  frequency: number;
  revenue: number;
}

interface AIInsightCardProps {
  pair: ProductPair;
}

const AIInsightCard = ({ pair }: AIInsightCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border hover:shadow-warm transition-smooth">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <AppImage
              src={pair.product1.image}
              alt={pair.product1.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <Icon name="PlusIcon" size={16} className="text-text-secondary" />
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <AppImage
              src={pair.product2.image}
              alt={pair.product2.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium line-clamp-1">
          {pair.product1.name} + {pair.product2.name}
        </p>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{pair.frequency} veces comprados juntos</span>
          <span className="font-bold text-success data-text">{formatCurrency(pair.revenue)}</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;