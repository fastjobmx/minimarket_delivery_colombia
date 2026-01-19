'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface PaymentMethodCardProps {
  id: string;
  name: string;
  logo: string;
  logoAlt: string;
  description: string;
  processingTime: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  trustIndicator?: string;
}

const PaymentMethodCard = ({
  id,
  name,
  logo,
  logoAlt,
  description,
  processingTime,
  isSelected,
  onSelect,
  trustIndicator,
}: PaymentMethodCardProps) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`w-full text-left p-4 lg:p-6 rounded-xl border-2 transition-all duration-300 press-scale ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-warm-md'
          : 'border-border bg-card hover:border-primary/30 hover:shadow-warm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-background rounded-lg p-2 flex items-center justify-center overflow-hidden">
          <AppImage
            src={logo}
            alt={logoAlt}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-heading font-bold text-lg">{name}</h3>
            {isSelected && (
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="CheckIcon" size={16} variant="solid" className="text-primary-foreground" />
              </div>
            )}
          </div>
          
          <p className="text-sm text-text-secondary mb-2 line-clamp-2">
            {description}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-text-secondary caption">
              <Icon name="ClockIcon" size={14} />
              {processingTime}
            </span>
            {trustIndicator && (
              <span className="flex items-center gap-1 text-success caption">
                <Icon name="ShieldCheckIcon" size={14} variant="solid" />
                {trustIndicator}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default PaymentMethodCard;