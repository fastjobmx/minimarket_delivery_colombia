'use client';

import React from 'react';

interface NotificationPreference {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface NotificationSettingsProps {
  preferences: NotificationPreference[];
  onToggle: (notificationId: string) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  preferences,
  onToggle
}) => {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground mb-2">
          Preferencias de Notificaciones
        </h2>
        <p className="text-text-secondary text-sm">
          Controla qué tipo de notificaciones deseas recibir
        </p>
      </div>

      <div className="space-y-3">
        {preferences.map((preference) => (
          <div
            key={preference.id}
            className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-smooth"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="font-medium text-foreground mb-1">
                  {preference.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {preference.description}
                </p>
              </div>

              <button
                onClick={() => onToggle(preference.id)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-smooth press-scale ${
                  preference.enabled ? 'bg-primary' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={preference.enabled}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                    preference.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-medium text-foreground mb-2">
              Sobre las Notificaciones Web
            </h3>
            <p className="text-sm text-text-secondary">
              Las notificaciones te mantienen informado sobre el estado de tus pedidos y ofertas especiales. 
              Puedes desactivarlas en cualquier momento desde esta configuración.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;