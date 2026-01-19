import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Activity {
  id: string;
  type: 'order' | 'inventory' | 'system';
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityFeedItemProps {
  activity: Activity;
}

const ActivityFeedItem = ({ activity }: ActivityFeedItemProps) => {
  const typeConfig = {
    order: {
      icon: 'ShoppingBagIcon',
      className: 'bg-primary/10 text-primary',
    },
    inventory: {
      icon: 'CubeIcon',
      className: 'bg-warning/10 text-warning',
    },
    system: {
      icon: 'BellIcon',
      className: 'bg-accent/10 text-accent',
    },
  };

  const config = typeConfig[activity.type];

  return (
    <div className="flex gap-3 p-3 hover:bg-muted rounded-lg transition-smooth">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${config.className}`}>
        <Icon name={config.icon as any} size={20} variant="solid" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm mb-1">{activity.title}</h4>
        <p className="text-sm text-text-secondary line-clamp-2 mb-1">{activity.description}</p>
        <span className="text-xs text-text-secondary caption">{activity.timestamp}</span>
      </div>
    </div>
  );
};

export default ActivityFeedItem;