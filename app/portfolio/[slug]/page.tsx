import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import ImageCarousel from '@/components/ImageCarousel';
import CalendlyButton from '@/components/CalendlyButton';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const supabase = await createClient();
  
  // Charger le projet depuis la base de données
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_media (
        *,
        media:media_assets (*)
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !project) {
    notFound();
  }

  // Extraire les images du projet
  const projectImages = project.project_media?.map((pm: any) => pm.media) || [];

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero du projet */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        {project.featured_image && (
          <div className="absolute inset-0">
            <Image
              src={project.featured_image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 via-primary-900/80 to-primary-900" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 text-center pt-32">
          {/* Badge type de projet */}
          {project.location && (
            <div className="inline-block px-6 py-2 glass-light rounded-full mb-6">
              <span className="text-white text-sm uppercase tracking-wider">
                {project.location}
              </span>
            </div>
          )}

          {/* Titre */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {project.title}
            </span>
          </h1>

          {/* Description courte */}
          {project.short_description && (
            <p className="text-2xl text-white/70 max-w-3xl mx-auto font-light">
              {project.short_description}
            </p>
          )}

          {/* CTAs fixes */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pb-16">
            <Link
              href="#contact"
              className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
            >
              <div 
                className="relative flex items-center gap-3 px-10 py-4 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
                <span className="absolute inset-1 rounded-full pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)', boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)' }}>
                  <span className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }} />
                </span>
                <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">Un projet similaire ?</span>
              </div>
            </Link>
            <Link
              href="/portfolio"
              className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
            >
              <div 
                className="relative flex items-center gap-3 px-10 py-4 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
                <span className="relative z-10 text-white/80 group-hover/cta:text-white font-semibold tracking-wider uppercase text-sm transition-colors">← Tous les projets</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Informations du projet */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {project.client && (
              <div className="glass-light p-6 rounded-xl text-center">
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Client</h3>
                <p className="text-white text-xl font-semibold">{project.client}</p>
              </div>
            )}
            
            {project.location && (
              <div className="glass-light p-6 rounded-xl text-center">
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Catégorie</h3>
                <p className="text-white text-xl font-semibold">{project.location}</p>
              </div>
            )}
            
            {project.year && (
              <div className="glass-light p-6 rounded-xl text-center">
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Année</h3>
                <p className="text-white text-xl font-semibold">{project.year}</p>
              </div>
            )}
          </div>

          {/* Description longue */}
          {project.long_description && (
            <div className="glass-dark p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-6 text-white">À propos du projet</h2>
              <div className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
                {project.long_description}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Galerie d'images - Carousel */}
      {projectImages.length > 0 && (
        <section className="py-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-center">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                GALERIE
              </span>
            </h2>
          </div>
          <ImageCarousel images={projectImages} projectTitle={project.title} />
        </section>
      )}

      {/* CTA final */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold mb-6 text-white">
          Un projet similaire en tête ?
        </h3>
        <CalendlyButton className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]">
          <div 
            className="relative flex items-center gap-3 px-12 py-5 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
            <span className="absolute inset-1 rounded-full pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(180deg, #5A8F6A 0%, #4A7C59 50%, #3A6347 100%)', boxShadow: '0 0 20px rgba(74, 124, 89, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)' }}>
              <span className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }} />
            </span>
            <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">Réserver un appel</span>
          </div>
        </CalendlyButton>
      </section>
    </div>
  );
}
