'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CroppedImage from '@/components/CroppedImage';

type CropSettings = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ProjectData = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  featured_image: string | null;
  image_crop: CropSettings | null;
  published: boolean;
};

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (!error && data) {
        setProjects(data as ProjectData[]);
      } else if (error) {
        console.error('Error loading projects:', error);
        const { data: allData } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (allData) {
          setProjects(allData as ProjectData[]);
        }
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const formattedProjects = projects.map((project, index) => ({
    ...project,
    number: String(index + 1).padStart(2, '0'),
    previewImage: project.featured_image,
    imageCrop: project.image_crop,
  }));

  if (loading) {
    return (
      <section className="relative py-24 lg:py-32 bg-paper overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (formattedProjects.length === 0) {
    return (
      <section className="relative py-24 lg:py-32 bg-paper overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-primary/60 text-lg mb-4">
              Aucun projet publié pour le moment
            </p>
            <Link href="/portfolio" className="btn-sketch group inline-flex items-center gap-2">
              <span>Voir tous les projets</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 lg:py-32 bg-paper overflow-hidden">
      {/* Fond avec texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-50" />
      
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 border-2 border-primary/5 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-primary/5 rounded-full" />
        
        <svg className="absolute top-40 right-20 w-8 h-8 text-primary/10" viewBox="0 0 32 32">
          <polygon points="16,4 28,28 4,28" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-40 left-1/4 w-6 h-6 text-primary/10" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Titre */}
          <div ref={titleRef} className="text-center mb-12 lg:mb-16">
            <span 
              className={`inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Réalisations récentes
            </span>
            <h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-all duration-700 delay-100 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Portfolio
            </h2>
            <p 
              className={`text-lg text-primary/60 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Une sélection de mes réalisations récentes
            </p>
          </div>

          {/* Grille de projets */}
          <div ref={gridRef} className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {formattedProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className={`group relative bg-paper-light border-2 border-primary/10 rounded-sketch-lg overflow-hidden hover:border-primary/30 hover:shadow-card-hover transition-all duration-500 ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 lg:h-64 overflow-hidden">
                  {project.previewImage ? (
                    <CroppedImage
                      src={project.previewImage}
                      alt={`Preview ${project.title}`}
                      crop={project.imageCrop}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                  
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-2 text-paper font-medium">
                      Voir le projet
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </span>
                  </div>
                  
                  {/* Numéro */}
                  <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10 group-hover:text-paper/20 transition-colors">
                    {project.number}
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
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

          {/* CTA */}
          <div 
            ref={ctaRef} 
            className={`text-center mt-12 transition-all duration-700 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Link href="/portfolio" className="btn-sketch group inline-flex items-center gap-2">
              <span>Voir tous les projets</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
