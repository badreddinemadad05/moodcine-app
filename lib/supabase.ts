import { createClient } from "@supabase/supabase-js";

// ─── Client Supabase côté navigateur (clé publique anon) ─────────────────────
// Utilisé uniquement pour les lectures publiques (moteur de recommandation)
// Sécurisé par les politiques RLS de Supabase

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton : un seul client partagé dans tout le front-end
export const supabase = createClient(url, key);
