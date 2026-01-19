'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface DaviplataPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: (receiptFile: File) => void;
}

const DaviplataPaymentModal = ({
  isOpen,
  onClose,
  amount,
  onConfirm,
}: DaviplataPaymentModalProps) => {
  const [receiptPreview, setReceiptPreview] = useState<string>('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 5MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida.');
        return;
      }

      setReceiptFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiptFile) {
      onConfirm(receiptFile);
    }
  };

  const handleRemoveReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-warm-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-heading font-bold text-xl">Pago con Daviplata</h3>
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

          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-2">Instrucciones de pago</p>
                <ol className="text-xs text-text-secondary space-y-1 caption list-decimal list-inside">
                  <li>Abre tu app Daviplata</li>
                  <li>Realiza la transferencia al número: <span className="font-semibold data-text">321 456 7890</span></li>
                  <li>Toma captura del comprobante</li>
                  <li>Sube la imagen aquí</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Comprobante de pago
            </label>
            
            {!receiptPreview ? (
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="receipt-upload"
                />
                <label
                  htmlFor="receipt-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-smooth cursor-pointer bg-muted/30 press-scale"
                >
                  <Icon name="CloudArrowUpIcon" size={48} className="text-text-secondary mb-2" />
                  <p className="text-sm font-medium text-text-secondary">
                    Toca para subir imagen
                  </p>
                  <p className="text-xs text-text-secondary caption mt-1">
                    PNG, JPG hasta 5MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-border">
                <AppImage
                  src={receiptPreview}
                  alt="Vista previa del comprobante de pago Daviplata"
                  className="w-full h-64 object-contain bg-muted"
                />
                <button
                  type="button"
                  onClick={handleRemoveReceipt}
                  className="absolute top-2 right-2 p-2 bg-error text-error-foreground rounded-lg shadow-warm hover:bg-error/90 transition-smooth press-scale"
                  aria-label="Eliminar imagen"
                >
                  <Icon name="TrashIcon" size={20} variant="solid" />
                </button>
              </div>
            )}
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
              disabled={!receiptFile}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DaviplataPaymentModal;