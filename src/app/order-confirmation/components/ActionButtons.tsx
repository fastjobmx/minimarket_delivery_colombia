'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface ActionButtonsProps {
  orderNumber: string;
  onDownloadReceipt: () => void;
  onEnableNotifications: () => void;
}

const ActionButtons = ({ orderNumber, onDownloadReceipt, onEnableNotifications }: ActionButtonsProps) => {
  return (
    <div className="space-y-3 mb-6">
      <button
        onClick={onDownloadReceipt}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-lg px-6 py-4 font-medium transition-smooth press-scale hover:bg-accent/90 shadow-warm"
      >
        <Icon name="ArrowDownTrayIcon" size={20} variant="solid" />
        <span>Descargar Recibo</span>
      </button>
      
      <button
        onClick={onEnableNotifications}
        className="w-full flex items-center justify-center gap-2 bg-card text-primary border-2 border-primary rounded-lg px-6 py-4 font-medium transition-smooth press-scale hover:bg-primary hover:text-primary-foreground"
      >
        <Icon name="BellIcon" size={20} variant="outline" />
        <span>Activar Notificaciones</span>
      </button>
      
      <Link
        href="/home-product-catalog"
        className="w-full flex items-center justify-center gap-2 bg-muted text-text-primary rounded-lg px-6 py-4 font-medium transition-smooth press-scale hover:bg-muted/80"
      >
        <Icon name="ShoppingBagIcon" size={20} variant="outline" />
        <span>Continuar Comprando</span>
      </Link>
    </div>
  );
};

export default ActionButtons;