'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import LaptopMockup from '@/components/LaptopMockup';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedField } from '@/lib/i18n-helpers';
import { STATIC_PORTFOLIO_PROJECTS } from '@/lib/static-portfolio';

export default function PortfolioPage() {
  const t = useTranslations('portfolio-page');
  const locale = useLocale() as 'fr' | 'en' | 'es';
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });
  const [headerRef, headerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // "Pillar" portfolio cases stored in code (lib/static-portfolio.ts) so the
  // portfolio page is never empty even before Supabase is populated. If a
  // Supabase row exists for a given slug, the Supabase version wins.
  const supabaseSlugs = new Set(projects.map((p) => p.slug));
  const staticProjects = STATIC_PORTFOLIO_PROJECTS.filter((p) => !supabaseSlugs.has(p.slug)).map(
    (p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      short_description: p.short_description,
      seo_city: p.seo_city,
      featured_image: p.featured_image,
      created_at: p.created_at,
    }),
  );

  const supabaseHasTranslations =
    locale === 'fr' || (projects.length > 0 && `title_${locale}` in projects[0]);
  const dbProjects = supabaseHasTranslations ? projects : [];
  // Les projets Supabase arrivent déjà triés par sort_order + created_at.
  // Les projets statiques sont placés à la suite.
  const displayProjects = [...dbProjects, ...staticProjects];


  return (
    <div className="min-h-screen bg-paper-light grain-overlay pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span 
            className={`inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t('header.subtitle')}
          </span>
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-6 transition-all duration-700 delay-100 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('header.title')}
          </h1>
          <p 
            className={`text-lg text-primary/60 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t('header.description')}
          </p>
          
          {/* Ligne décorative */}
          <div 
            className={`w-24 h-0.5 bg-primary/20 mx-auto mt-8 transition-all duration-1000 delay-300 ${
              headerVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
        </div>


        {/* Grille de projets */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div ref={gridRef} className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {displayProjects.map((project: any, index) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className={`group relative bg-paper border-2 border-primary/10 rounded-sketch-lg overflow-hidden hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Laptop Mockup */}
                <div className="relative p-6 pt-8 pb-4 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                  {project.featured_image ? (
                    <LaptopMockup
                      src={project.featured_image}
                      alt={getLocalizedField(project, 'title', locale)}
                      className="w-full max-w-[280px] transform group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-primary/5 flex items-center justify-center rounded-lg">
                      <svg className="w-16 h-16 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Contenu */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {getLocalizedField(project, 'title', locale)}
                  </h2>
                  {getLocalizedField(project, 'short_description', locale) && (
                    <p className="text-primary/60 text-sm line-clamp-2">
                      {getLocalizedField(project, 'short_description', locale)}
                    </p>
                  )}
                </div>
                
                {/* Barre de progression au hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            href="/?openQualifier=true"
            className="btn-cta btn-cta-pulse group inline-flex items-center gap-3"
          >
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>{t('cta.button')}</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
