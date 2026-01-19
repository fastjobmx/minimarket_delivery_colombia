'use client';

import React from 'react';

interface PaymentMethod {
  id: string;
  type: 'nequi' | 'daviplata' | 'pse' | 'card';
  name: string;
  lastDigits?: string;
  isDefault: boolean;
}

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  onSetDefault: (methodId: string) => void;
  onDelete: (methodId: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods,
  onSetDefault,
  onDelete
}) => {
  const getMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'nequi':
        return '💜';
      case 'daviplata':
        return '❤️';
      case 'pse':
        return '🏦';
      case 'card':
        return '💳';
      default:
        return '💰';
    }
  };

  const getMethodColor = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'nequi':
        return 'from-purple-500/10 to-purple-600/10 border-purple-300';
      case 'daviplata':
        return 'from-red-500/10 to-red-600/10 border-red-300';
      case 'pse':
        return 'from-blue-500/10 to-blue-600/10 border-blue-300';
      case 'card':
        return 'from-gray-500/10 to-gray-600/10 border-gray-300';
      default:
        return 'from-gray-100 to-gray-200 border-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold text-foreground">
          Métodos de Pago
        </h2>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar método
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`bg-gradient-to-br ${getMethodColor(method.type)} rounded-xl p-6 border-2 transition-smooth ${
              method.isDefault ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {getMethodIcon(method.type)}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {method.name}
                  </h3>
                  {method.lastDigits && (
                    <p className="text-text-secondary text-sm">
                      •••• {method.lastDigits}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDelete(method.id)}
                className="text-destructive hover:text-destructive/80 p-1 transition-smooth"
                aria-label="Eliminar método de pago"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {method.isDefault ? (
              <div className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full inline-block">
                ✓ Método predeterminado
              </div>
            ) : (
              <button
                onClick={() => onSetDefault(method.id)}
                className="bg-white text-foreground text-sm px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-smooth press-scale"
              >
                Establecer como predeterminado
              </button>
            )}
          </div>
        ))}
      </div>

      {methods.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl">
          <div className="text-6xl mb-4">💳</div>
          <p className="text-text-secondary mb-4">
            No tienes métodos de pago guardados
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale">
            Agregar primer método
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;