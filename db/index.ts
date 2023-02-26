import { supabase } from '~/db/supabase.ts';

function handle_response<T>(response: any): T {
  if (response.error) {
    throw response.error;
  }

  return response.data;
}

export async function get_profile(
  id: string
): Promise<Database.public.tables.profiles.Row> {
  const response = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  return handle_response(response);
}
