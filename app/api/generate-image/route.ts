import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const ALLOWED_STYLES = ['professional', 'illustration', 'abstract', 'tech'] as const;
type ImageStyle = (typeof ALLOWED_STYLES)[number];

const MAX_CUSTOM_PROMPT_LENGTH = 1000;

const STYLE_DESCRIPTIONS: Record<ImageStyle, string> = {
  professional: 'professional photography, modern, clean, minimalist, high quality, 8k',
  illustration: 'digital illustration, vibrant colors, artistic, modern style, detailed',
  abstract: 'abstract art, geometric shapes, gradient colors, modern, elegant',
  tech: 'technology themed, futuristic, digital, sleek design, purple and orange accents',
};

function buildImagePrompt(title: string, style: ImageStyle): string {
  const styleDescription = STYLE_DESCRIPTIONS[style] ?? STYLE_DESCRIPTIONS.professional;
  return `Create a professional blog cover image for an article titled "${title}". Style: ${styleDescription}. The image should be visually appealing, relevant to the topic, and suitable as a blog header. No text or typography in the image.`;
}

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
    const { title, style = 'professional', customPrompt } = body;

    if (!title && !customPrompt) {
      return NextResponse.json(
        { error: 'Le titre ou un prompt personnalisé est requis.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service de génération non configuré.' },
        { status: 500 }
      );
    }

    const resolvedStyle: ImageStyle = ALLOWED_STYLES.includes(style as ImageStyle)
      ? (style as ImageStyle)
      : 'professional';

    const prompt =
      customPrompt && typeof customPrompt === 'string' && customPrompt.trim()
        ? customPrompt.trim().slice(0, MAX_CUSTOM_PROMPT_LENGTH)
        : buildImagePrompt(String(title ?? '').trim().slice(0, 300), resolvedStyle);

    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url',
      }),
    });

    if (!dalleResponse.ok) {
      console.error('Erreur API DALL-E:', dalleResponse.status);
      return NextResponse.json(
        { error: "Erreur lors de la génération de l'image." },
        { status: 500 }
      );
    }

    const dalleData = await dalleResponse.json();
    const imageUrl = dalleData.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Aucune image retournée par le service de génération." },
        { status: 500 }
      );
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Impossible de télécharger l'image générée." },
        { status: 500 }
      );
    }

    const imageBlob = await imageResponse.blob();
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

    const fileName = `blog-cover-${Date.now()}-${Math.random().toString(36).substring(2)}.png`;
    const filePath = `blog/covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(filePath, imageBuffer, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) {
      console.error("Erreur upload image générée:", uploadError.message);
      return NextResponse.json(
        { error: "Erreur lors de l'upload de l'image." },
        { status: 500 }
      );
    }

    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(filePath);

    return NextResponse.json({ imageUrl: publicUrl });
  } catch (error) {
    console.error("Erreur API generate-image:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la génération de l'image." },
      { status: 500 }
    );
  }
}
