import React from 'react';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
}

const OrderSummary = ({ subtotal, deliveryFee, total, paymentMethod }: OrderSummaryProps) => {
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
      <h2 className="text-lg font-heading font-bold mb-4">Resumen del Pedido</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium data-text">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Envío</span>
          <span className="font-medium data-text">{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold text-xl text-primary data-text">{formatCurrency(total)}</span>
        </div>
      </div>
      
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Método de Pago:</span>
          <span className="font-medium">{paymentMethod}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;