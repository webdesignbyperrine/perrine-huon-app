import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, type } = await request.json();

    // Vérifier la clé API OpenAI
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Clé API OpenAI non configurée. Ajoutez OPENAI_API_KEY dans vos variables d\'environnement.' },
        { status: 500 }
      );
    }

    // Préparer le prompt selon le type demandé
    const prompts = {
      excerpt: `Rédige un résumé accrocheur et professionnel de 2-3 phrases pour un article de blog intitulé "${title}". Le résumé doit donner envie de lire l'article et être optimisé pour le SEO.`,
      content: `Rédige un article de blog complet et professionnel sur le sujet "${title}". L'article doit :
- Être informatif et engageant
- Contenir 4-5 sections avec des titres
- Inclure des conseils pratiques
- Être optimisé pour le SEO
- Faire environ 800-1000 mots
- Être rédigé en français

Structure suggérée : Introduction, 3-4 sections principales avec sous-titres, Conclusion.`,
    };

    const prompt = prompts[type as keyof typeof prompts];

    // Appeler l'API OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant spécialisé dans la rédaction d\'articles de blog professionnels sur le web design, le développement web et le SEO.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: type === 'excerpt' ? 200 : 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la génération du contenu' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return NextResponse.json({ content: generatedText });

  } catch (error) {
    console.error('Generate content error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la génération' },
      { status: 500 }
    );
  }
}

