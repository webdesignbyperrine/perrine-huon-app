import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Données de démo pour le développement
  const demoProject = {
    id: '1',
    title: 'LINEA VOL.1',
    slug: 'linea-vol1',
    short_description: 'Application SaaS pour gestion de projets créatifs',
    long_description: `
      <h2>Contexte du Projet</h2>
      <p>Création d'une application SaaS moderne pour la gestion de projets créatifs, avec une interface élégante et des fonctionnalités avancées.</p>
      
      <h2>Objectifs</h2>
      <ul>
        <li>Interface utilisateur intuitive et moderne</li>
        <li>Performance et fluidité maximales</li>
        <li>SEO optimisé pour Marseille et région PACA</li>
        <li>Responsive design sur tous supports</li>
      </ul>
      
      <h2>Solution & Technologies</h2>
      <p>Développement avec Next.js, TypeScript, et Supabase pour une solution scalable et performante.</p>
      
      <h2>Résultats SEO</h2>
      <p>Positionnement en top 3 sur "gestion projet Marseille" en moins de 3 mois.</p>
    `,
    seo_title: 'LINEA VOL.1 - Application SaaS Marseille | Perrine Huon',
    seo_description: 'Découvrez LINEA VOL.1, application SaaS de gestion de projets créatifs avec SEO local optimisé pour Marseille.',
    seo_city: 'Marseille',
    main_image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
  };

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero du projet */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        {demoProject.main_image_url && (
          <div className="absolute inset-0">
            <Image
              src={demoProject.main_image_url}
              alt={demoProject.title}
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
          <div className="inline-block px-6 py-2 glass-dark rounded-full mb-6">
            <span className="text-secondary text-sm uppercase tracking-wider">
              📍 {demoProject.seo_city}
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {demoProject.title}
            </span>
          </h1>

          {/* Description courte */}
          <p className="text-2xl text-white/70 max-w-3xl mx-auto font-light">
            {demoProject.short_description}
          </p>

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

      {/* Contenu du projet */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: demoProject.long_description }}
            style={{
              color: 'rgba(255,255,255,0.7)',
            }}
          />
        </div>
      </section>

      {/* Galerie (à implémenter avec project_media) */}
      <section className="py-20 bg-primary-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              GALERIE
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video glass-dark rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/30">
                  Médias à ajouter via admin
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

