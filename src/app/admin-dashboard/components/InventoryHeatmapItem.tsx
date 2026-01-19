import React from 'react';


interface InventoryHeatmapItemProps {
  productName: string;
  stock: number;
  status: string;
}

const InventoryHeatmapItem = ({ productName, stock, status }: InventoryHeatmapItemProps) => {
  // Determine trend based on stock level
  const getTrend = (stockLevel: number): 'hot' | 'warm' | 'cold' => {
    if (stockLevel < 10) return 'hot';
    if (stockLevel < 20) return 'warm';
    return 'cold';
  };

  const trend = getTrend(stock);

  const trendConfig = {
    hot: {
      label: 'Stock Bajo',
      className: 'bg-error/10 text-error border-error/20',
      dotColor: 'bg-error',
    },
    warm: {
      label: 'Stock Medio',
      className: 'bg-warning/10 text-warning border-warning/20',
      dotColor: 'bg-warning',
    },
    cold: {
      label: 'Stock Normal',
      className: 'bg-muted text-text-secondary border-border',
      dotColor: 'bg-text-secondary',
    },
  };

  const config = trendConfig[trend];

  return (
    <div className="bg-card rounded-lg p-3 border border-border hover:shadow-warm transition-smooth">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm line-clamp-1 flex-1">{productName}</h4>
          <div className={`w-2 h-2 rounded-full ${config.dotColor} flex-shrink-0`} />
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.className}`}>
            {config.label}
          </span>
          <div className="text-right">
            <p className={`text-sm font-bold data-text ${stock < 10 ? 'text-error' : stock < 20 ? 'text-warning' : 'text-text-primary'}`}>
              {stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryHeatmapItem;