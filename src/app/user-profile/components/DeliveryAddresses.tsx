'use client';

import React from 'react';

interface DeliveryAddress {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  instructions?: string;
  isDefault: boolean;
  whatsappLocation?: string;
}

interface DeliveryAddressesProps {
  addresses: DeliveryAddress[];
  onSetDefault: (addressId: string) => void;
  onDelete: (addressId: string) => void;
}

const DeliveryAddresses: React.FC<DeliveryAddressesProps> = ({
  addresses,
  onSetDefault,
  onDelete
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-bold text-foreground">
          Direcciones de Entrega
        </h2>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar dirección
        </button>
      </div>

      {addresses.map((address) => (
        <div
          key={address.id}
          className={`bg-card rounded-xl p-6 shadow-sm border-2 transition-smooth ${
            address.isDefault ? 'border-primary' : 'border-transparent'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-foreground">{address.name}</h3>
                  {address.isDefault && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      Predeterminada
                    </span>
                  )}
                </div>
                
                <p className="text-foreground mb-1">
                  {address.address}
                </p>
                <p className="text-text-secondary text-sm mb-2">
                  {address.neighborhood}, {address.city}
                </p>
                
                {address.instructions && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-text-secondary">
                    <span className="font-medium">Instrucciones: </span>
                    {address.instructions}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => onDelete(address.id)}
                className="text-destructive hover:text-destructive/80 p-2 transition-smooth"
                aria-label="Eliminar dirección"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            {!address.isDefault && (
              <button
                onClick={() => onSetDefault(address.id)}
                className="flex-1 bg-gray-100 text-foreground py-2 rounded-lg font-medium hover:bg-gray-200 transition-smooth press-scale"
              >
                Establecer como predeterminada
              </button>
            )}
            
            {address.whatsappLocation && (
              <a
                href={address.whatsappLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-lg font-medium hover:bg-success/90 transition-smooth press-scale"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Compartir ubicación
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryAddresses;