import { createClient } from "@supabase/supabase-js";

// ─── Client Supabase côté serveur (service role key) ─────────────────────────
// ATTENTION : ne jamais exposer ce client côté client (navigateur)
// Il bypasse les politiques RLS → accès total à la base de données
// Utilisé uniquement dans les API routes et Server Components

const url        = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function createAdminClient() {
  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
