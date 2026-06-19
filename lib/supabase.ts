import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Lazily creates a server-only Supabase client using the service-role key. The
 * table has RLS enabled with no public policies, so all access flows through
 * this privileged client, which must never be imported into client components.
 *
 * Created on first use (not at module load) so the build doesn't fail when env
 * vars are absent during static analysis.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  // The Supabase Vercel connector injects the URL as SUPABASE_URL on some
  // versions and NEXT_PUBLIC_SUPABASE_URL on others; accept either.
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase URL (SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
