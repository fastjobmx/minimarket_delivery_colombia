'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/common/AdminSidebar';
import NotificationCenter from '@/components/common/NotificationCenter';
import OrderFilters from './OrderFilters';
import OrderTable from './OrderTable';
import OrderCard from './OrderCard';
import BulkActions from './BulkActions';
import { useRealtimeOrders } from '@/hooks/useRealtimeOrders';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';


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

interface Notification {
  id: string;
  type: 'order' | 'inventory' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

const OrderManagementInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Real-time orders hook (will work once Supabase is connected)
  const {
    orders: realtimeOrders,
    isConnected: ordersConnected,
    connectionStatus: ordersStatus
  } = useRealtimeOrders([]);

  // Real-time notifications hook (will work once Supabase is connected)
  const {
    notifications: realtimeNotifications,
    unreadCount,
    isConnected: notificationsConnected,
    markAsRead,
    markAllAsRead
  } = useRealtimeNotifications('admin-user-id', []);

  // Fallback to mock data if Supabase not connected yet
  const [mockOrders, setMockOrders] = useState<Order[]>([]);
  const [mockNotifications, setMockNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setIsHydrated(true);

    // Mock data (will be replaced by Supabase once connected)
    const mockOrdersData: Order[] = [
      {
        id: '1',
        orderNumber: '2026001',
        customerName: 'María González',
        phone: '+57 312 456 7890',
        items: [
          { id: '1', name: 'Manzanas Rojas (1kg)', quantity: 2, price: 8500 },
          { id: '2', name: 'Leche Entera (1L)', quantity: 3, price: 4200 },
          { id: '3', name: 'Pan Integral', quantity: 1, price: 3500 },
        ],
        total: 28800,
        status: 'pending',
        paymentMethod: 'nequi',
        address: 'Calle 45 #23-67, Apartamento 302, Bogotá',
        timestamp: '14/01/2026 10:30',
        notes: 'Por favor tocar el timbre dos veces',
      },
      {
        id: '2',
        orderNumber: '2026002',
        customerName: 'Carlos Rodríguez',
        phone: '+57 301 234 5678',
        items: [
          { id: '4', name: 'Arroz Diana (500g)', quantity: 2, price: 3200 },
          { id: '5', name: 'Aceite de Oliva', quantity: 1, price: 15000 },
          { id: '6', name: 'Pasta Doria', quantity: 3, price: 2800 },
        ],
        total: 29600,
        status: 'preparing',
        paymentMethod: 'daviplata',
        address: 'Carrera 15 #89-34, Casa 12, Medellín',
        timestamp: '14/01/2026 09:15',
      },
      {
        id: '3',
        orderNumber: '2026003',
        customerName: 'Ana Martínez',
        phone: '+57 315 678 9012',
        items: [
          { id: '7', name: 'Plátanos Verdes (1kg)', quantity: 1, price: 3500 },
          { id: '8', name: 'Tomates (500g)', quantity: 2, price: 4000 },
          { id: '9', name: 'Cebolla Cabezona (1kg)', quantity: 1, price: 3000 },
          { id: '10', name: 'Aguacate Hass', quantity: 4, price: 2500 },
        ],
        total: 24500,
        status: 'outForDelivery',
        paymentMethod: 'cash',
        address: 'Avenida 68 #45-23, Torre B, Apartamento 801, Cali',
        timestamp: '14/01/2026 08:45',
        notes: 'Dejar con el portero si no estoy',
      },
      {
        id: '4',
        orderNumber: '2026004',
        customerName: 'Luis Hernández',
        phone: '+57 320 987 6543',
        items: [
          { id: '11', name: 'Coca-Cola (2L)', quantity: 2, price: 6500 },
          { id: '12', name: 'Papas Margarita', quantity: 3, price: 3200 },
          { id: '13', name: 'Galletas Oreo', quantity: 2, price: 4800 },
        ],
        total: 31800,
        status: 'delivered',
        paymentMethod: 'pse',
        address: 'Calle 100 #15-45, Oficina 502, Barranquilla',
        timestamp: '13/01/2026 18:20',
      },
      {
        id: '5',
        orderNumber: '2026005',
        customerName: 'Patricia Silva',
        phone: '+57 318 456 1234',
        items: [
          { id: '14', name: 'Yogurt Alpina Natural', quantity: 4, price: 3500 },
          { id: '15', name: 'Queso Campesino (500g)', quantity: 1, price: 12000 },
          { id: '16', name: 'Mantequilla', quantity: 2, price: 5500 },
        ],
        total: 35500,
        status: 'pending',
        paymentMethod: 'nequi',
        address: 'Carrera 7 #34-56, Apartamento 201, Bucaramanga',
        timestamp: '14/01/2026 11:00',
      },
    ];

    const mockNotificationsData: Notification[] = [
      {
        id: '1',
        type: 'order',
        title: 'Nueva Orden Recibida',
        message: 'Orden #2026001 de María González por $28.800',
        timestamp: new Date('2026-01-14T10:30:00'),
        read: false,
      },
      {
        id: '2',
        type: 'order',
        title: 'Orden Lista para Entrega',
        message: 'Orden #2026003 está en camino',
        timestamp: new Date('2026-01-14T08:45:00'),
        read: false,
      },
    ];

    setMockOrders(mockOrdersData);
    setMockNotifications(mockNotificationsData);
  }, []);

  // Use real-time data if connected, otherwise use mock data
  const orders = ordersConnected ? realtimeOrders : mockOrders;
  const notifications = notificationsConnected ? realtimeNotifications : mockNotifications;

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;
    const matchesSearch =
      searchQuery === '' ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    let matchesDateRange = true;
    if (dateRange.start || dateRange.end) {
      const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
      if (dateRange.start) {
        matchesDateRange = matchesDateRange && orderDate >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        matchesDateRange = matchesDateRange && orderDate <= new Date(dateRange.end);
      }
    }

    return matchesStatus && matchesPayment && matchesSearch && matchesDateRange;
  });

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    outForDelivery: orders.filter((o) => o.status === 'outForDelivery').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );

    const order = orders.find((o) => o.id === orderId);
    if (order) {
      const statusLabels = {
        pending: 'Pendiente',
        preparing: 'Preparando',
        outForDelivery: 'En Camino',
        delivered: 'Entregado',
      };

      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'order',
        title: 'Estado de Orden Actualizado',
        message: `Orden #${order.orderNumber} ahora está ${statusLabels[newStatus]}`,
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);
    }
  };

  const handleWhatsAppClick = (order: Order) => {
    if (!isHydrated) return;

    const statusLabels = {
      pending: 'Pendiente',
      preparing: 'Preparando',
      outForDelivery: 'En Camino',
      delivered: 'Entregado',
    };

    const itemsList = order.items
      .map((item) => `• ${item.name} x${item.quantity}`)
      .join('\n');

    const message = `¡Hola ${order.customerName}! 👋\n\nTu orden #${order.orderNumber} está ${
      statusLabels[order.status]
    }.\n\n*Detalles del pedido:*\n${itemsList}\n\n*Total:* $${order.total.toLocaleString(
      'es-CO'
    )}\n*Dirección:* ${order.address}\n\n¡Gracias por tu compra! 🛒`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = order.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleSendDispatchNotification = async (order: Order) => {
    try {
      const whatsappNumber = order.phone?.replace(/\D/g, '');
      
      if (!whatsappNumber) {
        setNotificationMessage('Este pedido no tiene número de teléfono registrado');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
        return;
      }

      const message = encodeURIComponent(
        `🎉 *¡Tu pedido va en camino!*\n\n` +
        `📦 *Pedido:* #${order.orderNumber}\n` +
        `💰 *Total:* ${order.total.toLocaleString('es-CO')}\n` +
        `📍 *Destino:* ${order.address}\n\n` +
        `Pronto recibirás tu pedido. ¡Gracias por tu compra! 🛍️`
      );

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      window.open(whatsappUrl, '_blank');

      // Update order status to shipped if it was processing
      if (order.status === 'preparing') {
        await handleStatusChange(order.id, 'outForDelivery');
      }

      setNotificationMessage(`✅ Notificación de despacho enviada a ${order.customerName}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    } catch (error) {
      setNotificationMessage('❌ Error al enviar notificación de despacho');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateRange({ start: '', end: '' });
    setSearchQuery('');
  };

  const handleRowClick = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleBulkStatusChange = (status: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        selectedOrders.includes(order.id) ? { ...order, status: status as Order['status'] } : order
      )
    );
    setSelectedOrders([]);
  };

  const handleExport = () => {
    if (!isHydrated) return;

    const selectedOrdersData = orders.filter((order) => selectedOrders.includes(order.id));
    const csvContent = [
      ['Orden', 'Cliente', 'Teléfono', 'Total', 'Estado', 'Pago', 'Fecha'].join(','),
      ...selectedOrdersData.map((order) =>
        [
          order.orderNumber,
          order.customerName,
          order.phone,
          order.total,
          order.status,
          order.paymentMethod,
          order.timestamp,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ordenes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleNotificationClick = (notification: Notification) => {
    console.log('Notification clicked:', notification);
    if (notificationsConnected) {
      markAsRead(notification.id);
    } else {
      handleMarkAsRead(notification.id);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    if (notificationsConnected) {
      markAsRead(notificationId);
    } else {
      setMockNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (notificationsConnected) {
      markAllAsRead();
    } else {
      setMockNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Cargando gestión de órdenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar notificationCount={notifications.filter((n) => !n.read).length} />

      <main className="lg:pl-64 min-h-screen">
        <div className="sticky top-0 z-10 bg-card border-b border-border shadow-warm">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-bold text-2xl text-primary">
                Gestión de Órdenes
              </h1>
              {ordersConnected && (
                <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="font-medium">En vivo</span>
                </div>
              )}
            </div>
            <NotificationCenter
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
          <OrderFilters
            statusFilter={statusFilter}
            paymentFilter={paymentFilter}
            dateRange={dateRange}
            searchQuery={searchQuery}
            onStatusChange={setStatusFilter}
            onPaymentChange={setPaymentFilter}
            onDateRangeChange={setDateRange}
            onSearchChange={setSearchQuery}
            onClearFilters={handleClearFilters}
            orderCounts={orderCounts}
          />

          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <OrderTable
              orders={filteredOrders}
              onStatusChange={handleStatusChange}
              onWhatsAppClick={handleWhatsAppClick}
              onRowClick={handleRowClick}
              expandedOrderId={expandedOrderId}
            />
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <p className="text-text-secondary">No hay órdenes disponibles</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onWhatsAppClick={handleWhatsAppClick}
                />
              ))
            )}
          </div>

          <BulkActions
            selectedCount={selectedOrders.length}
            onBulkStatusChange={handleBulkStatusChange}
            onExport={handleExport}
            onClearSelection={() => setSelectedOrders([])}
          />
        </div>
      </main>
    </div>
  );
};

export default OrderManagementInteractive;