import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  alt: string;
}

interface OrderItemsProps {
  items: OrderItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
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
      <h2 className="text-lg font-heading font-bold mb-4">Artículos del Pedido</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <AppImage
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-text-secondary">Cantidad: {item.quantity}</p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <p className="font-bold data-text">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;