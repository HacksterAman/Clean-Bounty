import { createClient } from '@supabase/supabase-js';
import { config } from './config';

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

// Database types
export type Database = {
  public: {
    Tables: {
      bounties: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          location: {
            lat: number;
            lng: number;
          };
          status: 'open' | 'in_progress' | 'completed';
          reward_amount: number;
          user_id: string;
          image_url?: string;
        };
        Insert: Omit<Database['public']['Tables']['bounties']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bounties']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          username: string;
          points: number;
          avatar_url?: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
    };
  };
}; 