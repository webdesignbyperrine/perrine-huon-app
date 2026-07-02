import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { formatDate, estimateReadingTime } from '@/lib/utils';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import SafeHTML from '@/components/SafeHTML';
import { BreadcrumbJsonLd, ArticleJsonLd, FAQPageJsonLd, HowToJsonLd } from '@/components/JsonLd';
import { getLocalizedField } from '@/lib/i18n-helpers';
import type { Locale } from '@/i18n/config';
import {
  STATIC_BLOG_POSTS,
  getStaticBlogPost,
  type StaticBlogPost,
} from '@/lib/static-blog-posts';

// Génération statique des paramètres pour tous les articles (Supabase + statiques)
export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  const supabaseSlugs = (posts || []).map((p) => p.slug);
  const staticSlugs = STATIC_BLOG_POSTS.map((p) => p.slug).filter(
    (slug) => !supabaseSlugs.includes(slug),
  );
  const allSlugs = [...supabaseSlugs, ...staticSlugs];

  const locales = ['fr', 'en', 'es'];
  const params = [];

  for (const locale of locales) {
    for (const slug of allSlugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

// Métadonnées SEO dynamiques (Supabase d'abord, fallback statique)
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

  const staticPost = getStaticBlogPost(slug);
  const source = post || staticPost;

  if (!source) {
    return {
      title: t('metadataFallback'),
    };
  }

  const title = getLocalizedField(source, 'seo_title', locale as Locale) || `${getLocalizedField(source, 'title', locale as Locale)} | Blog Perrine Huon`;
  const description =
    getLocalizedField(source, 'seo_description', locale as Locale) ||
    getLocalizedField(source, 'excerpt', locale as Locale) ||
    `${getLocalizedField(source, 'title', locale as Locale)} - Conseils et actualités par Perrine Huon, développeur web freelance.`;
  const baseUrl = 'https://www.perrinehuon.com';
  const localePath = locale === 'fr' ? '' : `/${locale}`;
  const url = `${baseUrl}${localePath}/blog/${slug}`;
  const featuredImage = (source as { featured_image?: string | null }).featured_image;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      publishedTime: source.published_at || undefined,
      authors: ['Perrine Huon'],
      images: featuredImage ? [{ url: featuredImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog-detail' });
  const supabase = await createClient();

  const { data: dbPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  // Fallback to static "pillar" articles if Supabase has no entry for this slug.
  const staticPost: StaticBlogPost | undefined = dbPost ? undefined : getStaticBlogPost(slug);
  const post = dbPost || staticPost;
  const isStatic = !dbPost && !!staticPost;

  if (!post) {
    notFound();
  }

  const title = getLocalizedField(post, 'title', locale as Locale);
  const excerpt = getLocalizedField(post, 'excerpt', locale as Locale);
  const content = getLocalizedField(post, 'content', locale as Locale) || '';
  const featuredImage = (post as { featured_image?: string | null }).featured_image || undefined;
  const publishedAt = post.published_at || (post as { created_at?: string }).created_at;
  const updatedAt = (post as { updated_at?: string }).updated_at || publishedAt;
  const wordCount = isStatic ? staticPost?.wordCount : undefined;
  const keywords = isStatic ? staticPost?.keywords : undefined;
  const faqs = isStatic ? staticPost?.faqs : undefined;
  const schemaType = isStatic ? staticPost?.schemaType : undefined;

  const readingTime = estimateReadingTime(content);
  const baseUrl = 'https://www.perrinehuon.com';
  const localePath = locale === 'fr' ? '' : `/${locale}`;
  const articleUrl = `${baseUrl}${localePath}/blog/${slug}`;

  return (
    <div className="min-h-screen bg-paper">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: `${baseUrl}${localePath || '/'}` },
          { name: t('breadcrumb.blog'), url: `${baseUrl}${localePath}/blog` },
          { name: title, url: articleUrl },
        ]}
      />
      <ArticleJsonLd
        headline={title}
        description={excerpt || ''}
        url={articleUrl}
        datePublished={publishedAt}
        dateModified={updatedAt}
        image={featuredImage}
        keywords={keywords}
        wordCount={wordCount}
        speakableCss={['h1', 'h2', '.lead']}
      />
      {schemaType === 'howto' && staticPost?.howToSteps && (
        <HowToJsonLd
          name={title}
          description={excerpt || ''}
          steps={staticPost.howToSteps}
          image={featuredImage}
        />
      )}
      {faqs && faqs.length > 0 && (
        <FAQPageJsonLd faqs={faqs} speakable />
      )}

      {/* Hero article */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={featuredImage}
              alt={title}
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
            <div className="flex flex-wrap items-center gap-4 mb-6 text-primary/50 text-sm">
              <time>{formatDate(publishedAt, locale)}</time>
              <span>•</span>
              <span>{readingTime} {t('readingTime')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">
              {title}
            </h1>

            {excerpt && (
              <p className="text-xl text-primary/60 leading-relaxed">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <SafeHTML
            html={content}
            className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-12 prose-p:text-primary/70 prose-p:leading-relaxed prose-li:text-primary/70 prose-strong:text-primary prose-ul:text-primary/70 prose-table:text-primary/70 prose-th:text-primary prose-th:font-bold prose-a:text-accent hover:prose-a:underline"
          />

          {faqs && faqs.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-3xl font-bold mb-8 text-primary">FAQ</h2>
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="border-2 border-primary/10 rounded-sketch-lg p-6 bg-white/40 backdrop-blur-sm group">
                    <summary className="font-bold text-primary cursor-pointer marker:text-accent">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-primary/70 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
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
