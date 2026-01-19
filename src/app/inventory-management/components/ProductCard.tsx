'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low_stock' | 'out_of_stock';
  image: string;
  alt: string;
  lastUpdated: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onToggleStatus: (productId: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete, onToggleStatus }: ProductCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success';
      case 'low_stock':
        return 'bg-warning/10 text-warning';
      case 'out_of_stock':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'low_stock':
        return 'Stock Bajo';
      case 'out_of_stock':
        return 'Agotado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth">
      <div className="relative h-48 bg-muted overflow-hidden">
        <AppImage
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(product.status)}`}>
            {getStatusText(product.status)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-text-secondary caption">{product.category}</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-primary data-text">{formatCurrency(product.price)}</p>
            <p className="text-sm text-text-secondary mt-1">
              Stock: <span className="font-semibold data-text">{product.stock}</span> unidades
            </p>
          </div>
        </div>

        <div className="text-xs text-text-secondary caption mb-4">
          Actualizado: {product.lastUpdated}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth press-scale font-medium"
          >
            <Icon name="PencilIcon" size={18} variant="solid" />
            <span>Editar</span>
          </button>
          <button
            onClick={() => onToggleStatus(product.id)}
            className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth press-scale"
            title="Cambiar estado"
          >
            <Icon name="ArrowPathIcon" size={18} variant="solid" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="px-4 py-2.5 bg-error text-error-foreground rounded-lg hover:bg-error/90 transition-smooth press-scale"
            title="Eliminar"
          >
            <Icon name="TrashIcon" size={18} variant="solid" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;