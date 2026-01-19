'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FloatingCartProps {
  itemCount?: number;
  totalAmount?: number;
  onCartClick?: () => void;
}

const FloatingCart = ({ 
  itemCount = 0, 
  totalAmount = 0,
  onCartClick 
}: FloatingCartProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsExpanded(false);
    }
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Floating Cart */}
      <Link
        href="/payment-selection"
        onClick={handleClick}
        className="lg:hidden fixed bottom-20 right-4 z-floating-cart"
      >
        <div className="bg-accent text-accent-foreground rounded-full shadow-warm-xl press-scale transition-smooth">
          <div className="relative p-4">
            <Icon name="ShoppingCartIcon" size={28} variant="solid" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-warm data-text">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          </div>
        </div>
      </Link>

      {/* Desktop Floating Cart with Expansion */}
      <div
        className="hidden lg:block fixed bottom-8 right-8 z-floating-cart"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/payment-selection" onClick={handleClick}>
          <div
            className={`bg-accent text-accent-foreground rounded-2xl shadow-warm-xl press-scale transition-all duration-300 ${
              isExpanded ? 'pr-6' : ''
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              <div className="relative">
                <Icon name="ShoppingCartIcon" size={28} variant="solid" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-warm data-text">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              </div>
              
              {isExpanded && (
                <div className="flex flex-col gap-1 min-w-[120px] animate-in fade-in slide-in-from-right-4 duration-300">
                  <span className="text-sm font-medium opacity-90">
                    {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
                  </span>
                  <span className="text-lg font-bold data-text">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FloatingCart;