'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import LaptopMockup from '@/components/LaptopMockup';
import { SectionTitle, LoadingSpinner, SectionLink, CTAQuiz } from '@/components/ui';

type ProjectData = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  featured_image: string | null;
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
  }));

  if (loading) {
    return (
      <section className="relative py-24 lg:py-32 bg-paper overflow-hidden">
        <div className="container mx-auto px-4">
          <LoadingSpinner />
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
    <section className="relative pt-32 lg:pt-40 pb-32 lg:pb-40 bg-paper overflow-hidden">
      {/* Transition ondulée en haut - depuis section bleue */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <svg 
          className="w-full h-20 lg:h-28" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 0 L0 60 Q 200 30 400 60 T 800 60 T 1200 60 T 1600 60 L1600 0 Z" fill="#2B5B8A"/>
        </svg>
      </div>
      
      {/* Fond avec texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-50 z-0" />
      
      {/* Formes géométriques circulaires décoratives - arrière-plan (desktop uniquement) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grande forme floue - extrême haut gauche (déborde) */}
        <div 
          className="absolute -top-40 -left-40 w-[380px] h-[380px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, var(--primary-blue) 0%, transparent 65%)',
          }}
        />
        
        {/* Forme floue accent - extrême bas droite (déborde) */}
        <div 
          className="absolute bottom-[5%] -right-36 w-72 h-72 rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 60%)',
          }}
        />
        
        {/* Cercle contour - extrême droite (majoritairement caché) */}
        <div 
          className="absolute top-[30%] -right-32 w-44 h-44 rounded-full border-2 border-primary/10"
        />
        
        {/* Cercle contour - extrême gauche bas (majoritairement caché) */}
        <div 
          className="absolute bottom-[20%] -left-24 w-32 h-32 rounded-full border border-primary/8"
        />
      </div>
      
      {/* Transition ondulée en bas - vers bleu */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        <svg 
          className="w-full h-20 lg:h-28" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 100 L0 40 Q 200 70 400 40 T 800 40 T 1200 40 T 1600 40 L1600 100 Z" fill="#2B5B8A"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full">
          
          {/* Titre */}
          <div ref={titleRef} className="mb-12 lg:mb-16">
            <SectionTitle
              subtitle="Réalisations récentes"
              title="Portfolio"
              description="Une sélection de mes réalisations récentes"
              showLine={false}
              isVisible={titleVisible}
            />
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
                {/* Laptop Mockup */}
                <div className="relative p-6 pt-8 pb-4 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                  {project.previewImage ? (
                    <LaptopMockup
                      src={project.previewImage}
                      alt={`Preview ${project.title}`}
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
                  
                  {/* Numéro */}
                  <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10 group-hover:text-accent/20 transition-colors">
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
            className={`text-center mt-12 flex flex-col items-center gap-6 transition-all duration-700 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <CTAQuiz />
            <SectionLink href="/portfolio">Voir tous les projets</SectionLink>
          </div>

        </div>
      </div>
    </section>
  );
}
