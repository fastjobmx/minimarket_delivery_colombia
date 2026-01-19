'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AddressConfirmationProps {
  currentAddress: string;
  onAddressUpdate: (newAddress: string) => void;
  onShareLocation: () => void;
}

const AddressConfirmation = ({
  currentAddress,
  onAddressUpdate,
  onShareLocation,
}: AddressConfirmationProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(currentAddress);

  const handleSave = () => {
    if (editedAddress.trim()) {
      onAddressUpdate(editedAddress);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedAddress(currentAddress);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 lg:p-6 shadow-warm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-lg flex items-center gap-2">
          <Icon name="MapPinIcon" size={24} variant="solid" className="text-primary" />
          Dirección de Entrega
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-smooth press-scale"
          >
            <Icon name="PencilIcon" size={16} />
            Editar
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus-ring transition-smooth resize-none"
            placeholder="Ingresa tu dirección completa"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-smooth press-scale"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth press-scale"
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">{currentAddress}</p>
          </div>

          <button
            onClick={onShareLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-success text-success-foreground rounded-lg font-medium hover:bg-success/90 transition-smooth press-scale"
          >
            <Icon name="ShareIcon" size={20} variant="solid" />
            Compartir ubicación por WhatsApp
          </button>

          <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
            <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary caption">
              Puedes compartir tu ubicación exacta con el repartidor para una entrega más rápida
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressConfirmation;