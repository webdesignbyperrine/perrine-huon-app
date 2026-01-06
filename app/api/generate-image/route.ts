import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    // Vérification authentification admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Non autorisé. Veuillez vous connecter.' },
        { status: 401 }
      );
    }

    // Vérifier le rôle admin
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

    const { title, style = 'professional', customPrompt } = await request.json();

    if (!title && !customPrompt) {
      return NextResponse.json(
        { error: 'Le titre ou un prompt personnalisé est requis pour générer une image' },
        { status: 400 }
      );
    }

    // Vérifier la clé API OpenAI
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Clé API OpenAI non configurée. Ajoutez OPENAI_API_KEY dans vos variables d\'environnement.' },
        { status: 500 }
      );
    }

    let prompt: string;

    // Si un prompt personnalisé est fourni, l'utiliser directement
    if (customPrompt && customPrompt.trim()) {
      prompt = customPrompt.trim();
    } else {
      // Sinon, générer un prompt optimisé basé sur le titre et le style
      const stylePrompts: Record<string, string> = {
        professional: 'professional photography, modern, clean, minimalist, high quality, 8k',
        illustration: 'digital illustration, vibrant colors, artistic, modern style, detailed',
        abstract: 'abstract art, geometric shapes, gradient colors, modern, elegant',
        tech: 'technology themed, futuristic, digital, sleek design, purple and orange accents',
      };

      const styleDescription = stylePrompts[style] || stylePrompts.professional;
      
      prompt = `Create a professional blog cover image for an article titled "${title}". 
Style: ${styleDescription}. 
The image should be visually appealing, relevant to the topic, and suitable as a blog header. 
No text or typography in the image.`;
    }

    // Appeler DALL-E 3
    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard', // 'standard' ou 'hd'
        response_format: 'url',
      }),
    });

    if (!dalleResponse.ok) {
      const error = await dalleResponse.json();
      console.error('DALL-E error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la génération de l\'image' },
        { status: 500 }
      );
    }

    const dalleData = await dalleResponse.json();
    const imageUrl = dalleData.data[0].url;

    // Télécharger l'image depuis l'URL temporaire OpenAI
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

    // Upload vers Supabase Storage
    const fileName = `blog-cover-${Date.now()}-${Math.random().toString(36).substring(2)}.png`;
    const filePath = `blog/covers/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(filePath, imageBuffer, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'upload de l\'image' },
        { status: 500 }
      );
    }

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(filePath);

    return NextResponse.json({ 
      imageUrl: publicUrl,
      prompt: prompt // Pour debug
    });

  } catch (error) {
    console.error('Generate image error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la génération de l\'image' },
      { status: 500 }
    );
  }
}

