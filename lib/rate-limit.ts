/**
 * Rate Limiting pour API Routes
 * 
 * NOTE IMPORTANTE : Ce rate limiter utilise une Map en mémoire.
 * En environnement serverless (Vercel), chaque instance de fonction a sa propre Map.
 * Cela signifie que le rate limiting n'est pas parfait mais offre une protection de base.
 * 
 * Pour un rate limiting robuste en production, utiliser :
 * - Vercel KV (Redis) : https://vercel.com/docs/storage/vercel-kv
 * - Upstash Redis : https://upstash.com/
 * - Cloudflare Workers KV
 * 
 * Malgré ses limitations, ce rate limiter offre :
 * - Protection contre les abus basiques
 * - Délai dissuasif pour les spammeurs
 * - Aucune dépendance externe
 */

type RateLimitRecord = {
  count: number
  resetTime: number
}

// Map partagée au niveau du module (persiste entre les appels dans la même instance)
const rateLimitStore = new Map<string, RateLimitRecord>()

// Configuration par défaut
const DEFAULT_CONFIG = {
  maxRequests: 5,
  windowMs: 60 * 1000, // 1 minute
  maxMapSize: 10000, // Limite pour éviter les fuites mémoire
}

interface RateLimitConfig {
  maxRequests?: number
  windowMs?: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
}

/**
 * Nettoie les entrées expirées de la map
 * Appelé automatiquement à chaque vérification pour éviter les fuites mémoire
 */
function cleanupExpiredEntries(): void {
  const now = Date.now()
  
  // Nettoyage seulement si la map dépasse une certaine taille
  if (rateLimitStore.size > DEFAULT_CONFIG.maxMapSize / 2) {
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }
}

/**
 * Vérifie si une requête est autorisée selon le rate limit
 * 
 * @param identifier - Identifiant unique (généralement l'IP)
 * @param config - Configuration optionnelle
 * @returns Résultat du rate limiting
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = {}
): RateLimitResult {
  const maxRequests = config.maxRequests ?? DEFAULT_CONFIG.maxRequests
  const windowMs = config.windowMs ?? DEFAULT_CONFIG.windowMs
  const now = Date.now()

  // Nettoyage préventif
  cleanupExpiredEntries()

  // Récupérer ou créer l'enregistrement
  const record = rateLimitStore.get(identifier)

  // Nouveau visiteur ou fenêtre expirée
  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + windowMs,
    }
    rateLimitStore.set(identifier, newRecord)
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newRecord.resetTime,
    }
  }

  // Limite atteinte
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  // Incrémenter le compteur
  record.count++
  
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  }
}

/**
 * Extrait l'adresse IP d'une requête
 * Gère les headers de proxy (Vercel, Cloudflare, etc.)
 */
export function getClientIP(request: Request): string {
  // Headers Vercel
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  // Header réel IP
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  // Cloudflare
  const cfIP = request.headers.get('cf-connecting-ip')
  if (cfIP) {
    return cfIP.trim()
  }

  return 'unknown'
}

/**
 * Helper pour créer une réponse rate limited
 */
export function rateLimitedResponse(resetTime: number) {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)
  
  return Response.json(
    { 
      error: 'Trop de requêtes. Veuillez réessayer dans une minute.',
      retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Remaining': '0',
      },
    }
  )
}
