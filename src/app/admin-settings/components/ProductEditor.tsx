'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ProductEditorProps {
  onSaveSuccess: (message: string) => void;
}

export default function ProductEditor({ onSaveSuccess }: ProductEditorProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold mb-2">Editor de Productos</h2>
        <p className="text-muted-foreground mb-6">
          La gestión completa de productos está disponible en el módulo de inventario
        </p>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
        <h3 className="font-semibold mb-2">Acceso Directo</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ve al módulo de inventario para crear, editar, actualizar stock y administrar todos tus productos.
        </p>
        <Link
          href="/inventory-management"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
        >
          Ir a Gestión de Inventario
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background border border-border rounded-xl p-6">
          <h4 className="font-semibold mb-3">Información del Producto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Nombre y descripción
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Precios y descuentos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Imágenes del producto
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Categoría y etiquetas
            </li>
          </ul>
        </div>

        <div className="bg-background border border-border rounded-xl p-6">
          <h4 className="font-semibold mb-3">Control de Inventario</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Stock disponible
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Punto de reorden
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Estado (activo/inactivo)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Historial de movimientos
            </li>
          </ul>
        </div>

        <div className="bg-background border border-border rounded-xl p-6">
          <h4 className="font-semibold mb-3">Acciones</h4>
          <div className="space-y-3">
            <Link
              href="/inventory-management"
              className="block px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors text-center"
            >
              Ver todos los productos
            </Link>
            <Link
              href="/inventory-management"
              className="block px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors text-center"
            >
              Agregar nuevo producto
            </Link>
            <Link
              href="/inventory-management"
              className="block px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors text-center"
            >
              Gestionar categorías
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}