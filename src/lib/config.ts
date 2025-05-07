export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  googleMaps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  },
} as const;

// Type-safe environment variables
declare global {
  interface ImportMetaEnv {
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_ANON_KEY: string;
    VITE_GOOGLE_MAPS_API_KEY: string;
    VITE_GEMINI_API_KEY: string;
  }
} 