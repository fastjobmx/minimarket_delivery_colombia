'use client';

import { useState, useEffect, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import {
  subscribeToNotifications,
  unsubscribe,
  Notification as RealtimeNotification
} from '@/services/realtime/realtimeService';

/**
 * Custom hook for real-time admin notifications
 * 
 * Features:
 * - Instant notification delivery for admin events
 * - Automatic notification state management
 * - Unread count tracking
 * - Sound/visual alerts for important notifications
 * 
 * Usage:
 * const { notifications, unreadCount, isConnected } = useRealtimeNotifications(userId);
 */

interface UseRealtimeNotificationsReturn {
  notifications: RealtimeNotification[];
  unreadCount: number;
  isConnected: boolean;
  error: string | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

export const useRealtimeNotifications = (
  userId: string,
  initialNotifications: RealtimeNotification[] = []
): UseRealtimeNotificationsReturn => {
  const [notifications, setNotifications] = useState<RealtimeNotification[]>(initialNotifications);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');

  const handleNotificationChange = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new: RealtimeNotification;
    old: RealtimeNotification;
  }) => {
    const { eventType, new: newNotification, old: oldNotification } = payload;

    setNotifications((prevNotifications) => {
      switch (eventType) {
        case 'INSERT':
          // Add new notification to the top
          // Play notification sound for important notifications
          if (newNotification.type === 'order' || newNotification.type === 'inventory') {
            playNotificationSound();
          }
          return [newNotification, ...prevNotifications];

        case 'UPDATE':
          // Update existing notification (e.g., mark as read)
          return prevNotifications.map((notification) =>
            notification.id === newNotification.id ? newNotification : notification
          );

        case 'DELETE':
          // Remove deleted notification
          return prevNotifications.filter(
            (notification) => notification.id !== oldNotification.id
          );

        default:
          return prevNotifications;
      }
    });
  }, []);

  const playNotificationSound = () => {
    // Simple notification sound (browser compatible)
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (err) {
        console.warn('Could not play notification sound:', err);
      }
    }
  };

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );

    // Update in database (when Supabase is connected)
    // supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .eq('id', notificationId);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );

    // Update all in database (when Supabase is connected)
    // supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .eq('user_id', userId);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    // ⚠️ NOTIFICATIONS TABLE NOT AVAILABLE
    // The database does not have a 'notifications' table yet.
    // Real-time subscriptions are disabled to prevent subscription errors.
    // The component will use initialNotifications (mock data) instead.
    
    console.warn(
      '⚠️ Real-time notifications disabled: notifications table not found in database.\n' +
      'Using static notification data instead.\n'+ 'To enable real-time notifications:\n'+ '1. Create a notifications table in Supabase\n'+ '2. Enable Realtime for the notifications table\n'+ '3. Remove this warning and uncomment the subscription code below'
    );

    // Mark as disconnected since we're not attempting subscription
    setConnectionStatus('disconnected');
    setIsConnected(false);
    setError('Real-time notifications not available (table does not exist)');

    /* UNCOMMENT THIS CODE AFTER CREATING NOTIFICATIONS TABLE
    let channel: RealtimeChannel | null = null;

    const setupSubscription = async () => {
      try {
        setConnectionStatus('connecting');
        setError(null);

        // Subscribe to real-time notifications for this user
        channel = subscribeToNotifications(userId, handleNotificationChange);

        // Monitor connection status
        channel
          .on('system', { event: 'connected' }, () => {
            setIsConnected(true);
            setConnectionStatus('connected');
            setError(null);
          })
          .on('system', { event: 'error' }, (error: any) => {
            console.error('Real-time notifications subscription error:', error);
            setError('Failed to connect to real-time notifications');
            setConnectionStatus('disconnected');
            setIsConnected(false);
          });

      } catch (err) {
        console.error('Error setting up real-time notifications:', err);
        setError('Failed to initialize real-time notifications');
        setConnectionStatus('disconnected');
        setIsConnected(false);
      }
    };

    setupSubscription();

    // Cleanup on unmount
    return () => {
      if (channel) {
        unsubscribe(channel);
      }
    };
    */
  }, [userId, handleNotificationChange]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    isConnected,
    error,
    connectionStatus,
    markAsRead,
    markAllAsRead
  };
};

/**
 * Hook for showing browser notifications (with permission)
 */
export const useBrowserNotifications = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setHasPermission(permission === 'granted');
      return permission === 'granted';
    }
    return false;
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (hasPermission) {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  };

  return {
    hasPermission,
    requestPermission,
    showNotification
  };
};