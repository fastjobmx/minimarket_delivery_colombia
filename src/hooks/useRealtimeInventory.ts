'use client';

import { useState, useEffect, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import {
  subscribeToInventory,
  subscribeToLowStockAlerts,
  unsubscribe,
  Product
} from '@/services/realtime/realtimeService';

/**
 * Custom hook for real-time inventory synchronization
 * 
 * Features:
 * - Live product updates (stock changes, price updates, new products)
 * - Low stock alerts monitoring
 * - Automatic state synchronization
 * - Connection status monitoring
 * 
 * Usage:
 * const { products, lowStockProducts, isConnected } = useRealtimeInventory(initialProducts);
 */

interface UseRealtimeInventoryReturn {
  products: Product[];
  lowStockProducts: Product[];
  isConnected: boolean;
  error: string | null;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
}

export const useRealtimeInventory = (
  initialProducts: Product[] = [],
  lowStockThreshold: number = 10
): UseRealtimeInventoryReturn => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');

  const handleInventoryChange = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new: Product;
    old: Product;
  }) => {
    const { eventType, new: newProduct, old: oldProduct } = payload;

    setProducts((prevProducts) => {
      switch (eventType) {
        case 'INSERT':
          // Add new product
          return [...prevProducts, newProduct];

        case 'UPDATE':
          // Update existing product
          return prevProducts.map((product) =>
            product.id === newProduct.id ? newProduct : product
          );

        case 'DELETE':
          // Remove deleted product
          return prevProducts.filter((product) => product.id !== oldProduct.id);

        default:
          return prevProducts;
      }
    });
  }, []);

  const handleLowStockAlert = useCallback((payload: {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new: Product;
    old: Product;
  }) => {
    const { new: product } = payload;
    
    if (product && product.stock < lowStockThreshold) {
      setLowStockProducts((prev) => {
        // Check if product already in low stock list
        const exists = prev.some(p => p.id === product.id);
        if (exists) {
          // Update existing
          return prev.map(p => p.id === product.id ? product : p);
        }
        // Add new low stock product
        return [...prev, product];
      });
    } else {
      // Remove from low stock if stock increased
      setLowStockProducts((prev) => prev.filter(p => p.id !== product.id));
    }
  }, [lowStockThreshold]);

  useEffect(() => {
    let inventoryChannel: RealtimeChannel | null = null;
    let lowStockChannel: RealtimeChannel | null = null;

    const setupSubscriptions = async () => {
      try {
        setConnectionStatus('connecting');
        setError(null);

        // Subscribe to all inventory changes
        inventoryChannel = subscribeToInventory(handleInventoryChange);

        // Subscribe to low stock alerts
        lowStockChannel = subscribeToLowStockAlerts(
          lowStockThreshold,
          handleLowStockAlert
        );

        // Monitor connection status
        inventoryChannel
          .on('system', { event: 'connected' }, () => {
            setIsConnected(true);
            setConnectionStatus('connected');
            setError(null);
          })
          .on('system', { event: 'error' }, (error: any) => {
            console.error('Real-time inventory subscription error:', error);
            
            // Provide user-friendly error message
            const errorMessage = error?.message || '';
            if (errorMessage.includes('Realtime is not enabled')) {
              setError(
                'Realtime updates are not configured. Please enable Realtime for the products table in your Supabase dashboard (Database → Replication).'
              );
            } else {
              setError('Failed to connect to real-time inventory. Using cached data.');
            }
            
            setConnectionStatus('disconnected');
            setIsConnected(false);
          });

      } catch (err) {
        console.error('Error setting up real-time inventory:', err);
        setError('Failed to initialize real-time inventory. Application will continue with cached data.');
        setConnectionStatus('disconnected');
        setIsConnected(false);
      }
    };

    setupSubscriptions();

    // Cleanup on unmount
    return () => {
      if (inventoryChannel) {
        unsubscribe(inventoryChannel);
      }
      if (lowStockChannel) {
        unsubscribe(lowStockChannel);
      }
    };
  }, [handleInventoryChange, handleLowStockAlert, lowStockThreshold]);

  // Update low stock list based on current products
  useEffect(() => {
    const lowStock = products.filter(
      (product) => product.stock < lowStockThreshold && product.stock > 0
    );
    setLowStockProducts(lowStock);
  }, [products, lowStockThreshold]);

  return {
    products,
    lowStockProducts,
    isConnected,
    error,
    connectionStatus
  };
};

/**
 * Hook for monitoring specific product in real-time
 * Useful for product detail pages
 */
export const useRealtimeProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    const setupTracking = async () => {
      try {
        setIsLoading(true);
        // This would be replaced with actual Supabase query once database is set up
        // const { data, error: fetchError } = await supabase
        //   .from('products')
        //   .select('*')
        //   .eq('id', productId)
        //   .single();
        
        // if (fetchError) throw fetchError;
        // setProduct(data);

        // Subscribe to changes for this specific product
        // channel = subscribeToInventory((payload) => {
        //   if (payload.new.id === productId && payload.eventType === 'UPDATE') {
        //     setProduct(payload.new);
        //   }
        // });

        setIsLoading(false);
      } catch (err) {
        console.error('Error tracking product:', err);
        setError('Failed to track product');
        setIsLoading(false);
      }
    };

    if (productId) {
      setupTracking();
    }

    return () => {
      if (channel) {
        unsubscribe(channel);
      }
    };
  }, [productId]);

  return { product, isLoading, error };
};