import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatsCardsProps {
  totalProducts: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
}

const StatsCards = ({ totalProducts, lowStock, outOfStock, totalValue }: StatsCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      label: 'Total Productos',
      value: (totalProducts || 0).toString(),
      icon: 'CubeIcon',
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Stock Bajo',
      value: (lowStock || 0).toString(),
      icon: 'ExclamationTriangleIcon',
      color: 'bg-warning/10 text-warning',
    },
    {
      label: 'Agotados',
      value: (outOfStock || 0).toString(),
      icon: 'XCircleIcon',
      color: 'bg-error/10 text-error',
    },
    {
      label: 'Valor Total',
      value: formatCurrency(totalValue || 0),
      icon: 'CurrencyDollarIcon',
      color: 'bg-success/10 text-success',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border border-border p-6 shadow-warm hover:shadow-warm-md transition-smooth"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <Icon name={stat.icon as any} size={24} variant="solid" />
            </div>
          </div>
          <p className="text-text-secondary text-sm mb-1">{stat.label}</p>
          <p className="text-2xl font-bold data-text">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;