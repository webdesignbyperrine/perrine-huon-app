import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { formatDate, estimateReadingTime } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';
import SafeHTML from '@/components/SafeHTML';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

// Génération statique des paramètres pour tous les articles
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, seo_title, seo_description, featured_image, seo_city, published_at')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  const title = post.seo_title || `${post.title} | Blog Perrine Huon`;
  const description = post.seo_description || post.excerpt || `${post.title} - Conseils et actualités web design par Perrine Huon, web designer freelance.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://perrinehuon.com/blog/${slug}`,
      publishedTime: post.published_at || undefined,
      authors: ['Perrine Huon'],
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Récupérer l'article depuis Supabase
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  // Si l'article n'existe pas, afficher 404
  if (error || !post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content || '');

  return (
    <div className="min-h-screen bg-paper">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://perrinehuon.com' },
          { name: 'Blog', url: 'https://perrinehuon.com/blog' },
          { name: post.title, url: `https://perrinehuon.com/blog/${slug}` },
        ]}
      />
      {/* Hero article */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {post.featured_image && (
          <div className="absolute inset-0">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-paper/40" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 pb-16 pt-32">
          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-primary/50 text-sm">
              <time>{formatDate(post.published_at || post.created_at)}</time>
              <span>•</span>
              <span>{readingTime} min de lecture</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">
              {post.title}
            </h1>
            
            {/* Extrait */}
            {post.excerpt && (
              <p className="text-xl text-primary/60 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <SafeHTML 
            html={post.content || ''} 
            className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-12 prose-p:text-primary/70 prose-p:leading-relaxed prose-li:text-primary/70 prose-strong:text-primary prose-ul:text-primary/70"
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-paper-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-primary/10 shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-primary">
              Envie d'en discuter ?
            </h3>
            <p className="text-primary/60 mb-8 font-light">
              Parlons de votre projet et voyons comment je peux vous aider
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#rdv"
                className="btn-cta"
              >
                Réserver un appel
              </Link>
              <Link
                href="/blog"
                className="btn-sketch"
              >
                ← Tous les articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
