'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface ThemeCustomizerProps {
  onSaveSuccess: (message: string) => void;
}

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: string[];
}

export default function ThemeCustomizer({ onSaveSuccess }: ThemeCustomizerProps) {
  const [selectedScheme, setSelectedScheme] = useState('default');
  const [customColors, setCustomColors] = useState({
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
  });

  const colorSchemes: ColorScheme[] = [
    {
      id: 'default',
      name: 'Azul Clásico',
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      preview: ['#3B82F6', '#10B981', '#F59E0B'],
    },
    {
      id: 'purple',
      name: 'Morado Elegante',
      primary: '#9333EA',
      secondary: '#EC4899',
      accent: '#F97316',
      preview: ['#9333EA', '#EC4899', '#F97316'],
    },
    {
      id: 'green',
      name: 'Verde Natural',
      primary: '#059669',
      secondary: '#10B981',
      accent: '#FBBF24',
      preview: ['#059669', '#10B981', '#FBBF24'],
    },
    {
      id: 'red',
      name: 'Rojo Vibrante',
      primary: '#DC2626',
      secondary: '#F59E0B',
      accent: '#3B82F6',
      preview: ['#DC2626', '#F59E0B', '#3B82F6'],
    },
  ];

  const handleSaveTheme = () => {
    // In production, this would save to Supabase
    localStorage.setItem('theme_settings', JSON.stringify({
      scheme: selectedScheme,
      customColors,
    }));
    onSaveSuccess('Tema actualizado exitosamente');
  };

  return (
    <div className="p-6 space-y-8">
      {/* Predefined Color Schemes */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-4">Esquemas de Color Predefinidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => setSelectedScheme(scheme.id)}
              className={`
                relative bg-background border-2 rounded-xl p-4 transition-all duration-200
                ${
                  selectedScheme === scheme.id
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-border hover:border-muted-foreground'
                }
              `}
            >
              {selectedScheme === scheme.id && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <CheckIcon className="h-4 w-4" />
                </div>
              )}
              <h3 className="font-semibold mb-3 text-left">{scheme.name}</h3>
              <div className="flex gap-2">
                {scheme.preview.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 h-12 rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Custom Color Picker */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-4">Colores Personalizados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Color Primario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={customColors.primary}
                onChange={(e) =>
                  setCustomColors({ ...customColors, primary: e.target.value })
                }
                className="h-12 w-12 rounded-lg cursor-pointer border-2 border-border"
              />
              <input
                type="text"
                value={customColors.primary}
                onChange={(e) =>
                  setCustomColors({ ...customColors, primary: e.target.value })
                }
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color Secundario</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={customColors.secondary}
                onChange={(e) =>
                  setCustomColors({ ...customColors, secondary: e.target.value })
                }
                className="h-12 w-12 rounded-lg cursor-pointer border-2 border-border"
              />
              <input
                type="text"
                value={customColors.secondary}
                onChange={(e) =>
                  setCustomColors({ ...customColors, secondary: e.target.value })
                }
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color de Acento</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={customColors.accent}
                onChange={(e) =>
                  setCustomColors({ ...customColors, accent: e.target.value })
                }
                className="h-12 w-12 rounded-lg cursor-pointer border-2 border-border"
              />
              <input
                type="text"
                value={customColors.accent}
                onChange={(e) =>
                  setCustomColors({ ...customColors, accent: e.target.value })
                }
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg font-mono"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Typography Settings */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-4">Tipografía</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Fuente para Títulos</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg">
              <option>Inter (Actual)</option>
              <option>Roboto</option>
              <option>Poppins</option>
              <option>Montserrat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fuente para Texto</label>
            <select className="w-full px-4 py-2 bg-background border border-border rounded-lg">
              <option>Inter (Actual)</option>
              <option>Open Sans</option>
              <option>Lato</option>
              <option>Nunito</option>
            </select>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-4">Vista Previa</h2>
        <div
          className="border border-border rounded-xl p-6"
          style={{ backgroundColor: customColors.primary + '10' }}
        >
          <div className="bg-card rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-bold" style={{ color: customColors.primary }}>
              Título de Ejemplo
            </h3>
            <p className="text-muted-foreground">
              Este es un texto de ejemplo para visualizar cómo se verá tu tema personalizado.
            </p>
            <div className="flex gap-3">
              <button
                className="px-6 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: customColors.primary }}
              >
                Botón Primario
              </button>
              <button
                className="px-6 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: customColors.secondary }}
              >
                Botón Secundario
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <button className="px-6 py-2 bg-background border border-border rounded-lg font-medium hover:bg-muted transition-colors">
          Restablecer
        </button>
        <button
          onClick={handleSaveTheme}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}