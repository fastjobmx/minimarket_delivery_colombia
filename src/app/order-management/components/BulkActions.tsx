'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface BulkActionsProps {
  selectedCount: number;
  onBulkStatusChange: (status: string) => void;
  onExport: () => void;
  onClearSelection: () => void;
}

const BulkActions = ({
  selectedCount,
  onBulkStatusChange,
  onExport,
  onClearSelection,
}: BulkActionsProps) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-floating-cart animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-card rounded-xl border border-border shadow-warm-xl p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm data-text">
            {selectedCount}
          </div>
          <span className="font-medium text-sm">
            {selectedCount === 1 ? 'orden seleccionada' : 'órdenes seleccionadas'}
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <select
            onChange={(e) => {
              if (e.target.value) {
                onBulkStatusChange(e.target.value);
                e.target.value = '';
              }
            }}
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
            defaultValue=""
          >
            <option value="" disabled>
              Cambiar Estado
            </option>
            <option value="pending">Pendiente</option>
            <option value="preparing">Preparando</option>
            <option value="outForDelivery">En Camino</option>
            <option value="delivered">Entregado</option>
          </select>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-smooth press-scale"
          >
            <Icon name="ArrowDownTrayIcon" size={16} />
            <span>Exportar</span>
          </button>

          <button
            onClick={onClearSelection}
            className="p-1.5 hover:bg-muted rounded-lg transition-smooth press-scale"
            title="Limpiar selección"
          >
            <Icon name="XMarkIcon" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;