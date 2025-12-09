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
        .limit(3);

      if (!error && data) {
        setProjects(data as ProjectWithMedia[]);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const demoProjects = [
    {
      id: '1',
      title: 'E-COMMERCE LYON',
      slug: 'ecommerce-lyon',
      short_description: 'Boutique en ligne moderne avec SEO local optimisé',
      seo_city: 'Lyon',
      main_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    },
    {
      id: '2',
      title: 'SAAS DASHBOARD',
      slug: 'saas-dashboard',
      short_description: 'Application de gestion avec interface élégante',
      seo_city: 'Paris',
      main_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    },
    {
      id: '3',
      title: 'SITE VITRINE',
      slug: 'site-vitrine',
      short_description: 'Présence web premium et performante',
      seo_city: 'Marseille',
      main_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : demoProjects;

  return (
    <section id="portfolio" className="relative py-32 bg-primary-900 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Titre */}
          <div className="text-center mb-24">
            <span className="text-sm uppercase tracking-[0.3em] text-white/40 font-light">03</span>
            <h2 className="text-6xl md:text-7xl font-bold mt-4">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                PORTFOLIO
              </span>
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8" />
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {displayProjects.map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.slug}`}
                    className="group relative aspect-square overflow-hidden rounded-2xl"
                  >
                    {/* Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform scale-100 group-hover:scale-110 transition-transform duration-700"
                      style={{ 
                        backgroundImage: project.main_image_url 
                          ? `url(${project.main_image_url})`
                          : undefined,
                        filter: 'blur(8px) brightness(0.6)'
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    {/* Contenu */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="text-sm text-secondary uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {project.seo_city}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.short_description}
                      </p>
                    </div>

                    {/* Border effect */}
                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-secondary/30 rounded-2xl transition-colors duration-500" />
                  </Link>
                ))}
              </div>

              <div className="text-center mt-16">
                <Link
                  href="/portfolio"
                  className="inline-block glass-dark px-12 py-5 hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-white/80 font-semibold tracking-wider uppercase text-sm">
                    Voir tous les projets
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
