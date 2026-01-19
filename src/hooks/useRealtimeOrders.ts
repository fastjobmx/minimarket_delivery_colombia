'use client';

import { useState, useEffect, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import {
  subscribeToOrders,
  unsubscribe,
  Order
} from '@/services/realtime/realtimeService';

/**
 * Custom hook for real-time order updates
 * 
 * Features:
 * - Automatically subscribes to order changes on mount
 * - Provides live order updates (INSERT, UPDATE, DELETE)
 * - Auto-cleanup on unmount
 * - Error handling for connection issues
 * 
 * Usage:
 * const { orders, isConnected, error } = useRealtimeOrders(initialOrders);
 */

interface UseRealtimeOrdersReturn {
  orders: Order[];
  isConnected: boolean;
  error: string | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
}

export const useRealtimeOrders = (
  initialOrders: Order[] = []
): UseRealtimeOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');

  const handleOrderChange = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new: Order;
    old: Order;
  }) => {
    const { eventType, new: newOrder, old: oldOrder } = payload;

    setOrders((prevOrders) => {
      switch (eventType) {
        case 'INSERT':
          // Add new order to the beginning of the list
          return [newOrder, ...prevOrders];

        case 'UPDATE':
          // Update existing order
          return prevOrders.map((order) =>
            order.id === newOrder.id ? newOrder : order
          );

        case 'DELETE':
          // Remove deleted order
          return prevOrders.filter((order) => order.id !== oldOrder.id);

        default:
          return prevOrders;
      }
    });
  }, []);

  useEffect(() => {
    let channel: RealtimeChannel | null = null;
    let isSubscribed = false;
    let timeoutId: NodeJS.Timeout | null = null;

    const setupSubscription = () => {
      try {
        setConnectionStatus('connecting');
        setError(null);

        // Subscribe to real-time order updates
        channel = subscribeToOrders(handleOrderChange);

        // Set a timeout to handle subscription failures gracefully
        timeoutId = setTimeout(() => {
          if (!isSubscribed && channel) {
            console.warn('⏱️ Real-time subscription taking longer than expected, but will keep trying...');
            // Don't set error or disconnected status - let it keep trying
            // The subscription might still succeed
          }
        }, 8000);

        // Listen for subscription status changes
        channel
          .on('system', {}, (payload: any) => {
            if (payload.status === 'SUBSCRIBED' || payload.extension === 'postgres_changes') {
              isSubscribed = true;
              setIsConnected(true);
              setConnectionStatus('connected');
              setError(null);
              if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
              }
              console.log('✅ Real-time orders connection established');
            } else if (payload.status === 'CHANNEL_ERROR') {
              if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
              }
              setError('Failed to connect to real-time updates. Please refresh the page.');
              setConnectionStatus('disconnected');
              setIsConnected(false);
              console.error('❌ Real-time subscription error');
            } else if (payload.status === 'TIMED_OUT') {
              if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
              }
              // Don't treat timeout as a fatal error - the connection might still establish
              console.warn('⏱️ Real-time subscription timed out, but will retry automatically');
            } else if (payload.status === 'CLOSED') {
              // Only handle close if we were previously connected
              if (isSubscribed) {
                setIsConnected(false);
                setConnectionStatus('disconnected');
                console.warn('⚠️ Real-time orders connection closed');
              }
            }
          });

      } catch (err: any) {
        console.error('Error setting up real-time orders:', err);
        setError('Failed to initialize real-time orders. Using local data only.');
        setConnectionStatus('disconnected');
        setIsConnected(false);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    };

    setupSubscription();

    // Cleanup on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (channel) {
        unsubscribe(channel);
      }
    };
  }, [handleOrderChange]);

  return {
    orders,
    isConnected,
    error,
    connectionStatus
  };
};

/**
 * Hook for tracking a specific order in real-time
 * Useful for order confirmation/tracking pages
 */
export const useRealtimeOrderTracking = (orderId: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    const setupTracking = async () => {
      try {
        setIsLoading(true);
        // This would be replaced with actual Supabase query once database is set up
        // const { data, error: fetchError } = await supabase
        //   .from('orders')
        //   .select('*')
        //   .eq('id', orderId)
        //   .single();
        
        // if (fetchError) throw fetchError;
        // setOrder(data);

        // Subscribe to changes for this specific order
        // channel = subscribeToOrderById(orderId, (payload) => {
        //   if (payload.eventType === 'UPDATE') {
        //     setOrder(payload.new);
        //   }
        // });

        setIsLoading(false);
      } catch (err) {
        console.error('Error tracking order:', err);
        setError('Failed to track order');
        setIsLoading(false);
      }
    };

    if (orderId) {
      setupTracking();
    }

    return () => {
      if (channel) {
        unsubscribe(channel);
      }
    };
  }, [orderId]);

  return { order, isLoading, error };
};