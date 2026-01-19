'use client';

import { useState } from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  TruckIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon 
} from '@heroicons/react/24/outline';
import OrderStatusBadge from '@/app/admin-dashboard/components/OrderStatusBadge';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  shipping_address: string;
  items?: OrderItem[];
}

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
  onSendDispatchNotification: (order: Order) => void;
}

export default function OrderCard({ order, onStatusChange, onSendDispatchNotification }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSendingNotification, setIsSendingNotification] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  const handleSendDispatchNotification = async () => {
    setIsSendingNotification(true);
    try {
      await onSendDispatchNotification(order);
    } finally {
      setIsSendingNotification(false);
    }
  };

  const canSendDispatch = order.status === 'shipped' || order.status === 'processing';

  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {getStatusIcon(order.status)}
            <h3 className="font-semibold text-lg">Pedido #{order.order_number}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{order.customer_name}</p>
          <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{formatCurrency(order.total_amount)}</p>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-3 text-sm text-muted-foreground">
        <p>{order.customer_email}</p>
        {order.customer_phone && <p>📱 {order.customer_phone}</p>}
      </div>

      {/* Status Actions */}
      <div className="flex flex-wrap gap-2 mb-3">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
          className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm"
        >
          <option value="pending">Pendiente</option>
          <option value="processing">Procesando</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregado</option>
          <option value="cancelled">Cancelado</option>
        </select>

        {canSendDispatch && (
          <button
            onClick={handleSendDispatchNotification}
            disabled={isSendingNotification}
            className="px-4 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSendingNotification ? (
              <>
                <span className="animate-spin">⏳</span>
                Enviando...
              </>
            ) : (
              <>
                📱 Notificar Despacho
              </>
            )}
          </button>
        )}
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm text-primary hover:text-primary/80 transition-colors py-2"
      >
        <span>{isExpanded ? 'Ocultar detalles' : 'Ver detalles'}</span>
        {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="pt-3 border-t border-border space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Dirección de Envío:</p>
            <p className="text-sm text-muted-foreground">{order.shipping_address}</p>
          </div>

          {order.items && order.items.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Productos:</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.product_name}
                    </span>
                    <span className="font-medium">{formatCurrency(item.subtotal)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm font-medium">Estado de Pago:</span>
            <span className={`text-sm px-3 py-1 rounded-full ${
              order.payment_status === 'completed' ? 'bg-green-500/10 text-green-600' :
              order.payment_status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
              order.payment_status === 'failed'? 'bg-red-500/10 text-red-600' : 'bg-gray-500/10 text-gray-600'
            }`}>
              {order.payment_status === 'completed' ? 'Pagado' :
               order.payment_status === 'pending' ? 'Pendiente' :
               order.payment_status === 'failed' ? 'Fallido' : 'Reembolsado'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}