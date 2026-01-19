'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PaymentMethodCard from './PaymentMethodCard';
import OrderSummaryPanel from './OrderSummaryPanel';
import NequiPaymentModal from './NequiPaymentModal';
import DaviplataPaymentModal from './DaviplataPaymentModal';
import PSEPaymentModal from './PSEPaymentModal';
import AddressConfirmation from './AddressConfirmation';
import CustomerBottomNav from '@/components/common/CustomerBottomNav';
import FloatingCart from '@/components/common/FloatingCart';
import Icon from '@/components/ui/AppIcon';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  logoAlt: string;
  description: string;
  processingTime: string;
  trustIndicator?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const PaymentSelectionInteractive = () => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [showNequiModal, setShowNequiModal] = useState(false);
  const [showDaviplataModal, setShowDaviplataModal] = useState(false);
  const [showPSEModal, setShowPSEModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('Calle 45 #23-67, Apartamento 301\nBarrio Chapinero, Bogotá D.C.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const paymentMethods: PaymentMethod[] = [
  {
    id: 'nequi',
    name: 'Nequi',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_109fcb001-1768395593087.png",
    logoAlt: 'Logo de Nequi con fondo morado y símbolo de billetera digital',
    description: 'Pago instantáneo desde tu app Nequi. Rápido y seguro.',
    processingTime: 'Inmediato',
    trustIndicator: 'Verificado'
  },
  {
    id: 'daviplata',
    name: 'Daviplata',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11603fe6a-1766878834175.png",
    logoAlt: 'Logo de Daviplata con fondo rojo y blanco de Davivienda',
    description: 'Transfiere desde Daviplata y sube tu comprobante.',
    processingTime: '5-10 minutos',
    trustIndicator: 'Verificado'
  },
  {
    id: 'pse',
    name: 'PSE',
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_183edc52c-1768395595169.png",
    logoAlt: 'Logo de PSE Pagos Seguros en Línea con escudo de seguridad bancaria',
    description: 'Paga directamente desde tu banco en línea.',
    processingTime: 'Inmediato',
    trustIndicator: 'Conexión segura'
  },
  {
    id: 'cash',
    name: 'Efectivo',
    logo: "https://images.unsplash.com/photo-1648856779635-d6f5d47fb301",
    logoAlt: 'Billetes colombianos de diferentes denominaciones sobre superficie blanca',
    description: 'Paga en efectivo al recibir tu pedido.',
    processingTime: 'Al momento de entrega'
  }];


  const orderItems: OrderItem[] = [
  { id: '1', name: 'Manzanas Rojas (1kg)', quantity: 2, price: 8500 },
  { id: '2', name: 'Leche Entera Alpina (1L)', quantity: 3, price: 4200 },
  { id: '3', name: 'Pan Integral Bimbo', quantity: 1, price: 6800 },
  { id: '4', name: 'Arroz Diana (500g)', quantity: 2, price: 3500 }];


  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleProceedToPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    switch (selectedPaymentMethod) {
      case 'nequi':
        setShowNequiModal(true);
        break;
      case 'daviplata':
        setShowDaviplataModal(true);
        break;
      case 'pse':
        setShowPSEModal(true);
        break;
      case 'cash':
        handleCashPayment();
        break;
    }
  };

  const handleNequiConfirm = (phoneNumber: string) => {
    setIsProcessing(true);
    setShowNequiModal(false);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/order-confirmation');
    }, 2000);
  };

  const handleDaviplataConfirm = (receiptFile: File) => {
    setIsProcessing(true);
    setShowDaviplataModal(false);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/order-confirmation');
    }, 2000);
  };

  const handlePSEConfirm = (bank: string, documentType: string, documentNumber: string) => {
    setIsProcessing(true);
    setShowPSEModal(false);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/order-confirmation');
    }, 2000);
  };

  const handleCashPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/order-confirmation');
    }, 1500);
  };

  const handleAddressUpdate = (newAddress: string) => {
    setDeliveryAddress(newAddress);
  };

  const handleShareLocation = () => {
    if (!isHydrated) return;

    const lat = 4.6533;
    const lng = -74.0836;
    const message = encodeURIComponent(
      `Mi dirección de entrega es:\n${deliveryAddress}\n\nUbicación exacta:`
    );
    const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    const whatsappUrl = `https://wa.me/573001234567?text=${message}%20${encodeURIComponent(locationUrl)}`;

    window.open(whatsappUrl, '_blank');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="ArrowPathIcon" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Cargando...</p>
        </div>
      </div>);

  }

  return (
    <>
      <CustomerBottomNav cartItemCount={orderItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <FloatingCart
        itemCount={orderItems.reduce((sum, item) => sum + item.quantity, 0)}
        totalAmount={total} />


      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-smooth press-scale mb-4">

              <Icon name="ChevronLeftIcon" size={20} />
              <span className="font-medium">Volver</span>
            </button>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl mb-2">
              Método de Pago
            </h1>
            <p className="text-text-secondary">
              Selecciona cómo deseas pagar tu pedido
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-4 lg:p-6 shadow-warm">
                <h2 className="font-heading font-bold text-xl mb-4">
                  Opciones de Pago
                </h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) =>
                  <PaymentMethodCard
                    key={method.id}
                    {...method}
                    isSelected={selectedPaymentMethod === method.id}
                    onSelect={handlePaymentMethodSelect} />

                  )}
                </div>
              </div>

              <AddressConfirmation
                currentAddress={deliveryAddress}
                onAddressUpdate={handleAddressUpdate}
                onShareLocation={handleShareLocation} />

            </div>

            <div className="space-y-6">
              <OrderSummaryPanel
                items={orderItems}
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                deliveryAddress={deliveryAddress}
                estimatedDelivery="30-45 minutos" />


              <button
                onClick={handleProceedToPayment}
                disabled={!selectedPaymentMethod || isProcessing}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-heading font-bold text-lg hover:bg-primary/90 transition-smooth press-scale disabled:opacity-50 disabled:cursor-not-allowed shadow-warm">

                {isProcessing ?
                <>
                    <Icon name="ArrowPathIcon" size={24} className="animate-spin" variant="solid" />
                    Procesando...
                  </> :

                <>
                    <Icon name="CheckCircleIcon" size={24} variant="solid" />
                    Confirmar Pago
                  </>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      <NequiPaymentModal
        isOpen={showNequiModal}
        onClose={() => setShowNequiModal(false)}
        amount={total}
        onConfirm={handleNequiConfirm} />


      <DaviplataPaymentModal
        isOpen={showDaviplataModal}
        onClose={() => setShowDaviplataModal(false)}
        amount={total}
        onConfirm={handleDaviplataConfirm} />


      <PSEPaymentModal
        isOpen={showPSEModal}
        onClose={() => setShowPSEModal(false)}
        amount={total}
        onConfirm={handlePSEConfirm} />

    </>);

};

export default PaymentSelectionInteractive;