'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onEditCategory: (oldCategory: string, newCategory: string) => void;
  onDeleteCategory: (category: string) => void;
}

const CategoryManager = ({ categories, onAddCategory, onEditCategory, onDeleteCategory }: CategoryManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  const handleEditCategory = (oldCategory: string) => {
    if (editCategoryName.trim() && editCategoryName.trim() !== oldCategory) {
      onEditCategory(oldCategory, editCategoryName.trim());
      setEditingCategory(null);
      setEditCategoryName('');
    } else {
      setEditingCategory(null);
      setEditCategoryName('');
    }
  };

  const startEditing = (category: string) => {
    setEditingCategory(category);
    setEditCategoryName(category);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-warm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-bold">Gestión de Categorías</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth press-scale font-medium"
        >
          <Icon name="PlusIcon" size={18} variant="solid" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la categoría"
              className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              autoFocus
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-smooth press-scale"
              title="Guardar"
            >
              <Icon name="CheckIcon" size={20} variant="solid" />
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName('');
              }}
              className="px-4 py-2 bg-error text-error-foreground rounded-lg hover:bg-error/90 transition-smooth press-scale"
              title="Cancelar"
            >
              <Icon name="XMarkIcon" size={20} variant="solid" />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
          >
            {editingCategory === category ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                  onKeyPress={(e) => e.key === 'Enter' && handleEditCategory(category)}
                  autoFocus
                />
                <button
                  onClick={() => handleEditCategory(category)}
                  className="px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-smooth press-scale"
                  title="Guardar"
                >
                  <Icon name="CheckIcon" size={20} variant="solid" />
                </button>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setEditCategoryName('');
                  }}
                  className="px-4 py-2 bg-error text-error-foreground rounded-lg hover:bg-error/90 transition-smooth press-scale"
                  title="Cancelar"
                >
                  <Icon name="XMarkIcon" size={20} variant="solid" />
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium">{category}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(category)}
                    className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-smooth press-scale"
                    title="Editar"
                  >
                    <Icon name="PencilIcon" size={18} variant="solid" />
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category)}
                    className="p-2 rounded-lg hover:bg-error/10 text-error transition-smooth press-scale"
                    title="Eliminar"
                  >
                    <Icon name="TrashIcon" size={18} variant="solid" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;