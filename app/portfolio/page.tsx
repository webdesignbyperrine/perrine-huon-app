'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import LaptopMockup from '@/components/LaptopMockup';

export default function PortfolioPage() {
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
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // Données de démo
  const demoProjects = [
    {
      id: '1',
      title: 'STUDIO 74',
      slug: 'studio-74',
      short_description: 'Site vitrine premium pour studio créatif à Lyon',
      seo_city: 'Lyon',
      featured_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    },
    {
      id: '2',
      title: 'GLOSTER',
      slug: 'gloster',
      short_description: 'E-commerce moderne avec paiement sécurisé',
      seo_city: 'Paris',
      featured_image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800',
    },
    {
      id: '3',
      title: 'LINEA',
      slug: 'linea-vol1',
      short_description: 'Application SaaS pour gestion de projets',
      seo_city: 'Marseille',
      featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    },
    {
      id: '4',
      title: 'CUBE 2.0',
      slug: 'cube-20',
      short_description: 'Portfolio 3D interactif pour architecte',
      seo_city: 'Bordeaux',
      featured_image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
    },
    {
      id: '5',
      title: 'NEXUS',
      slug: 'nexus',
      short_description: 'Plateforme collaborative pour équipes',
      seo_city: 'Toulouse',
      featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    },
    {
      id: '6',
      title: 'AURORA',
      slug: 'aurora',
      short_description: 'Site e-learning avec vidéos interactives',
      seo_city: 'Nantes',
      featured_image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : demoProjects;


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
            Mes réalisations
          </span>
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-6 transition-all duration-700 delay-100 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Portfolio
          </h1>
          <p 
            className={`text-lg text-primary/60 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Une sélection de mes projets récents, optimisés pour le référencement local
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
                      alt={project.title}
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
                    {project.title}
                  </h2>
                  {project.short_description && (
                    <p className="text-primary/60 text-sm line-clamp-2">
                      {project.short_description}
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
            <span>Obtenir mon devis gratuit</span>
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
