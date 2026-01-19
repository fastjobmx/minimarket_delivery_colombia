import React from 'react';

interface OrderStatusBadgeProps {
  status: 'received' | 'preparing' | 'dispatched' | 'delivered';
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusConfig = {
    received: {
      label: 'Recibido',
      className: 'bg-accent/10 text-accent border-accent/20',
    },
    preparing: {
      label: 'Preparando',
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    dispatched: {
      label: 'Despachado',
      className: 'bg-primary/10 text-primary border-primary/20',
    },
    delivered: {
      label: 'Entregado',
      className: 'bg-success/10 text-success border-success/20',
    },
  };

  const config = statusConfig[status] || {
    label: status || 'Desconocido',
    className: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;