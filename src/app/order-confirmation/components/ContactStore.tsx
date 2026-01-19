'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactStoreProps {
  storeName: string;
  storePhone: string;
  storeWhatsApp: string;
}

const ContactStore = ({ storeName, storePhone, storeWhatsApp }: ContactStoreProps) => {
  const handleCall = () => {
    window.location.href = `tel:${storePhone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, tengo una consulta sobre mi pedido.');
    window.open(`https://wa.me/${storeWhatsApp}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-warm mb-6">
      <h2 className="text-lg font-heading font-bold mb-4">Contactar Tienda</h2>
      
      <div className="mb-4">
        <p className="text-sm text-text-secondary mb-1">Tienda</p>
        <p className="font-medium">{storeName}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCall}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-3 font-medium transition-smooth press-scale hover:bg-primary/90"
        >
          <Icon name="PhoneIcon" size={20} variant="solid" />
          <span>Llamar</span>
        </button>
        
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 bg-success text-success-foreground rounded-lg px-4 py-3 font-medium transition-smooth press-scale hover:bg-success/90"
        >
          <Icon name="ChatBubbleLeftRightIcon" size={20} variant="solid" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

export default ContactStore;