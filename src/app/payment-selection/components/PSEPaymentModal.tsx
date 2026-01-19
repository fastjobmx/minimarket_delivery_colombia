'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PSEPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: (bank: string, documentType: string, documentNumber: string) => void;
}

const PSEPaymentModal = ({
  isOpen,
  onClose,
  amount,
  onConfirm,
}: PSEPaymentModalProps) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState('');
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

  const banks = [
    { id: 'bancolombia', name: 'Bancolombia' },
    { id: 'davivienda', name: 'Davivienda' },
    { id: 'bbva', name: 'BBVA Colombia' },
    { id: 'banco-bogota', name: 'Banco de Bogotá' },
    { id: 'banco-occidente', name: 'Banco de Occidente' },
    { id: 'colpatria', name: 'Scotiabank Colpatria' },
  ];

  const documentTypes = [
    { id: 'CC', name: 'Cédula de Ciudadanía' },
    { id: 'CE', name: 'Cédula de Extranjería' },
    { id: 'NIT', name: 'NIT' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBank && documentNumber) {
      onConfirm(selectedBank, documentType, documentNumber);
    }
  };

  const isValidForm = selectedBank && documentNumber.length >= 6;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-warm-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-xl">Pago PSE</h3>
            <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full">
              <Icon name="LockClosedIcon" size={14} variant="solid" className="text-success" />
              <span className="text-xs font-medium text-success caption">Seguro</span>
            </div>
          </div>
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
            <label htmlFor="bank-select" className="block text-sm font-medium">
              Selecciona tu banco
            </label>
            <div className="relative">
              <Icon name="BuildingLibraryIcon" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <select
                id="bank-select"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-input border border-border rounded-lg focus:outline-none focus-ring transition-smooth appearance-none"
              >
                <option value="">Seleccionar banco</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
              <Icon name="ChevronDownIcon" size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="document-type" className="block text-sm font-medium">
              Tipo de documento
            </label>
            <div className="relative">
              <Icon name="IdentificationIcon" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <select
                id="document-type"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-input border border-border rounded-lg focus:outline-none focus-ring transition-smooth appearance-none"
              >
                {documentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <Icon name="ChevronDownIcon" size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="document-number" className="block text-sm font-medium">
              Número de documento
            </label>
            <input
              id="document-number"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="1234567890"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus-ring transition-smooth"
            />
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="ShieldCheckIcon" size={20} className="text-success flex-shrink-0 mt-0.5" variant="solid" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-1">Pago seguro</p>
                <p className="text-xs text-text-secondary caption">
                  Serás redirigido al portal de tu banco para completar la transacción de forma segura.
                </p>
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
              disabled={!isValidForm}
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

export default PSEPaymentModal;