'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderFiltersProps {
  statusFilter: string;
  paymentFilter: string;
  dateRange: { start: string; end: string };
  searchQuery: string;
  onStatusChange: (status: string) => void;
  onPaymentChange: (payment: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  orderCounts: {
    all: number;
    pending: number;
    preparing: number;
    outForDelivery: number;
    delivered: number;
  };
}

const OrderFilters = ({
  statusFilter,
  paymentFilter,
  dateRange,
  searchQuery,
  onStatusChange,
  onPaymentChange,
  onDateRangeChange,
  onSearchChange,
  onClearFilters,
  orderCounts,
}: OrderFiltersProps) => {
  const statusOptions = [
    { value: 'all', label: 'Todos', count: orderCounts.all },
    { value: 'pending', label: 'Pendiente', count: orderCounts.pending },
    { value: 'preparing', label: 'Preparando', count: orderCounts.preparing },
    { value: 'outForDelivery', label: 'En Camino', count: orderCounts.outForDelivery },
    { value: 'delivered', label: 'Entregado', count: orderCounts.delivered },
  ];

  const paymentOptions = [
    { value: 'all', label: 'Todos los métodos' },
    { value: 'nequi', label: 'Nequi' },
    { value: 'daviplata', label: 'Daviplata' },
    { value: 'pse', label: 'PSE' },
    { value: 'cash', label: 'Efectivo' },
  ];

  const hasActiveFilters = statusFilter !== 'all' || paymentFilter !== 'all' || dateRange.start || dateRange.end || searchQuery;

  return (
    <div className="bg-card rounded-xl border border-border p-4 lg:p-6 shadow-warm mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Buscar por número de orden, cliente o teléfono..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusChange(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-smooth press-scale ${
              statusFilter === option.value
                ? 'bg-primary text-primary-foreground shadow-warm'
                : 'bg-muted text-text-secondary hover:bg-muted/80'
            }`}
          >
            {option.label}
            <span className="ml-2 data-text">({option.count})</span>
          </button>
        ))}
      </div>

      {/* Additional Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Payment Method Filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Método de Pago
          </label>
          <select
            value={paymentFilter}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          >
            {paymentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Start */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Fecha Inicio
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>

        {/* Date Range End */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Fecha Fin
          </label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth press-scale"
          >
            <Icon name="XMarkIcon" size={16} />
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;