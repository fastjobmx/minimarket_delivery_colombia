import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

/**
 * Real-time Subscription Service for Supabase
 * 
 * This service provides real-time subscription capabilities for:
 * - Order updates (new orders, status changes)
 * - Inventory synchronization (stock changes, product updates)
 * - Admin notifications (instant alerts for important events)
 * 
 * Usage:
 * 1. Subscribe to real-time changes using subscribeToOrders, subscribeToInventory, etc.
 * 2. Handle incoming changes in your component callbacks
 * 3. Unsubscribe when component unmounts to prevent memory leaks
 */

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  total: number;
  status: 'pending' | 'preparing' | 'outForDelivery' | 'delivered';
  paymentMethod: 'nequi' | 'daviplata' | 'pse' | 'cash';
  address: string;
  timestamp: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low_stock' | 'out_of_stock';
  image: string;
  alt: string;
  description: string;
  lastUpdated: string;
  updated_at?: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'inventory' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  user_id?: string;
  created_at?: string;
}

type OrderCallback = (payload: { 
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Order;
  old: Order;
}) => void;

type InventoryCallback = (payload: {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Product;
  old: Product;
}) => void;

type NotificationCallback = (payload: {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Notification;
  old: Notification;
}) => void;

/**
 * Subscribe to real-time order updates
 * Listens for: new orders, order status changes, order updates
 */
export const subscribeToOrders = (
  callback: OrderCallback
): RealtimeChannel => {
  const channel = supabase
    .channel('orders_realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders'
      },
      (payload: any) => {
        callback({
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
          new: payload.new as Order,
          old: payload.old as Order
        });
      }
    )
    .subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Successfully subscribed to order updates');
      } else if (status === 'CHANNEL_ERROR') {
        console.error('❌ Realtime subscription error:', err);
        console.warn(
          '⚠️ SETUP REQUIRED: Realtime is not enabled for the "orders" table.\n' +
          'To fix this:\n'+ '1. Go to your Supabase project dashboard\n'+ '2. Navigate to Database → Replication\n'+ '3. Enable Realtime for the "orders" table\n'+ '4. Refresh your application'
        );
      } else if (status === 'TIMED_OUT') {
        console.error('⏱️ Realtime subscription timed out');
      }
    });

  return channel;
};

/**
 * Subscribe to real-time inventory updates
 * Listens for: stock changes, product updates, new products
 */
export const subscribeToInventory = (
  callback: InventoryCallback
): RealtimeChannel => {
  const channel = supabase
    .channel('inventory_realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'products'
      },
      (payload: any) => {
        callback({
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
          new: payload.new as Product,
          old: payload.old as Product
        });
      }
    )
    .subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Successfully subscribed to inventory updates');
      } else if (status === 'CHANNEL_ERROR') {
        console.error('❌ Realtime subscription error:', err);
        console.warn(
          '⚠️ SETUP REQUIRED: Realtime is not enabled for the "products" table.\n' +
          'To fix this:\n'+ '1. Go to your Supabase project dashboard\n'+ '2. Navigate to Database → Replication\n'+ '3. Enable Realtime for the "products" table\n'+ '4. Refresh your application'
        );
      } else if (status === 'TIMED_OUT') {
        console.error('⏱️ Realtime subscription timed out');
      }
    });

  return channel;
};

/**
 * Subscribe to real-time admin notifications
 * Listens for: new notifications, notification updates
 * 
 * ⚠️ IMPORTANT: This function requires a 'notifications' table in your Supabase database.
 * The table does not currently exist, so this subscription will fail.
 * 
 * To enable this feature:
 * 1. Create a notifications table with columns: id, user_id, type, title, message, read, created_at
 * 2. Enable Realtime for the notifications table in Supabase Dashboard
 * 3. Set up appropriate Row Level Security (RLS) policies
 */
export const subscribeToNotifications = (
  userId: string,
  callback: NotificationCallback
): RealtimeChannel => {
  const channel = supabase
    .channel('notifications_realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      (payload: any) => {
        callback({
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
          new: payload.new as Notification,
          old: payload.old as Notification
        });
      }
    )
    .subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Successfully subscribed to notification updates');
      } else if (status === 'CHANNEL_ERROR') {
        console.error('❌ Realtime subscription error:', err);
        console.warn(
          '⚠️ SETUP REQUIRED: The "notifications" table does not exist in the database.\n' +
          'To fix this:\n'+ '1. Create a notifications table with schema:\n'+ '   - id (uuid, primary key)\n'+ '   - user_id (text)\n'+ '   - type (text)\n'+ '   - title (text)\n'+ '   - message (text)\n'+ '   - read (boolean)\n'+ '   - action_url (text, optional)\n'+ '   - created_at (timestamp)\n'+ '2. Enable Realtime for the "notifications" table in Supabase Dashboard\n'+ '3. Set up Row Level Security (RLS) policies\n'+ '4. Refresh your application'
        );
      } else if (status === 'TIMED_OUT') {
        console.error('⏱️ Realtime subscription timed out');
      }
    });

  return channel;
};

/**
 * Subscribe to specific order by ID
 * Useful for order tracking pages
 */
export const subscribeToOrderById = (
  orderId: string,
  callback: OrderCallback
): RealtimeChannel => {
  const channel = supabase
    .channel(`order_${orderId}_realtime`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`
      },
      (payload: any) => {
        callback({
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
          new: payload.new as Order,
          old: payload.old as Order
        });
      }
    )
    .subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log(`✅ Successfully subscribed to order ${orderId} updates`);
      } else if (status === 'CHANNEL_ERROR') {
        console.error('❌ Realtime subscription error:', err);
        console.warn(
          '⚠️ SETUP REQUIRED: Realtime is not enabled for the "orders" table.\n' +
          'To fix this:\n'+ '1. Go to your Supabase project dashboard\n'+ '2. Navigate to Database → Replication\n'+ '3. Enable Realtime for the "orders" table\n'+ '4. Refresh your application'
        );
      } else if (status === 'TIMED_OUT') {
        console.error('⏱️ Realtime subscription timed out');
      }
    });

  return channel;
};

/**
 * Subscribe to low stock alerts
 * Triggers when product stock falls below threshold
 */
export const subscribeToLowStockAlerts = (
  threshold: number,
  callback: InventoryCallback
): RealtimeChannel => {
  const channel = supabase
    .channel('low_stock_alerts')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'products',
        filter: `stock=lt.${threshold}`
      },
      (payload: any) => {
        callback({
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
          new: payload.new as Product,
          old: payload.old as Product
        });
      }
    )
    .subscribe((status, err) => {
      if (status === 'SUBSCRIBED') {
        console.log(`✅ Successfully subscribed to low stock alerts (threshold: ${threshold})`);
      } else if (status === 'CHANNEL_ERROR') {
        console.error('❌ Low stock alerts subscription error:', err);
        console.warn(
          '⚠️ SETUP REQUIRED: Realtime is not enabled for the "products" table.\n' +
          'To fix this:\n'+ '1. Go to your Supabase project dashboard\n'+ '2. Navigate to Database → Replication\n'+ '3. Enable Realtime for the "products" table\n'+ '4. Refresh your application'
        );
      }
    });

  return channel;
};

/**
 * Unsubscribe from a channel
 * Call this when component unmounts to prevent memory leaks
 */
export const unsubscribe = async (channel: RealtimeChannel): Promise<void> => {
  await supabase.removeChannel(channel);
};

/**
 * Unsubscribe from all channels
 * Useful for cleanup on logout or major navigation changes
 */
export const unsubscribeAll = async (): Promise<void> => {
  await supabase.removeAllChannels();
};