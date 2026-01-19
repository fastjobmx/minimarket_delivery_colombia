'use client';

import { useState } from 'react';

interface GeneralSettingsProps {
  onSaveSuccess: (message: string) => void;
}

export default function GeneralSettings({ onSaveSuccess }: GeneralSettingsProps) {
  const [settings, setSettings] = useState({
    storeName: 'MiniMarket Delivery',
    storeDescription: 'Productos frescos a tu puerta en 30 minutos',
    contactEmail: 'contacto@minimarket.com',
    contactPhone: '+57 300 123 4567',
    whatsappNumber: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá, Colombia',
    deliveryTime: '30',
    minOrderAmount: '15000',
    shippingCost: '5000',
    freeShippingThreshold: '50000',
    currency: 'COP',
    timezone: 'America/Bogota',
    language: 'es',
  });

  const handleSave = () => {
    // In production, this would save to Supabase
    localStorage.setItem('general_settings', JSON.stringify(settings));
    onSaveSuccess('Configuración general guardada exitosamente');
  };

  return (
    <div className="p-6 space-y-8">
      {/* Store Information */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-4">Información de la Tienda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre de la Tienda</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Eslogan/Descripción</label>
            <input
              type="text"
              value={settings.storeDescription}
              onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email de Contacto</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Teléfono de Contacto</label>
            <input
              type="tel"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Número de WhatsApp</label>
            <input
              type="tel"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Dirección</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Delivery Settings */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-4">Configuración de Entrega</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tiempo de Entrega (minutos)</label>
            <input
              type="number"
              value={settings.deliveryTime}
              onChange={(e) => setSettings({ ...settings, deliveryTime: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Monto Mínimo de Pedido ($)</label>
            <input
              type="number"
              value={settings.minOrderAmount}
              onChange={(e) => setSettings({ ...settings, minOrderAmount: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Costo de Envío ($)</label>
            <input
              type="number"
              value={settings.shippingCost}
              onChange={(e) => setSettings({ ...settings, shippingCost: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Envío Gratis desde ($)</label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Regional Settings */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-4">Configuración Regional</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Moneda</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            >
              <option value="COP">Peso Colombiano (COP)</option>
              <option value="USD">Dólar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Zona Horaria</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            >
              <option value="America/Bogota">Bogotá (GMT-5)</option>
              <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
              <option value="America/New_York">Nueva York (GMT-5)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Idioma</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <button className="px-6 py-2 bg-background border border-border rounded-lg font-medium hover:bg-muted transition-colors">
          Restablecer
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}