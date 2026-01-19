import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatusStep {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
  active: boolean;
}

interface OrderStatusProps {
  currentStatus: string;
}

const OrderStatus = ({ currentStatus }: OrderStatusProps) => {
  const statusSteps: StatusStep[] = [
    {
      id: 'received',
      label: 'Recibido',
      icon: 'CheckCircleIcon',
      completed: true,
      active: currentStatus === 'received',
    },
    {
      id: 'preparing',
      label: 'Preparando',
      icon: 'ClockIcon',
      completed: false,
      active: currentStatus === 'preparing',
    },
    {
      id: 'dispatched',
      label: 'En Camino',
      icon: 'TruckIcon',
      completed: false,
      active: currentStatus === 'dispatched',
    },
    {
      id: 'delivered',
      label: 'Entregado',
      icon: 'HomeIcon',
      completed: false,
      active: currentStatus === 'delivered',
    },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-warm mb-6">
      <h2 className="text-lg font-heading font-bold mb-6">Estado del Pedido</h2>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-border" />
        <div 
          className="absolute top-6 left-6 h-0.5 bg-primary transition-all duration-500"
          style={{ width: '0%' }}
        />
        
        {/* Status Steps */}
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center" style={{ width: '25%' }}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-smooth ${
                  step.completed
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : step.active
                    ? 'bg-accent text-accent-foreground shadow-warm animate-pulse'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon
                  name={step.icon as any}
                  size={24}
                  variant={step.completed || step.active ? 'solid' : 'outline'}
                />
              </div>
              <span
                className={`text-xs text-center font-medium ${
                  step.completed || step.active ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;