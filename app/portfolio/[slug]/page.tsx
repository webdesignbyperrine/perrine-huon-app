import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

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
          {/* Badge ville */}
          {project.location && (
            <div className="inline-block px-6 py-2 glass-dark rounded-full mb-6">
              <span className="text-secondary text-sm uppercase tracking-wider">
                📍 {project.location}
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="#contact"
              className="px-10 py-4 bg-gradient-to-r from-secondary to-accent-red text-white font-semibold tracking-wider uppercase text-sm"
            >
              Un projet similaire ?
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-4 glass-dark text-white/80 hover:text-white font-semibold tracking-wider uppercase text-sm transition-colors"
            >
              ← Tous les projets
            </Link>
          </div>
        </div>
      </section>

      {/* Informations du projet */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {project.client && (
              <div className="glass-dark p-6 rounded-xl text-center">
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Client</h3>
                <p className="text-white text-xl font-semibold">{project.client}</p>
              </div>
            )}
            
            {project.location && (
              <div className="glass-dark p-6 rounded-xl text-center">
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Localisation</h3>
                <p className="text-white text-xl font-semibold">{project.location}</p>
              </div>
            )}
            
            {project.year && (
              <div className="glass-dark p-6 rounded-xl text-center">
                <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">Année</h3>
                <p className="text-white text-xl font-semibold">{project.year}</p>
              </div>
            )}
          </div>

          {/* Description longue */}
          {project.long_description && (
            <div className="glass-dark p-8 rounded-xl mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">À propos du projet</h2>
              <div className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
                {project.long_description}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Galerie d'images */}
      {projectImages.length > 0 && (
        <section className="py-20 bg-primary-800/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                GALERIE
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projectImages.map((media: any) => (
                <div key={media.id} className="aspect-video glass-dark rounded-xl overflow-hidden group">
                  <div className="relative w-full h-full">
                    <Image
                      src={media.file_url}
                      alt={media.alt_text || project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold mb-6 text-white">
          Un projet similaire en tête ?
        </h3>
        <Link
          href="/#rdv"
          className="inline-block px-12 py-5 bg-gradient-to-r from-secondary to-accent-red text-white font-semibold tracking-wider uppercase text-sm"
        >
          Réserver un appel
        </Link>
      </section>
    </div>
  );
}
