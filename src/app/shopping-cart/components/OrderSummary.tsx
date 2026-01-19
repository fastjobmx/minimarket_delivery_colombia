'use client';

import React from 'react';
import Link from 'next/link';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  isMinimumMet: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryFee,
  discount,
  total,
  isMinimumMet
}) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-heading font-bold text-foreground mb-4">
        Resumen del Pedido
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString('es-CO')}</span>
        </div>

        <div className="flex justify-between text-foreground">
          <span>Envío</span>
          <span className={deliveryFee === 0 ? 'text-success font-medium' : ''}>
            {deliveryFee === 0 ? 'GRATIS' : `$${deliveryFee.toLocaleString('es-CO')}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Descuento</span>
            <span>-${discount.toLocaleString('es-CO')}</span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">${total.toLocaleString('es-CO')}</span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            IVA incluido
          </p>
        </div>
      </div>

      {isMinimumMet ? (
        <Link
          href="/payment-selection"
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale flex items-center justify-center gap-2"
        >
          Proceder al Pago
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
        >
          Monto mínimo no alcanzado
        </button>
      )}

      {/* Security Badge */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Pago seguro y protegido</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;