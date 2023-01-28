import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cheopltssseeszxkqahy.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoZW9wbHRzc3NlZXN6eGtxYWh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQzMzI2NjMsImV4cCI6MTk4OTkwODY2M30.A2HpwHgdDL9mhjE6F0aMan8EIsqgYDLjQkCqzEPuE9E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});
