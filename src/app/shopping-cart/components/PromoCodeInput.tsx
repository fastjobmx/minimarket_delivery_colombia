'use client';

import React, { useState } from 'react';

interface PromoCodeInputProps {
  promoCode: string;
  discount: number;
  onApply: (code: string) => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  promoCode,
  discount,
  onApply
}) => {
  const [inputValue, setInputValue] = useState(promoCode);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleApply = () => {
    const code = inputValue.trim().toUpperCase();
    
    if (!code) {
      setMessage('Por favor ingresa un código');
      setMessageType('error');
      return;
    }

    onApply(code);

    const validCodes: Record<string, number> = {
      'PRIMERA10': 10,
      'VERANO15': 15,
      'CLIENTE20': 20
    };

    if (validCodes[code]) {
      setMessage(`¡Código aplicado! ${validCodes[code]}% de descuento`);
      setMessageType('success');
    } else {
      setMessage('Código inválido o expirado');
      setMessageType('error');
    }
  };

  const handleClear = () => {
    setInputValue('');
    setMessage('');
    onApply('');
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-heading font-bold text-foreground mb-4">
        Código Promocional
      </h2>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          placeholder="Ingresa tu código"
          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
          maxLength={20}
        />
        {discount > 0 ? (
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-200 text-foreground rounded-lg font-medium hover:bg-gray-300 transition-smooth press-scale"
          >
            Quitar
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale"
          >
            Aplicar
          </button>
        )}
      </div>

      {message && (
        <div className={`text-sm ${messageType === 'success' ? 'text-success' : 'text-destructive'}`}>
          {messageType === 'success' ? '✓' : '✗'} {message}
        </div>
      )}

      {/* Available Promo Codes (for demo purposes) */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-secondary mb-2">Códigos disponibles:</p>
        <div className="space-y-1">
          <div className="text-xs text-text-secondary">
            • <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">PRIMERA10</span> - 10% de descuento
          </div>
          <div className="text-xs text-text-secondary">
            • <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">VERANO15</span> - 15% de descuento
          </div>
          <div className="text-xs text-text-secondary">
            • <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">CLIENTE20</span> - 20% de descuento
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeInput;