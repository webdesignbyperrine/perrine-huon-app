import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import ImageCarousel from '@/components/ImageCarousel';
import FormattedDescription from '@/components/FormattedDescription';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import type { ProjectMedia } from '@/types/database.types';

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

// Génération statique des paramètres pour toutes les pages de projets
export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('slug')
    .eq('published', true);

  return (projects || []).map((project) => ({
    slug: project.slug,
  }));
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: project } = await supabase
    .from('projects')
    .select('title, short_description, seo_title, seo_description, main_image_url, seo_city')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!project) {
    return {
      title: 'Projet non trouvé',
    };
  }

  const title = project.seo_title || `${project.title} | Portfolio Perrine Huon`;
  const description = project.seo_description || project.short_description || `Découvrez le projet ${project.title} réalisé par Perrine Huon, web designer freelance.`;
  const cityKeywords = project.seo_city ? ` - ${project.seo_city}` : '';

  return {
    title,
    description: `${description}${cityKeywords}`,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://perrinehuon.com/portfolio/${slug}`,
      images: project.main_image_url ? [{ url: project.main_image_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.main_image_url ? [project.main_image_url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const supabase = await createClient();
  
  // Charger le projet depuis la base de données
  const { data: project, error } = await supabase
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

  if (error || !project) {
    notFound();
  }

  // Extraire les images du projet et les transformer pour le carousel
  const projectImages = (project.project_media as ProjectMediaWithMedia[] | undefined)
    ?.filter(pm => pm.media_assets && pm.media_assets.file_url)
    .map(pm => ({
      id: pm.media_assets.id,
      url: pm.media_assets.file_url,
      alt_text: pm.media_assets.alt_text,
    })) || [];

  return (
    <div className="min-h-screen bg-paper-light grain-overlay">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://perrinehuon.com' },
          { name: 'Portfolio', url: 'https://perrinehuon.com/portfolio' },
          { name: project.title, url: `https://perrinehuon.com/portfolio/${slug}` },
        ]}
      />
      {/* Hero du projet */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom right, #2B5B8A 0%, #1E4A73 50%, #2B5B8A 70%, #ff0f7c 100%)'
        }}
      >

        <div className="container mx-auto px-4 relative z-10 text-center pt-32">
          {/* Badge type de projet */}
          {project.location && (
            <div className="inline-block px-6 py-2 border-2 border-[#D4C4A8]/30 rounded-full mb-6">
              <span className="text-[#D4C4A8] text-sm uppercase tracking-wider font-medium">
                {project.location}
              </span>
            </div>
          )}

          {/* Titre */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-[#D4C4A8]">
            {project.title}
          </h1>

          {/* Description courte */}
          {project.short_description && (
            <p className="text-xl lg:text-2xl text-[#D4C4A8]/80 max-w-3xl mx-auto font-light">
              {project.short_description}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pb-16">
            <Link
              href="/#contact"
              className="btn-cta group inline-flex items-center gap-3"
            >
              <span>Un projet similaire ?</span>
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
              <span>Tous les projets</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Informations du projet */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {project.client && (
              <div className="bg-paper border-2 border-primary/10 p-6 rounded-sketch-lg text-center hover:border-primary/20 transition-colors">
                <h3 className="text-primary/50 text-sm uppercase tracking-wider mb-2 font-medium">Client</h3>
                <p className="text-primary text-xl font-bold">{project.client}</p>
              </div>
            )}
            
            {project.location && (
              <div className="bg-paper border-2 border-primary/10 p-6 rounded-sketch-lg text-center hover:border-primary/20 transition-colors">
                <h3 className="text-primary/50 text-sm uppercase tracking-wider mb-2 font-medium">Catégorie</h3>
                <p className="text-primary text-xl font-bold">{project.location}</p>
              </div>
            )}
            
            {project.year && (
              <div className="bg-paper border-2 border-primary/10 p-6 rounded-sketch-lg text-center hover:border-primary/20 transition-colors">
                <h3 className="text-primary/50 text-sm uppercase tracking-wider mb-2 font-medium">Année</h3>
                <p className="text-primary text-xl font-bold">{project.year}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Galerie d'images - Carousel */}
      {projectImages.length > 0 && (
        <section className="py-8 lg:py-12">
          <div className="mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-center text-primary">
              Galerie
            </h2>
            <div className="w-24 h-0.5 bg-primary/20 mx-auto mt-6" />
          </div>
          <ImageCarousel images={projectImages} projectTitle={project.title} />
        </section>
      )}

      {/* À propos du projet */}
      {project.long_description && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-paper border-2 border-primary/10 p-8 lg:p-10 rounded-sketch-xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">À propos du projet</h2>
              <FormattedDescription 
                content={project.long_description} 
                className="text-primary/70 text-lg leading-relaxed whitespace-pre-wrap"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 lg:py-24 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-primary">
            Un projet similaire en tête ?
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
            <span>Réserver un appel</span>
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
