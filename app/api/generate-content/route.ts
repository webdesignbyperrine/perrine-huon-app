import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const ALLOWED_GENERATION_TYPES = ['excerpt', 'content'] as const;
type GenerationType = (typeof ALLOWED_GENERATION_TYPES)[number];

const MAX_TOKENS: Record<GenerationType, number> = {
  excerpt: 200,
  content: 2000,
};

const PROMPTS: Record<GenerationType, (title: string) => string> = {
  excerpt: (title) =>
    `Rédige un résumé accrocheur et professionnel de 2-3 phrases pour un article de blog intitulé "${title}". Le résumé doit donner envie de lire l'article et être optimisé pour le SEO.`,
  content: (title) =>
    `Rédige un article de blog complet et professionnel sur le sujet "${title}". L'article doit :
- Être informatif et engageant
- Contenir 4-5 sections avec des titres
- Inclure des conseils pratiques
- Être optimisé pour le SEO
- Faire environ 800-1000 mots
- Être rédigé en français

Structure suggérée : Introduction, 3-4 sections principales avec sous-titres, Conclusion.`,
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Non autorisé. Veuillez vous connecter.' },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Accès refusé. Droits administrateur requis.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, type } = body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le titre est requis.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_GENERATION_TYPES.includes(type as GenerationType)) {
      return NextResponse.json(
        { error: `Le type doit être l'un des suivants : ${ALLOWED_GENERATION_TYPES.join(', ')}.` },
        { status: 400 }
      );
    }

    const generationType = type as GenerationType;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service de génération non configuré.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              "Tu es un assistant spécialisé dans la rédaction d'articles de blog professionnels sur le web design, le développement web et le SEO.",
          },
          {
            role: 'user',
            content: PROMPTS[generationType](title.trim().slice(0, 500)),
          },
        ],
        temperature: 0.7,
        max_tokens: MAX_TOKENS[generationType],
      }),
    });

    if (!response.ok) {
      console.error('Erreur API OpenAI:', response.status);
      return NextResponse.json(
        { error: 'Erreur lors de la génération du contenu.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content ?? '';

    if (!generatedText) {
      return NextResponse.json(
        { error: 'La génération a retourné un contenu vide.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ content: generatedText });
  } catch (error) {
    console.error('Erreur API generate-content:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la génération.' },
      { status: 500 }
    );
  }
}
