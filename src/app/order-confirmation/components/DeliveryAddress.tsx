import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface DeliveryAddressProps {
  name: string;
  phone: string;
  address: string;
  city: string;
  department: string;
}

const DeliveryAddress = ({ name, phone, address, city, department }: DeliveryAddressProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-warm mb-6">
      <h2 className="text-lg font-heading font-bold mb-4">Dirección de Entrega</h2>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Icon name="UserIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-text-secondary mb-1">Nombre</p>
            <p className="font-medium">{name}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Icon name="PhoneIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-text-secondary mb-1">Teléfono</p>
            <p className="font-medium data-text">{phone}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Icon name="MapPinIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-text-secondary mb-1">Dirección</p>
            <p className="font-medium">{address}</p>
            <p className="text-sm text-text-secondary mt-1">{city}, {department}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;