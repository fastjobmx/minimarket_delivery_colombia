'use client';

import React, { useState } from 'react';

const AccountSecurity = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-1">
              Cambiar Contraseña
            </h3>
            <p className="text-sm text-text-secondary">
              Actualiza tu contraseña regularmente para mayor seguridad
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale"
          >
            {showPasswordForm ? 'Cancelar' : 'Cambiar'}
          </button>
        </div>

        {showPasswordForm && (
          <form className="space-y-4 pt-4 border-t border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contraseña actual
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nueva contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirmar nueva contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
                placeholder="Repite la nueva contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale"
            >
              Actualizar contraseña
            </button>
          </form>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-heading font-bold text-foreground">
                Autenticación de dos factores
              </h3>
              {twoFactorEnabled && (
                <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full">
                  Activa
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Agrega una capa adicional de seguridad a tu cuenta mediante un código de verificación
            </p>

            {twoFactorEnabled && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-foreground">
                  La autenticación de dos factores está activa. Necesitarás un código de tu dispositivo 
                  para iniciar sesión.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-smooth press-scale ${
              twoFactorEnabled ? 'bg-primary' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={twoFactorEnabled}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      {/* Login History */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-heading font-bold text-foreground mb-4">
          Historial de Acceso
        </h3>

        <div className="space-y-3">
          {[
            { device: 'Chrome en Windows', location: 'Bogotá, Colombia', time: 'Hace 5 minutos', current: true },
            { device: 'Safari en iPhone', location: 'Medellín, Colombia', time: 'Hace 2 horas', current: false },
            { device: 'Chrome en Android', location: 'Cali, Colombia', time: 'Hace 1 día', current: false }
          ]?.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    {session?.device}
                    {session?.current && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-0.5 rounded-full">
                        Actual
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {session?.location} • {session?.time}
                  </p>
                </div>
              </div>

              {!session?.current && (
                <button className="text-destructive hover:text-destructive/80 text-sm font-medium transition-smooth">
                  Cerrar sesión
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Account Actions */}
      <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-destructive/20">
        <h3 className="text-lg font-heading font-bold text-destructive mb-2">
          Zona de Peligro
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Estas acciones son permanentes y no se pueden deshacer
        </p>

        <div className="space-y-3">
          <button className="w-full bg-destructive/10 text-destructive py-3 rounded-lg font-medium hover:bg-destructive/20 transition-smooth press-scale">
            Desactivar cuenta temporalmente
          </button>

          <button className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg font-medium hover:bg-destructive/90 transition-smooth press-scale">
            Eliminar cuenta permanentemente
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;