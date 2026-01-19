'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low_stock' | 'out_of_stock';
  image: string;
  alt: string;
  description: string;
  lastUpdated: string;
}

interface ProductEditorModalProps {
  isOpen: boolean;
  product: Product | null;
  categories: string[];
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

const ProductEditorModal = ({ isOpen, product, categories, onClose, onSave }: ProductEditorModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'available\' as \'available\' | \'low_stock\' | \'out_of_stock',
    description: '',
    image: '',
    alt: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        status: product.status || 'available',
        description: product.description || '',
        image: product.image || '',
        alt: product.alt || '',
      });
      setImagePreview(product.image || '');
    } else {
      setFormData({
        name: '',
        category: categories[0] || '',
        price: '',
        stock: '',
        status: 'available',
        description: '',
        image: '',
        alt: '',
      });
      setImagePreview('');
    }
    setErrors({});
  }, [product, categories, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'La imagen debe ser menor a 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser mayor o igual a 0';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    if (!formData.image) {
      newErrors.image = 'La imagen es requerida';
    }
    if (!formData.alt.trim()) {
      newErrors.alt = 'El texto alternativo es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        id: product?.id,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: formData.status,
        description: formData.description,
        image: formData.image,
        alt: formData.alt,
        lastUpdated: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-warm-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-heading font-bold">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth press-scale"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Imagen del Producto</label>
              <div className="flex flex-col gap-4">
                {imagePreview && (
                  <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                    <AppImage
                      src={imagePreview}
                      alt={formData.alt || 'Vista previa del producto'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-smooth press-scale">
                  <Icon name="PhotoIcon" size={20} />
                  <span className="font-medium">Seleccionar Imagen</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.image && <p className="text-error text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Alt Text */}
            <div>
              <label htmlFor="alt" className="block text-sm font-medium mb-2">
                Texto Alternativo (Descripción de la imagen)
              </label>
              <input
                type="text"
                id="alt"
                name="alt"
                value={formData.alt}
                onChange={handleChange}
                placeholder="Ej: Manzana roja fresca sobre fondo blanco"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
              {errors.alt && <p className="text-error text-sm mt-1">{errors.alt}</p>}
            </div>

            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Manzana Roja"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
              {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Categoría
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-error text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2">
                  Precio (COP)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="100"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth data-text"
                />
                {errors.price && <p className="text-error text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium mb-2">
                  Stock (Unidades)
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth data-text"
                />
                {errors.stock && <p className="text-error text-sm mt-1">{errors.stock}</p>}
              </div>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-2">
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              >
                <option value="available">Disponible</option>
                <option value="low_stock">Stock Bajo</option>
                <option value="out_of_stock">Agotado</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe el producto..."
                rows={4}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth resize-none"
              />
              {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-smooth press-scale font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth press-scale font-medium shadow-warm"
            >
              {product ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditorModal;