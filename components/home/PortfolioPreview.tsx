'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ProjectWithMedia } from '@/types/database.types';

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<ProjectWithMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_media (
            *,
            media:media_assets (*)
          )
        `)
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setProjects(data as ProjectWithMedia[]);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // Données de démo si pas encore de projets dans la base
  const demoProjects = [
    {
      id: '1',
      title: 'E-commerce Moderne',
      slug: 'ecommerce-moderne',
      short_description: 'Boutique en ligne avec paiement sécurisé et SEO local optimisé pour Lyon.',
      seo_city: 'Lyon',
      main_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    },
    {
      id: '2',
      title: 'Application SaaS',
      slug: 'application-saas',
      short_description: 'Dashboard complet pour la gestion de projets avec interface moderne.',
      seo_city: 'Paris',
      main_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    },
    {
      id: '3',
      title: 'Site Vitrine Premium',
      slug: 'site-vitrine-premium',
      short_description: 'Site web élégant pour cabinet d\'avocats avec SEO local Marseille.',
      seo_city: 'Marseille',
      main_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : demoProjects;

  return (
    <section id="portfolio-preview" className="py-20 bg-gradient-to-b from-primary to-primary-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Portfolio</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mt-4">
            Découvrez quelques-uns de mes projets récents, optimisés pour le référencement local.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {displayProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="card group overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <div 
                      className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ 
                        backgroundImage: project.main_image_url 
                          ? `url(${project.main_image_url})` 
                          : undefined 
                      }}
                    >
                      {!project.main_image_url && (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Badge ville */}
                    {project.seo_city && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                        📍 {project.seo_city}
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {project.short_description}
                  </p>
                  <div className="flex items-center text-secondary font-semibold group-hover:gap-2 transition-all">
                    Voir le projet
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio" className="btn-primary inline-block">
                Voir tous les projets
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

