'use client';

import React from 'react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'cancelled' | 'processing';
  itemCount: number;
  items: string[];
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const getStatusStyles = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'processing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Entregado';
      case 'processing':
        return 'En proceso';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold text-foreground">
          Historial de Pedidos
        </h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth">
            <option>Todos los pedidos</option>
            <option>Últimos 30 días</option>
            <option>Últimos 3 meses</option>
            <option>Este año</option>
          </select>
        </div>
      </div>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-smooth"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-foreground text-lg">
                  Pedido {order.id}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${getStatusStyles(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
              <p className="text-text-secondary text-sm">
                {formatDate(order.date)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                ${order.total.toLocaleString('es-CO')}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {order.itemCount} {order.itemCount === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-foreground mb-2">
              Productos incluidos:
            </p>
            <div className="flex flex-wrap gap-2">
              {order.items.map((item, index) => (
                <span
                  key={index}
                  className="bg-white px-3 py-1 rounded-full text-sm text-text-secondary border border-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale">
              Volver a pedir
            </button>
            <button className="flex-1 bg-gray-100 text-foreground py-2 rounded-lg font-medium hover:bg-gray-200 transition-smooth press-scale">
              Ver detalles
            </button>
            {order.status === 'delivered' && (
              <button className="px-4 bg-gray-100 text-foreground rounded-lg font-medium hover:bg-gray-200 transition-smooth press-scale">
                📄 Recibo
              </button>
            )}
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-text-secondary">
            Aún no tienes pedidos
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;