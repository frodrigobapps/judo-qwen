import { createBrowserClient, createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export function createServerSupabaseClient(cookies) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) {
        return cookies.get(name)?.value;
      },
      set(name, value, options) {
        cookies.set({ name, value, ...options });
      },
      remove(name, options) {
        cookies.set({ name, value: '', ...options });
      },
    },
  });
}
