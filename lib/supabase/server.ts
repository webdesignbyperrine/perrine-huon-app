import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Crée un client Supabase pour les Server Components et API Routes.
 * Lit et écrit les cookies via `next/headers` pour maintenir la session SSR.
 * Les erreurs de setAll sont ignorées silencieusement si appelé depuis un Server Component
 * (le middleware se charge du refresh de session dans ce cas).
 * @returns Client Supabase server-side avec gestion de session.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignoré si appelé depuis un Server Component — le middleware gère le refresh.
          }
        },
      },
    }
  )
}

/**
 * Crée un client Supabase sans cookies pour generateStaticParams (build time).
 * Utiliser uniquement dans les contextes où les cookies ne sont pas disponibles.
 * @returns Client Supabase standard sans gestion de session.
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
