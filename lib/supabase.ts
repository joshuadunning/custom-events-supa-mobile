import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://xvwzdnptvqxogbcrtxps.supabase.co';
// const supabaseAnonKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2d3pkbnB0dnF4b2diY3J0eHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxMjUyNTksImV4cCI6MTk4NTcwMTI1OX0.6kaBu8NzhOcOQOtqhfS2wcKYVSC3ZKZt7h9BDmRsDuM';

const supabaseUrl = 'http://localhost:54321';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
