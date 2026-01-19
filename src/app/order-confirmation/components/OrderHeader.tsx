import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderHeaderProps {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
}

const OrderHeader = ({ orderNumber, orderDate, estimatedDelivery }: OrderHeaderProps) => {
  return (
    <div className="bg-success text-success-foreground rounded-xl p-6 shadow-warm mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-success-foreground/20 rounded-full flex items-center justify-center">
          <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-success-foreground" />
        </div>
      </div>
      <h1 className="text-2xl font-heading font-bold text-center mb-2">¡Pedido Confirmado!</h1>
      <p className="text-center opacity-90 mb-4">Tu pedido ha sido recibido exitosamente</p>
      
      <div className="bg-success-foreground/10 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-80">Número de Pedido:</span>
          <span className="font-bold data-text">{orderNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-80">Fecha:</span>
          <span className="font-medium">{orderDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-80">Entrega Estimada:</span>
          <span className="font-medium">{estimatedDelivery}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;