-- Location: supabase/migrations/20260118214313_enable_realtime_orders.sql
-- Schema Analysis: orders table exists with RLS enabled
-- Integration Type: enhancement - enable realtime subscriptions
-- Dependencies: existing orders table

-- ============================================================================
-- REALTIME CONFIGURATION FOR ORDERS TABLE
-- ============================================================================
-- This migration enables real-time subscriptions for the orders table
-- by adding it to the Supabase realtime publication

-- Enable realtime for orders table by adding it to the supabase_realtime publication
-- This allows real-time subscriptions to work properly
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- Verify the publication was added successfully
-- You can check this in your Supabase dashboard under Database → Replication
-- The orders table should now appear in the "supabase_realtime" publication

-- ============================================================================
-- MANUAL STEPS REQUIRED IN SUPABASE DASHBOARD
-- ============================================================================
-- If the above SQL does not automatically enable Realtime, follow these steps:
-- 
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to: Database → Replication
-- 3. Find the "orders" table in the list
-- 4. Toggle the switch next to "orders" to enable Realtime
-- 5. Save the changes
-- 6. Refresh your application
-- 
-- After completing these steps, real-time order subscriptions will work properly.
-- ============================================================================