import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import ImageCarousel from '@/components/ImageCarousel';
import FormattedDescription from '@/components/FormattedDescription';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import type { ProjectMedia } from '@/types/database.types';
import { getLocalizedField } from '@/lib/i18n-helpers';
import type { Locale } from '@/i18n/config';
import {
  STATIC_PORTFOLIO_PROJECTS,
  getStaticPortfolioProject,
  type StaticPortfolioProject,
} from '@/lib/static-portfolio';

// Type pour les médias tels qu'ils sont stockés dans Supabase
type MediaAssetDB = {
  id: string;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  alt_text: string | null;
};

type ProjectMediaWithMedia = ProjectMedia & {
  media_assets: MediaAssetDB;
};

// Génération statique des paramètres pour toutes les pages de projets,
// y compris les études de cas "pillar" stockées en code.
export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('slug')
    .eq('published', true);

  const supabaseSlugs = (projects || []).map((p) => p.slug);
  const staticSlugs = STATIC_PORTFOLIO_PROJECTS.map((p) => p.slug).filter(
    (slug) => !supabaseSlugs.includes(slug),
  );

  return [...supabaseSlugs, ...staticSlugs].map((slug) => ({ slug }));
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio-detail' });
  const supabase = await createClient();
  
  const { data: dbProject } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  const staticProject = !dbProject ? getStaticPortfolioProject(slug) : undefined;

  if (!dbProject && !staticProject) {
    return {
      title: t('notFound'),
    };
  }

  const projectTitle = dbProject
    ? getLocalizedField(dbProject, 'title', locale as Locale)
    : staticProject!.title;
  const projectImage = dbProject
    ? (dbProject as { main_image_url?: string }).main_image_url
    : staticProject!.featured_image;
  const seoTitleRaw = dbProject
    ? getLocalizedField(dbProject, 'seo_title', locale as Locale)
    : staticProject!.seo_title;
  const seoDescriptionRaw = dbProject
    ? getLocalizedField(dbProject, 'seo_description', locale as Locale) ||
      getLocalizedField(dbProject, 'short_description', locale as Locale)
    : staticProject!.seo_description || staticProject!.short_description;
  const seoCity = dbProject
    ? (dbProject as { seo_city?: string }).seo_city
    : staticProject!.seo_city;

  const title = seoTitleRaw || `${projectTitle} | Portfolio Perrine Huon`;
  const description = seoDescriptionRaw || t('metadataFallback', { title: projectTitle });
  const cityKeywords = seoCity ? ` - ${seoCity}` : '';

  return {
    title,
    description: `${description}${cityKeywords}`,
    alternates: { canonical: `https://www.perrinehuon.com/portfolio/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.perrinehuon.com/portfolio/${slug}`,
      images: projectImage ? [{ url: projectImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: projectImage ? [projectImage] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'portfolio-detail' });

  const supabase = await createClient();

  // Charger le projet depuis la base de données
  const { data: dbProject } = await supabase
    .from('projects')
    .select(`
      *,
      project_media (
        *,
        media_assets (
          id,
          file_url,
          file_name,
          alt_text
        )
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .order('sort_order', { referencedTable: 'project_media', ascending: true })
    .single();

  // Fallback sur les études de cas "pillar" stockées en code (lib/static-portfolio.ts).
  const staticProject: StaticPortfolioProject | undefined = dbProject ? undefined : getStaticPortfolioProject(slug);

  if (!dbProject && !staticProject) {
    notFound();
  }

  const isStatic = !dbProject && !!staticProject;

  // Extraire les images du projet et les transformer pour le carousel.
  const projectImages = isStatic
    ? (staticProject!.gallery || []).map((url, idx) => ({
        id: `${staticProject!.id}-${idx}`,
        url,
        alt_text: staticProject!.title,
      }))
    : ((dbProject as { project_media?: ProjectMediaWithMedia[] }).project_media || [])
        .filter((pm) => pm.media_assets && pm.media_assets.file_url)
        .map((pm) => ({
          id: pm.media_assets.id,
          url: pm.media_assets.file_url,
          alt_text: pm.media_assets.alt_text,
        }));

  const projectTitle = isStatic
    ? staticProject!.title
    : getLocalizedField(dbProject!, 'title', locale as Locale);
  const projectShortDescription = isStatic
    ? staticProject!.short_description
    : getLocalizedField(dbProject!, 'short_description', locale as Locale);
  const projectLongDescription = isStatic
    ? staticProject!.long_description
    : getLocalizedField(dbProject!, 'long_description', locale as Locale);
  const projectClient = isStatic ? staticProject!.client : (dbProject as { client?: string }).client;
  const projectLocation = isStatic
    ? staticProject!.location
    : (dbProject as { location?: string }).location;
  const projectYear = isStatic ? staticProject!.year : (dbProject as { year?: number }).year;

  return (
    <div className="min-h-screen bg-paper-light grain-overlay">
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumb.home'), url: 'https://www.perrinehuon.com' },
          { name: t('breadcrumb.portfolio'), url: 'https://www.perrinehuon.com/portfolio' },
          { name: projectTitle, url: `https://www.perrinehuon.com/portfolio/${slug}` },
        ]}
      />
      {/* CreativeWork JSON-LD pour les études de cas portfolio (GEO + rich results). */}
      {isStatic && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              name: staticProject!.title,
              headline: staticProject!.seo_title || `${staticProject!.title} | Portfolio Perrine Huon`,
              description: staticProject!.seo_description || staticProject!.short_description,
              image: staticProject!.featured_image,
              url: `https://www.perrinehuon.com/portfolio/${slug}`,
              datePublished: staticProject!.published_at,
              dateCreated: staticProject!.created_at,
              author: {
                '@type': 'Person',
                name: 'Perrine Huon',
                url: 'https://www.perrinehuon.com',
              },
              creator: {
                '@type': 'Person',
                name: 'Perrine Huon',
              },
              keywords: staticProject!.keywords?.join(', '),
              genre: staticProject!.location,
              about: staticProject!.stack?.join(', '),
              ...(staticProject!.testimonial
                ? {
                    review: {
                      '@type': 'Review',
                      reviewBody: staticProject!.testimonial.quote,
                      author: {
                        '@type': 'Person',
                        name: staticProject!.testimonial.author,
                      },
                      reviewRating: {
                        '@type': 'Rating',
                        ratingValue: '5',
                        bestRating: '5',
                        worstRating: '1',
                      },
                    },
                  }
                : {}),
            }),
          }}
        />
      )}
      {/* Hero du projet */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom right, #2B5B8A 0%, #1E4A73 50%, #2B5B8A 70%, var(--accent-pink) 100%)'
        }}
      >

        <div className="container mx-auto px-4 relative z-10 text-center pt-32">
          {/* Badge type de projet */}
          {projectLocation && (
            <div className="inline-block px-6 py-2 border-2 border-[#D4C4A8]/30 rounded-full mb-6">
              <span className="text-[#D4C4A8] text-sm uppercase tracking-wider font-medium">
                {projectLocation}
              </span>
            </div>
          )}

          {/* Titre */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-[#D4C4A8]">
            {projectTitle}
          </h1>

          {/* Description courte */}
          {projectShortDescription && (
            <p className="text-xl lg:text-2xl text-[#D4C4A8]/80 max-w-3xl mx-auto font-light">
              {projectShortDescription}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pb-16">
            <Link
              href="/#contact"
              className="btn-cta group inline-flex items-center gap-3"
            >
              <span>{t('hero.similarProject')}</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#D4C4A8]/40 rounded-full text-[#D4C4A8] font-medium hover:bg-[#D4C4A8] hover:text-[#2B5B8A] transition-all duration-300 group"
            >
              <svg 
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('hero.allProjects')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Informations du projet */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {projectClient && (
              <div className="bg-paper border-2 border-primary/10 p-6 rounded-sketch-lg text-center hover:border-primary/20 transition-colors">
                <h3 className="text-primary/50 text-sm uppercase tracking-wider mb-2 font-medium">{t('info.client')}</h3>
                <p className="text-primary text-xl font-bold">{projectClient}</p>
              </div>
            )}
            
            {projectLocation && (
              <div className="bg-paper border-2 border-primary/10 p-6 rounded-sketch-lg text-center hover:border-primary/20 transition-colors">
                <h3 className="text-primary/50 text-sm uppercase tracking-wider mb-2 font-medium">{t('info.category')}</h3>
                <p className="text-primary text-xl font-bold">{projectLocation}</p>
              </div>
            )}
            
            {projectYear && (
              <div className="bg-paper border-2 border-primary/10 p-6 rounded-sketch-lg text-center hover:border-primary/20 transition-colors">
                <h3 className="text-primary/50 text-sm uppercase tracking-wider mb-2 font-medium">{t('info.year')}</h3>
                <p className="text-primary text-xl font-bold">{projectYear}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stack technique (statique uniquement) */}
      {isStatic && staticProject!.stack.length > 0 && (
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">
              Stack technique
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {staticProject!.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 border-2 border-primary/15 rounded-full text-primary/80 text-sm font-medium bg-paper hover:border-primary/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Résultats chiffrés (statique uniquement) — gold mine pour le GEO. */}
      {isStatic && staticProject!.results.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-8 text-center">
              Résultats chiffrés
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {staticProject!.results.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-paper border-2 border-primary/10 p-6 rounded-sketch-lg flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-primary text-lg font-medium leading-snug">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galerie d'images - Carousel */}
      {projectImages.length > 0 && (
        <section className="py-8 lg:py-12">
          <div className="mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-center text-primary">
              {t('gallery.title')}
            </h2>
            <div className="w-24 h-0.5 bg-primary/20 mx-auto mt-6" />
          </div>
          <ImageCarousel images={projectImages} projectTitle={projectTitle} />
        </section>
      )}

      {/* À propos du projet */}
      {projectLongDescription && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-paper border-2 border-primary/10 p-8 lg:p-10 rounded-sketch-xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">{t('about.title')}</h2>
              <FormattedDescription 
                content={projectLongDescription} 
                className="text-primary/70 text-lg leading-relaxed whitespace-pre-wrap"
              />
            </div>
          </div>
        </section>
      )}

      {/* Témoignage client (statique uniquement) — E-E-A-T. */}
      {isStatic && staticProject!.testimonial && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <blockquote className="bg-paper border-l-4 border-accent pl-8 pr-6 py-8 rounded-sketch-lg">
              <p className="text-2xl lg:text-3xl text-primary leading-relaxed font-medium italic mb-6">
                « {staticProject!.testimonial.quote} »
              </p>
              <footer className="text-primary/70">
                <span className="font-bold text-primary">{staticProject!.testimonial.author}</span>
                <span className="block text-sm mt-1">{staticProject!.testimonial.role}</span>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 lg:py-24 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-primary">
            {t('finalCta.title')}
          </h3>
          <a
            href="https://calendly.com/perrinehuon/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta btn-cta-pulse group inline-flex items-center gap-3"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>{t('finalCta.button')}</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
