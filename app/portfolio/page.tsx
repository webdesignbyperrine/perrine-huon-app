'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/types/database.types';
import styles from '@/styles/portfolio-grid.module.scss';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  // Animation au montage - contenu visible par défaut
  const [isPageMounted, setIsPageMounted] = useState(true);
  
  // Animation au scroll
  const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });

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

  // Données de démo complètes
  const demoProjects = [
    {
      id: '1',
      title: 'STUDIO 74',
      slug: 'studio-74',
      short_description: 'Site vitrine premium pour studio créatif à Lyon',
      seo_city: 'Lyon',
      number: '01',
      icon: '///',
    },
    {
      id: '2',
      title: 'GLOSTER',
      slug: 'gloster',
      short_description: 'E-commerce moderne avec paiement sécurisé',
      seo_city: 'Paris',
      number: '02',
      icon: '◎',
    },
    {
      id: '3',
      title: 'LINEA',
      subtitle: 'VOL.1',
      slug: 'linea-vol1',
      short_description: 'Application SaaS pour gestion de projets',
      seo_city: 'Marseille',
      number: '03',
      featured: true,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    },
    {
      id: '4',
      title: 'CUBE 2.0',
      slug: 'cube-20',
      short_description: 'Portfolio 3D interactif pour architecte',
      seo_city: 'Bordeaux',
      number: '04',
      icon: '◇',
    },
    {
      id: '5',
      title: 'NEXUS',
      slug: 'nexus',
      short_description: 'Plateforme collaborative pour équipes',
      seo_city: 'Toulouse',
      number: '05',
      icon: '⬡',
    },
    {
      id: '6',
      title: 'AURORA',
      slug: 'aurora',
      short_description: 'Site e-learning avec vidéos interactives',
      seo_city: 'Nantes',
      number: '06',
      icon: '◐',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : demoProjects;

  const cities = ['all', ...Array.from(new Set(displayProjects.map((p: any) => p.seo_city).filter(Boolean)))];
  const filteredProjects = filter === 'all' 
    ? displayProjects 
    : displayProjects.filter((p: any) => p.seo_city === filter);

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-7xl md:text-8xl font-bold mb-6 transition-all duration-700 ${isPageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              PORTFOLIO
            </span>
          </h1>
          <p className={`text-xl text-white/50 max-w-3xl mx-auto font-light transition-all duration-700 delay-100 ${isPageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Une sélection de mes projets récents, optimisés pour le référencement local
          </p>
          <div className={`w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8 transition-all duration-1000 delay-200 ${isPageMounted ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
        </div>

        {/* Filtres par ville */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-700 delay-300 ${isPageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {cities.map((city, index) => (
            <button
              key={city}
              onClick={() => setFilter(city)}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                filter === city
                  ? 'bg-gradient-to-r from-secondary to-accent-red text-white'
                  : 'glass-dark text-white/60 hover:text-white'
              }`}
            >
              {city === 'all' ? 'Tous' : `📍 ${city}`}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
          </div>
        ) : (
          <div ref={gridRef} className={styles.grid}>
            {filteredProjects.map((project: any, index) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className={`${styles.projectCard} ${project.featured ? styles.featured : ''} transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {project.featured ? (
                  <div className={styles.featuredCard}>
                    {project.image && (
                      <div className={styles.featuredImage}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className={styles.projectContent}>
                      <div className={styles.triangleIndicator} />
                      <div className={styles.projectTitle}>
                        <h3>{project.title}</h3>
                        {project.subtitle && (
                          <div className={styles.subtitle}>{project.subtitle}</div>
                        )}
                      </div>
                      <div className={styles.projectNumber}>{project.number}</div>
                      <div className={styles.progressLine} />
                    </div>
                  </div>
                ) : (
                  <div className={styles.projectContent}>
                    <div className={styles.triangleIndicator} />
                    <div className={styles.projectIcon}>
                      <span style={{ fontSize: '4rem', color: '#6b8ec8' }}>{project.icon || '◯'}</span>
                    </div>
                    <div className={styles.projectTitle}>
                      <h3>{project.title}</h3>
                    </div>
                    <div className={styles.projectNumber}>{project.number}</div>
                    <div className={styles.progressLine} />
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* CTA - Style tube en verre avec liquide */}
        <div className="text-center mt-20">
          <Link
            href="#contact"
            className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
          >
            <div 
              className="relative flex items-center gap-3 px-12 py-5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              {/* Reflet du verre */}
              <span 
                className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
              />
              
              {/* Liquide */}
              <span 
                className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)',
                  boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <span 
                  className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
                />
              </span>
              
              <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">
                Discuter de mon projet
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

