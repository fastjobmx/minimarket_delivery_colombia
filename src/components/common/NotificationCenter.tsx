'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Notification {
  id: string;
  type: 'order' | 'inventory' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
}

const NotificationCenter = ({
  notifications = [],
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return 'ShoppingBagIcon';
      case 'inventory':
        return 'CubeIcon';
      case 'system':
        return 'BellIcon';
      default:
        return 'BellIcon';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-lg hover:bg-muted transition-smooth press-scale"
        aria-label="Notificaciones"
      >
        <Icon name="BellIcon" size={24} variant={unreadCount > 0 ? 'solid' : 'outline'} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-warm data-text">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-card rounded-xl shadow-warm-xl border border-border z-notifications-dropdown animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-heading font-bold text-lg">Notificaciones</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          <div className="max-h-[480px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Icon name="BellSlashIcon" size={48} className="text-muted-foreground mb-4" />
                <p className="text-text-secondary">No hay notificaciones</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left p-4 hover:bg-muted transition-smooth ${
                      !notification.read ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          notification.type === 'order' ?'bg-primary/10 text-primary'
                            : notification.type === 'inventory' ?'bg-warning/10 text-warning' :'bg-accent/10 text-accent'
                        }`}
                      >
                        <Icon
                          name={getNotificationIcon(notification.type) as any}
                          size={20}
                          variant="solid"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-medium text-sm line-clamp-1">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-text-secondary caption">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium py-2 rounded-lg hover:bg-muted transition-smooth">
                Ver todas las notificaciones
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;