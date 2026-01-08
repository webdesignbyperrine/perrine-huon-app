import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Rate limiting simple en mémoire (par IP)
// Note: En production avec plusieurs instances, utiliser Redis ou similaire
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 5; // Max requêtes
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// Nettoyage périodique des entrées expirées
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000); // Toutes les minutes

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'IP pour le rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Vérifier le rate limit
    const { allowed, remaining } = checkRateLimit(ip);
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }

    // Valider les données
    const body = await request.json();
    const { name, email, company, message, source = 'form_home' } = body;
    
    // Validation basique
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le nom est requis (minimum 2 caractères)' },
        { status: 400 }
      );
    }
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }
    
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Le message est requis (minimum 10 caractères)' },
        { status: 400 }
      );
    }
    
    // Limiter la taille des champs pour éviter les abus
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 255),
      company: company ? String(company).trim().slice(0, 100) : null,
      city: null,
      message: message.trim().slice(0, 5000),
      source: String(source).slice(0, 50),
      status: 'new' as const,
    };

    // Insérer dans Supabase
    const supabase = await createClient();
    const { error } = await supabase
      .from('contact_messages')
      .insert([sanitizedData]);

    if (error) {
      console.error('Erreur insertion contact:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        }
      }
    );

  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}



