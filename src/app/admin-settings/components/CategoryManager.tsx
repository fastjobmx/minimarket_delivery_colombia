'use client';


import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CategoryManagerProps {
  onSaveSuccess: (message: string) => void;
}

export default function CategoryManager({ onSaveSuccess }: CategoryManagerProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold mb-2">Gestión de Categorías</h2>
        <p className="text-muted-foreground mb-6">
          La gestión completa de categorías está disponible en el módulo de inventario
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <h3 className="font-semibold mb-2">Acceso Rápido</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ve al módulo de inventario para crear, editar y administrar todas tus categorías de productos.
        </p>
        <Link
          href="/inventory-management"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
        >
          Ir a Gestión de Inventario
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-background border border-border rounded-xl p-6">
          <h4 className="font-semibold mb-3">Características Disponibles</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Crear y editar categorías
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Asignar imágenes y descripciones
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Organizar productos por categoría
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Ver estadísticas de productos
            </li>
          </ul>
        </div>

        <div className="bg-background border border-border rounded-xl p-6">
          <h4 className="font-semibold mb-3">Acciones Rápidas</h4>
          <div className="space-y-3">
            <Link
              href="/inventory-management"
              className="block px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors"
            >
              Ver todas las categorías
            </Link>
            <Link
              href="/inventory-management"
              className="block px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors"
            >
              Crear nueva categoría
            </Link>
            <Link
              href="/inventory-management"
              className="block px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm transition-colors"
            >
              Gestionar productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}