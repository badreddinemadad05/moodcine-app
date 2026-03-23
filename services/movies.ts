/**
 * ─── Point d'entrée du service films ─────────────────────────────────────────
 *
 * Re-exporte tout depuis movies.service.ts.
 * Tous les imports existants (@/services/movies) continuent de fonctionner
 * sans modification.
 *
 * La logique réelle est dans :
 *   services/movies.service.ts   ← switch local / Supabase + fake delay
 *   services/_supabase-mapper.ts ← transformations snake_case ↔ camelCase
 *   store/movies.store.ts        ← état en mémoire (mode local)
 */

export * from "./movies.service";
