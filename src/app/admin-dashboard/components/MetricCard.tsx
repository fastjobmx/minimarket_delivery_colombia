import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'primary' | 'accent' | 'warning' | 'success';
}

const MetricCard = ({ title, value, icon, trend, color }: MetricCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    warning: 'bg-warning/10 text-warning',
    success: 'bg-success/10 text-success',
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-warm border border-border hover:shadow-warm-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon as any} size={24} variant="solid" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-error'}`}>
            <Icon 
              name={trend.isPositive ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} 
              size={16} 
              variant="solid" 
            />
            <span className="data-text">{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-text-secondary text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold data-text">{value}</p>
    </div>
  );
};

export default MetricCard;