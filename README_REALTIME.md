# 🔄 Real-Time Configuration Guide

## Overview
This application uses Supabase Realtime to provide live updates for orders, inventory, and notifications.

## ✅ Enabling Realtime for Tables

### Automatic Setup (via Migration)
The migration `20260118214313_enable_realtime_orders.sql` automatically enables Realtime for the orders table by adding it to the `supabase_realtime` publication.

### Manual Setup (if needed)
If you encounter the error:
```
Unable to subscribe to changes with given parameters. 
Please check Realtime is enabled for the given connect parameters
```

Follow these steps:

1. **Open Supabase Dashboard**
   - Go to your project at: https://app.supabase.com

2. **Navigate to Database → Replication**
   - Click on "Database" in the left sidebar
   - Select the "Replication" tab

3. **Enable Realtime for Tables**
   - Find the table you want to enable (e.g., `orders`, `products`, `notifications`)
   - Toggle the switch next to the table name to **ON**
   - The switch should turn blue/green when enabled

4. **Save and Refresh**
   - Changes are saved automatically
   - Refresh your application
   - Real-time subscriptions should now work

## 📋 Tables That Need Realtime

### Currently Configured
- ✅ **orders** - Real-time order updates
- ✅ **products** - Real-time inventory updates

### Optional (enable if needed)
- **notifications** - Real-time admin notifications (requires creating notifications table first)

## 🔍 Verifying Realtime is Working

### Check Browser Console
When Realtime is properly configured, you should see:
```
✅ Real-time orders connection established
✅ Successfully subscribed to order updates
```

### Check for Errors
If you see these errors, Realtime is NOT enabled:
```
❌ Realtime subscription error
⚠️ SETUP REQUIRED: Realtime is not enabled for the "orders" table
```

## 🛠️ Troubleshooting

### Error: "Unable to subscribe to changes"
**Solution**: Enable Realtime in Supabase Dashboard (see Manual Setup above)

### Error: "CHANNEL_ERROR"
**Possible Causes**:
1. Realtime not enabled for the table
2. Row Level Security (RLS) policies blocking subscription
3. Invalid table name or schema

**Solutions**:
1. Verify table exists in `public` schema
2. Check RLS policies allow authenticated users to SELECT
3. Ensure Realtime is enabled in dashboard

### Error: "TIMED_OUT"
**Possible Causes**:
1. Network connectivity issues
2. Supabase project paused or inactive
3. Too many concurrent subscriptions

**Solutions**:
1. Check internet connection
2. Verify Supabase project status
3. Reduce number of active subscriptions

## 📝 Adding New Realtime Tables

To enable Realtime for a new table:

### 1. Add to Migration
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.your_table_name;
```

### 2. Enable in Dashboard
Follow the "Manual Setup" steps above for the new table

### 3. Update Application Code
```typescript
import { subscribeToOrders } from '@/services/realtime/realtimeService';

// Subscribe to updates
const channel = subscribeToOrders((payload) => {
  console.log('Update received:', payload);
  // Handle the update
});

// Cleanup when done
await unsubscribe(channel);
```

## 🔐 Security Considerations

### Row Level Security (RLS)
Realtime respects RLS policies. Users can only receive updates for rows they have permission to SELECT.

**Example**: If a user can only view their own orders, they will only receive real-time updates for their orders.

### Performance
- Limit the number of active subscriptions per client
- Use filters to reduce data volume
- Unsubscribe from channels when components unmount

## 📚 Additional Resources

- [Supabase Realtime Documentation](https://supabase.com/docs/guides/realtime)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime Filters](https://supabase.com/docs/guides/realtime/postgres-changes#realtime-filters)

## 🆘 Need Help?

If you continue to experience issues:
1. Check Supabase service status
2. Review browser console logs
3. Verify network connectivity
4. Check Supabase project quotas
5. Contact Supabase support if needed