'use client';

import React, { useState, useEffect } from 'react';
import CustomerBottomNav from '@/components/common/CustomerBottomNav';
import ProfileHeader from './ProfileHeader';
import DeliveryAddresses from './DeliveryAddresses';
import OrderHistory from './OrderHistory';
import PaymentMethods from './PaymentMethods';
import NotificationSettings from './NotificationSettings';
import LoyaltyPoints from './LoyaltyPoints';
import AccountSecurity from './AccountSecurity';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
  alt: string;
  memberSince: string;
}

interface DeliveryAddress {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  instructions?: string;
  isDefault: boolean;
  whatsappLocation?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'cancelled' | 'processing';
  itemCount: number;
  items: string[];
}

interface PaymentMethod {
  id: string;
  type: 'nequi' | 'daviplata' | 'pse' | 'card';
  name: string;
  lastDigits?: string;
  isDefault: boolean;
}

interface NotificationPreference {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const UserProfileInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('addresses');

  const userProfile: UserProfile = {
    id: 'user-001',
    name: 'María González',
    phone: '+57 300 123 4567',
    email: 'maria.gonzalez@example.com',
    photoUrl: "https://images.unsplash.com/photo-1565130858678-a0e60b0a8b51",
    alt: 'Foto de perfil de María González sonriendo con fondo claro',
    memberSince: '2025-01-01'
  };

  const [addresses, setAddresses] = useState<DeliveryAddress[]>([
  {
    id: 'addr-001',
    name: 'Casa',
    address: 'Calle 123 #45-67',
    neighborhood: 'Chapinero',
    city: 'Bogotá',
    instructions: 'Apartamento 301, Torre B',
    isDefault: true,
    whatsappLocation: 'https://wa.me/?text=Mi%20ubicación'
  },
  {
    id: 'addr-002',
    name: 'Oficina',
    address: 'Carrera 7 #32-16',
    neighborhood: 'Centro',
    city: 'Bogotá',
    instructions: 'Edificio Colpatria, piso 15',
    isDefault: false
  }]
  );

  const orderHistory: Order[] = [
  {
    id: 'ORD-2026-001',
    date: '2026-01-10',
    total: 85600,
    status: 'delivered',
    itemCount: 12,
    items: ['Leche', 'Pan', 'Huevos', 'Aguacate']
  },
  {
    id: 'ORD-2026-002',
    date: '2026-01-08',
    total: 45200,
    status: 'delivered',
    itemCount: 6,
    items: ['Frutas', 'Verduras', 'Yogurt']
  },
  {
    id: 'ORD-2026-003',
    date: '2026-01-05',
    total: 62800,
    status: 'delivered',
    itemCount: 9,
    items: ['Carnes', 'Pollo', 'Pescado']
  }];


  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
  {
    id: 'pay-001',
    type: 'nequi',
    name: 'Nequi',
    lastDigits: '4567',
    isDefault: true
  },
  {
    id: 'pay-002',
    type: 'daviplata',
    name: 'Daviplata',
    lastDigits: '8901',
    isDefault: false
  }]
  );

  const [notifications, setNotifications] = useState<NotificationPreference[]>([
  {
    id: 'notif-001',
    name: 'Actualizaciones de pedidos',
    description: 'Recibe notificaciones sobre el estado de tus pedidos',
    enabled: true
  },
  {
    id: 'notif-002',
    name: 'Promociones y ofertas',
    description: 'Ofertas especiales y descuentos exclusivos',
    enabled: true
  },
  {
    id: 'notif-003',
    name: 'Alertas de entrega',
    description: 'Notificaciones cuando tu pedido está cerca',
    enabled: true
  },
  {
    id: 'notif-004',
    name: 'Noticias del minimarket',
    description: 'Nuevos productos y actualizaciones',
    enabled: false
  }]
  );

  const loyaltyPoints = {
    currentPoints: 2450,
    copValue: 24500,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 550
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses((prev) =>
    prev.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId
    }))
    );
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
  };

  const handleSetDefaultPayment = (paymentId: string) => {
    setPaymentMethods((prev) =>
    prev.map((method) => ({
      ...method,
      isDefault: method.id === paymentId
    }))
    );
  };

  const handleDeletePayment = (paymentId: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== paymentId));
  };

  const handleToggleNotification = (notificationId: string) => {
    setNotifications((prev) =>
    prev.map((notif) =>
    notif.id === notificationId ?
    { ...notif, enabled: !notif.enabled } :
    notif
    )
    );
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerBottomNav cartItemCount={0} />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-card rounded-xl" />
            <div className="h-64 bg-card rounded-xl" />
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <CustomerBottomNav cartItemCount={0} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <ProfileHeader profile={userProfile} />

        {/* Tab Navigation */}
        <div className="bg-card rounded-xl shadow-sm p-2 mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
            { id: 'addresses', label: 'Direcciones', icon: '📍' },
            { id: 'orders', label: 'Pedidos', icon: '📦' },
            { id: 'payments', label: 'Pagos', icon: '💳' },
            { id: 'notifications', label: 'Notificaciones', icon: '🔔' },
            { id: 'loyalty', label: 'Puntos', icon: '⭐' },
            { id: 'security', label: 'Seguridad', icon: '🔒' }].
            map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${
              activeTab === tab.id ?
              'bg-primary text-primary-foreground' :
              'text-text-secondary hover:bg-gray-100'}`
              }>

                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'addresses' &&
          <DeliveryAddresses
            addresses={addresses}
            onSetDefault={handleSetDefaultAddress}
            onDelete={handleDeleteAddress} />

          }

          {activeTab === 'orders' &&
          <OrderHistory orders={orderHistory} />
          }

          {activeTab === 'payments' &&
          <PaymentMethods
            methods={paymentMethods}
            onSetDefault={handleSetDefaultPayment}
            onDelete={handleDeletePayment} />

          }

          {activeTab === 'notifications' &&
          <NotificationSettings
            preferences={notifications}
            onToggle={handleToggleNotification} />

          }

          {activeTab === 'loyalty' &&
          <LoyaltyPoints points={loyaltyPoints} />
          }

          {activeTab === 'security' &&
          <AccountSecurity />
          }
        </div>
      </main>
    </div>);

};

export default UserProfileInteractive;