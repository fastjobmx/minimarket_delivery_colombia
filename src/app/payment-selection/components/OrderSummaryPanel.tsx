import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryPanelProps {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: string;
  estimatedDelivery: string;
}

const OrderSummaryPanel = ({
  items,
  subtotal,
  deliveryFee,
  total,
  deliveryAddress,
  estimatedDelivery,
}: OrderSummaryPanelProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 lg:p-6 shadow-warm">
      <h2 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
        <Icon name="ShoppingBagIcon" size={24} variant="solid" className="text-primary" />
        Resumen del Pedido
      </h2>

      <div className="space-y-3 mb-4 pb-4 border-b border-border">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium line-clamp-1">{item.name}</p>
              <p className="text-xs text-text-secondary caption">Cantidad: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold data-text flex-shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-4 pb-4 border-b border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium data-text">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Envío</span>
          <span className="font-medium data-text">{formatCurrency(deliveryFee)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="font-heading font-bold text-lg">Total</span>
        <span className="font-heading font-bold text-2xl text-primary data-text">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
          <Icon name="MapPinIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-text-secondary caption mb-1">Dirección de entrega</p>
            <p className="text-sm font-medium">{deliveryAddress}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
          <Icon name="TruckIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-text-secondary caption mb-1">Entrega estimada</p>
            <p className="text-sm font-medium">{estimatedDelivery}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPanel;