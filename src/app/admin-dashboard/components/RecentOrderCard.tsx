'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import OrderStatusBadge from './OrderStatusBadge';

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  items: number;
  total: number;
  status: 'received' | 'preparing' | 'dispatched' | 'delivered';
  timestamp: string;
}

interface RecentOrderCardProps {
  order: RecentOrder;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

const RecentOrderCard = ({ order, onStatusChange }: RecentOrderCardProps) => {
  // Add null/undefined check for order prop
  if (!order) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = {
      received: 'preparing',
      preparing: 'dispatched',
      dispatched: 'delivered',
      delivered: 'delivered',
    };
    return statusFlow[currentStatus as keyof typeof statusFlow];
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(order.status);
    if (nextStatus !== order.status) {
      onStatusChange(order.id, nextStatus);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border hover:shadow-warm transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm">Pedido #{order?.orderNumber || 'N/A'}</h4>
            <OrderStatusBadge status={order?.status || 'received'} />
          </div>
          <p className="text-text-secondary text-sm">{order?.customerName || 'Cliente desconocido'}</p>
        </div>
        <button
          onClick={handleStatusUpdate}
          disabled={order?.status === 'delivered'}
          className={`p-2 rounded-lg transition-smooth press-scale ${
            order?.status === 'delivered' ?'bg-muted text-muted-foreground cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          aria-label="Actualizar estado"
        >
          <Icon name="ArrowPathIcon" size={16} variant="solid" />
        </button>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-text-secondary">
          <span className="flex items-center gap-1">
            <Icon name="ShoppingBagIcon" size={14} />
            {order?.items || 0} {(order?.items || 0) === 1 ? 'artículo' : 'artículos'}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="ClockIcon" size={14} />
            {order?.timestamp || 'N/A'}
          </span>
        </div>
        <span className="font-bold data-text">{formatCurrency(order?.total || 0)}</span>
      </div>
    </div>
  );
};

export default RecentOrderCard;