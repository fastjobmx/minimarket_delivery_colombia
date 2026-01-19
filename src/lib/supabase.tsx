import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anonymous key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '⚠️ Missing Supabase environment variables. Please check your .env file.'
  );
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
