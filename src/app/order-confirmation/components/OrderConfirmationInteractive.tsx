'use client';

import React, { useState, useEffect } from 'react';
import OrderHeader from './OrderHeader';
import OrderStatus from './OrderStatus';
import OrderItems from './OrderItems';
import OrderSummary from './OrderSummary';
import DeliveryAddress from './DeliveryAddress';
import ContactStore from './ContactStore';
import SuggestedProducts from './SuggestedProducts';
import ActionButtons from './ActionButtons';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  alt: string;
}

interface SuggestedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: string;
}

interface OrderData {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    department: string;
  };
  storeInfo: {
    name: string;
    phone: string;
    whatsapp: string;
  };
  suggestedProducts: SuggestedProduct[];
}

const OrderConfirmationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockOrderData: OrderData = {
    orderNumber: 'MM-2026-0114-001',
    orderDate: '14/01/2026',
    estimatedDelivery: '14/01/2026 - 2:00 PM - 3:00 PM',
    currentStatus: 'received',
    items: [
    {
      id: '1',
      name: 'Banano Premium',
      quantity: 2,
      price: 3500,
      image: "https://images.unsplash.com/photo-1675586677399-2dbd468cad2f",
      alt: 'Racimo de bananos amarillos maduros sobre fondo blanco'
    },
    {
      id: '2',
      name: 'Leche Entera Alpina 1L',
      quantity: 1,
      price: 4200,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f67bca5b-1766529777771.png",
      alt: 'Botella de leche blanca fresca con etiqueta azul sobre mesa de madera'
    },
    {
      id: '3',
      name: 'Pan Integral Bimbo',
      quantity: 1,
      price: 5800,
      image: "https://images.unsplash.com/photo-1626423642868-cd70b98459d9",
      alt: 'Rebanadas de pan integral recién horneado con semillas sobre tabla de madera'
    }],

    subtotal: 17300,
    deliveryFee: 3000,
    total: 20300,
    paymentMethod: 'Nequi',
    deliveryAddress: {
      name: 'María González',
      phone: '+57 312 456 7890',
      address: 'Calle 45 #23-67, Apartamento 302',
      city: 'Bogotá',
      department: 'Cundinamarca'
    },
    storeInfo: {
      name: 'MiniMarket El Vecino',
      phone: '+573001234567',
      whatsapp: '573001234567'
    },
    suggestedProducts: [
    {
      id: 's1',
      name: 'Manzana Verde',
      price: 4500,
      image: "https://images.unsplash.com/photo-1471248026681-35a45d5530a3",
      alt: 'Manzanas verdes frescas y brillantes en canasta de mimbre',
      category: 'Frutas'
    },
    {
      id: 's2',
      name: 'Yogurt Alpina',
      price: 3200,
      image: "https://images.unsplash.com/photo-1670843838196-0c1c15e85d5e",
      alt: 'Vaso de yogurt cremoso blanco con frutas frescas encima',
      category: 'Lácteos'
    },
    {
      id: 's3',
      name: 'Galletas Ducales',
      price: 2800,
      image: "https://images.unsplash.com/photo-1608070734967-c112a08c4954",
      alt: 'Galletas doradas crujientes apiladas en plato blanco',
      category: 'Panadería'
    },
    {
      id: 's4',
      name: 'Jugo Hit Naranja',
      price: 2500,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_159151a33-1765895834226.png",
      alt: 'Botella de jugo de naranja natural con rodajas de naranja fresca',
      category: 'Bebidas'
    }]

  };

  const handleDownloadReceipt = () => {
    if (!isHydrated) return;

    alert('Descargando recibo en formato PDF...');
  };

  const handleEnableNotifications = () => {
    if (!isHydrated) return;

    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          alert('¡Notificaciones activadas! Te avisaremos sobre el estado de tu pedido.');
        } else {
          alert('Por favor, permite las notificaciones en la configuración de tu navegador.');
        }
      });
    } else {
      alert('Tu navegador no soporta notificaciones.');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-card rounded-xl p-6 shadow-warm mb-6 animate-pulse">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4" />
            <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-2" />
            <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <OrderHeader
          orderNumber={mockOrderData.orderNumber}
          orderDate={mockOrderData.orderDate}
          estimatedDelivery={mockOrderData.estimatedDelivery} />


        <OrderStatus currentStatus={mockOrderData.currentStatus} />

        <OrderItems items={mockOrderData.items} />

        <OrderSummary
          subtotal={mockOrderData.subtotal}
          deliveryFee={mockOrderData.deliveryFee}
          total={mockOrderData.total}
          paymentMethod={mockOrderData.paymentMethod} />


        <DeliveryAddress
          name={mockOrderData.deliveryAddress.name}
          phone={mockOrderData.deliveryAddress.phone}
          address={mockOrderData.deliveryAddress.address}
          city={mockOrderData.deliveryAddress.city}
          department={mockOrderData.deliveryAddress.department} />


        <ContactStore
          storeName={mockOrderData.storeInfo.name}
          storePhone={mockOrderData.storeInfo.phone}
          storeWhatsApp={mockOrderData.storeInfo.whatsapp} />


        <SuggestedProducts products={mockOrderData.suggestedProducts} />

        <ActionButtons
          orderNumber={mockOrderData.orderNumber}
          onDownloadReceipt={handleDownloadReceipt}
          onEnableNotifications={handleEnableNotifications} />

      </div>
    </div>);

};

export default OrderConfirmationInteractive;