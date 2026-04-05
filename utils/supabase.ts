import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace these with your actual Supabase project URL and Anon Key
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

let _supabase: SupabaseClient | null = null;

export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes('MISSING');
};

export const getSupabase = () => {
  if (!_supabase) {
    if (!isSupabaseConfigured()) {
      // Fallback to a dummy client that won't crash on creation but shouldn't be used
      return createClient('https://MISSING_URL.supabase.co', 'placeholder');
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  return _supabase;
};

// Use getSupabase() whenever you need the client to ensure proper lazy initialization
