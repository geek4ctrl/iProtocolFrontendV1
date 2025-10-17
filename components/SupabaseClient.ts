import { createClient } from '@supabase/supabase-js';

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!publicSupabaseUrl || !publicSupabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(publicSupabaseUrl, publicSupabaseAnonKey);

export default supabase;
