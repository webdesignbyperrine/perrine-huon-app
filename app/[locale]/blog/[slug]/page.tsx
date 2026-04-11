import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { formatDate, estimateReadingTime } from '@/lib/utils';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import SafeHTML from '@/components/SafeHTML';
import { BreadcrumbJsonLd, ArticleJsonLd } from '@/components/JsonLd';
import { getLocalizedField } from '@/lib/i18n-helpers';
import type { Locale } from '@/i18n/config';

// Génération statique des paramètres pour tous les articles
export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  const locales = ['fr', 'en', 'es'];
  const params = [];
  
  for (const locale of locales) {
    for (const post of posts || []) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return params;
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const t = await getTranslations({ locale, namespace: 'blog-detail' });
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) {
    return {
      title: t('metadataFallback'),
    };
  }

  const title = getLocalizedField(post, 'seo_title', locale as Locale) || `${getLocalizedField(post, 'title', locale as Locale)} | Blog Perrine Huon`;
  const description = getLocalizedField(post, 'seo_description', locale as Locale) || getLocalizedField(post, 'excerpt', locale as Locale) || `${getLocalizedField(post, 'title', locale as Locale)} - Conseils et actualités web design par Perrine Huon, web designer freelance.`;
  const baseUrl = 'https://perrinehuon.com';
  const localePath = locale === 'fr' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePath}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
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

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'blog-detail' });
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

  const readingTime = estimateReadingTime(getLocalizedField(post, 'content', locale as Locale) || '');
  const baseUrl = 'https://perrinehuon.com';
  const localePath = locale === 'fr' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen bg-paper">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: `${baseUrl}${localePath}` },
          { name: t('breadcrumb.blog'), url: `${baseUrl}${localePath}/blog` },
          { name: getLocalizedField(post, 'title', locale as Locale), url: `${baseUrl}${localePath}/blog/${slug}` },
        ]}
      />
      <ArticleJsonLd
        headline={getLocalizedField(post, 'title', locale as Locale)}
        description={getLocalizedField(post, 'excerpt', locale as Locale) || ''}
        url={`${baseUrl}${localePath}/blog/${slug}`}
        datePublished={post.published_at || post.created_at}
        dateModified={post.updated_at || post.published_at || post.created_at}
        image={post.featured_image || undefined}
      />
      {/* Hero article */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {post.featured_image && (
          <div className="absolute inset-0">
            <Image
              src={post.featured_image}
              alt={getLocalizedField(post, 'title', locale as Locale)}
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
              <time>{formatDate(post.published_at || post.created_at, locale)}</time>
              <span>•</span>
              <span>{readingTime} {t('readingTime')}</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">
              {getLocalizedField(post, 'title', locale as Locale)}
            </h1>
            
            {/* Extrait */}
            {getLocalizedField(post, 'excerpt', locale as Locale) && (
              <p className="text-xl text-primary/60 leading-relaxed">
                {getLocalizedField(post, 'excerpt', locale as Locale)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <SafeHTML 
            html={getLocalizedField(post, 'content', locale as Locale) || ''} 
            className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-12 prose-p:text-primary/70 prose-p:leading-relaxed prose-li:text-primary/70 prose-strong:text-primary prose-ul:text-primary/70"
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-paper-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-primary/10 shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-primary">
              {t('finalCta.title')}
            </h3>
            <p className="text-primary/60 mb-8 font-light">
              {t('finalCta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#rdv"
                className="btn-cta"
              >
                {t('finalCta.bookCall')}
              </Link>
              <Link
                href="/blog"
                className="btn-sketch"
              >
                {t('finalCta.allArticles')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
