'use client';

import React from 'react';

interface DeliveryOption {
  id: string;
  name: string;
  estimatedTime: string;
  cost: number;
  description: string;
}

interface DeliveryOptionsProps {
  options: DeliveryOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  deliveryAddress: string;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  options,
  selectedId,
  onSelect,
  deliveryAddress
}) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-bold text-foreground">
          Opciones de Entrega
        </h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth">
          Cambiar
        </button>
      </div>

      {/* Delivery Address */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Dirección de entrega</p>
            <p className="text-sm text-text-secondary mt-1">{deliveryAddress}</p>
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 rounded-lg border-2 transition-smooth text-left ${
              selectedId === option.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedId === option.id
                      ? 'border-primary' :'border-gray-300'
                  }`}
                >
                  {selectedId === option.id && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{option.name}</p>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${option.cost === 0 ? 'text-success' : 'text-foreground'}`}>
                  {option.cost === 0 ? 'GRATIS' : `$${option.cost.toLocaleString('es-CO')}`}
                </p>
                <p className="text-xs text-text-secondary">{option.estimatedTime}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;