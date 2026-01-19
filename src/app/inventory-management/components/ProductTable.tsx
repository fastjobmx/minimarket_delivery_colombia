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

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
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
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-warm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <AppImage
                        src={product.image}
                        alt={product.alt}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-foreground">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-primary">
                    {formatCurrency(product.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{product.stock} unidades</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-primary hover:text-primary/80 press-scale"
                      title="Editar"
                    >
                      <Icon name="PencilIcon" size={18} variant="solid" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-error hover:text-error/80 press-scale"
                      title="Eliminar"
                    >
                      <Icon name="TrashIcon" size={18} variant="solid" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;