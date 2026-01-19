'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'outForDelivery' | 'delivered';
  paymentMethod: 'nequi' | 'daviplata' | 'pse' | 'cash';
  address: string;
  timestamp: string;
  notes?: string;
}

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
  onSendDispatchNotification: (order: Order) => Promise<void>;
  onWhatsAppClick: (order: Order) => void;
  onRowClick: (orderId: string) => void;
}

export default function OrderTable({ orders, onStatusChange, onSendDispatchNotification, onWhatsAppClick, onRowClick }: OrderTableProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isSendingNotification, setIsSendingNotification] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'preparing':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'outForDelivery':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'delivered':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'preparing':
        return 'Preparando';
      case 'outForDelivery':
        return 'En Camino';
      case 'delivered':
        return 'Entregado';
      default:
        return status;
    }
  };

  const getPaymentMethodLabel = (method: Order['paymentMethod']) => {
    switch (method) {
      case 'nequi':
        return 'Nequi';
      case 'daviplata':
        return 'Daviplata';
      case 'pse':
        return 'PSE';
      case 'cash':
        return 'Efectivo';
      default:
        return method;
    }
  };

  const handleSendDispatch = async (order: Order) => {
    setIsSendingNotification(order.id);
    try {
      await onSendDispatchNotification(order);
    } finally {
      setIsSendingNotification(null);
    }
  };

  const canSendDispatch = (status: Order['status']) => 
    status === 'shipped' || status === 'processing';

  if (orders.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <Icon
          name="ShoppingBagIcon"
          size={64}
          className="text-muted-foreground mx-auto mb-4"
        />
        <h3 className="font-heading font-bold text-xl mb-2">
          No hay órdenes disponibles
        </h3>
        <p className="text-text-secondary">
          Las órdenes aparecerán aquí cuando los clientes realicen pedidos
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-warm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Orden
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Cliente
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Teléfono
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Pago
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-text-primary">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="hover:bg-muted/50 transition-smooth cursor-pointer"
                  onClick={() => onRowClick(order.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold data-text">#{order.orderNumber}</span>
                      <Icon
                        name="ChevronDownIcon"
                        size={16}
                        className={`text-text-secondary transition-transform duration-200 ${
                          expandedOrderId === order.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{order.customerName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="data-text text-sm">{order.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-primary data-text">
                      {formatCurrency(order.total)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{getPaymentMethodLabel(order.paymentMethod)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{order.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          onStatusChange(order.id, e.target.value as Order['status']);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="preparing">Preparando</option>
                        <option value="outForDelivery">En Camino</option>
                        <option value="delivered">Entregado</option>
                      </select>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWhatsAppClick(order);
                        }}
                        className="p-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-smooth press-scale"
                        title="Enviar WhatsApp"
                      >
                        <Icon name="ChatBubbleLeftRightIcon" size={18} variant="solid" />
                      </button>
                      {canSendDispatch(order.status) && (
                        <button
                          onClick={() => handleSendDispatch(order)}
                          disabled={isSendingNotification === order.id}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSendingNotification === order.id ? (
                            <>
                              <span className="animate-spin">⏳</span>
                              Enviando...
                            </>
                          ) : (
                            <>
                              📱 Notificar
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 bg-muted/30">
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Items List */}
                        <div>
                          <h4 className="font-medium text-sm text-text-secondary mb-3">
                            Artículos del Pedido ({order.items.length})
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between py-2 px-3 bg-card rounded-lg border border-border"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{item.name}</p>
                                  <p className="text-xs text-text-secondary">
                                    Cantidad: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-bold data-text">
                                  {formatCurrency(item.price)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Address */}
                        <div>
                          <h4 className="font-medium text-sm text-text-secondary mb-2">
                            Dirección de Entrega
                          </h4>
                          <div className="flex items-start gap-2 p-3 bg-card rounded-lg border border-border">
                            <Icon
                              name="MapPinIcon"
                              size={16}
                              className="text-primary mt-0.5"
                            />
                            <p className="text-sm flex-1">{order.address}</p>
                          </div>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                          <div>
                            <h4 className="font-medium text-sm text-text-secondary mb-2">
                              Notas del Cliente
                            </h4>
                            <div className="p-3 bg-card rounded-lg border border-border">
                              <p className="text-sm">{order.notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}