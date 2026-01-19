'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NequiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: (phoneNumber: string) => void;
}

const NequiPaymentModal = ({
  isOpen,
  onClose,
  amount,
  onConfirm,
}: NequiPaymentModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated || !isOpen) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      onConfirm(phoneNumber);
    }
  };

  const isValidPhone = phoneNumber.length === 10;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-warm-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-heading font-bold text-xl">Pago con Nequi</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth press-scale"
            aria-label="Cerrar"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-sm text-text-secondary mb-2">Monto a pagar</p>
            <p className="font-heading font-bold text-3xl text-primary data-text">
              {formatCurrency(amount)}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="nequi-phone" className="block text-sm font-medium">
              Número de celular Nequi
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-text-secondary">
                <Icon name="DevicePhoneMobileIcon" size={20} />
                <span className="text-sm font-medium">+57</span>
              </div>
              <input
                id="nequi-phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="3001234567"
                className="w-full pl-20 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus-ring transition-smooth"
                maxLength={10}
              />
            </div>
            <p className="text-xs text-text-secondary caption">
              Ingresa tu número de celular registrado en Nequi
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-1">¿Cómo funciona?</p>
                <ul className="text-xs text-text-secondary space-y-1 caption">
                  <li>1. Recibirás una notificación en tu app Nequi</li>
                  <li>2. Confirma el pago en tu aplicación</li>
                  <li>3. Tu pedido será procesado automáticamente</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-smooth press-scale"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValidPhone}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NequiPaymentModal;