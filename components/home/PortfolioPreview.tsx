'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from '@/styles/portfolio-grid.module.scss';

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

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      
      // Requête simple - récupérer tous les projets publiés
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);

      console.log('Supabase response:', { data, error });

      if (!error && data) {
        setProjects(data as any[]);
      } else if (error) {
        console.error('Error loading projects:', error);
        // En cas d'erreur, essayer sans filtre published
        const { data: allData } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
        
        console.log('All projects (no filter):', allData);
        if (allData) {
          setProjects(allData as any[]);
        }
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // Projets de démo (affichés uniquement si aucun projet publié en DB)
  const demoProjects: any[] = [];

  // Transformer les projets de la DB
  const formattedProjects = projects.map((project: any, index: number) => ({
    ...project,
    number: String(index + 1).padStart(2, '0'),
    previewImage: project.featured_image,
  }));

  const displayProjects = formattedProjects.length > 0 ? formattedProjects : demoProjects;

  if (loading) {
    return (
      <section className={styles.portfolioSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b8ec8' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '2px solid rgba(107, 142, 200, 0.3)',
              borderTopColor: '#6b8ec8',
              borderRadius: '50%',
              margin: '0 auto',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        </div>
      </section>
    );
  }

  // Si aucun projet, afficher un message
  if (displayProjects.length === 0) {
    return (
      <section className={styles.portfolioSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#6b8ec8', fontSize: '18px' }}>
              Aucun projet publié pour le moment
            </p>
            <Link 
              href="/portfolio" 
              style={{ 
                color: '#ff9a5c', 
                marginTop: '16px', 
                display: 'inline-block',
                textDecoration: 'underline'
              }}
            >
              Voir tous les projets →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {displayProjects.map((project: any) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className={styles.projectCard}
            >
              {/* Image de preview qui apparaît au survol */}
              <div className={styles.previewImageWrapper}>
                {project.previewImage ? (
                  <Image
                    src={project.previewImage}
                    alt={`Preview ${project.title}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                )}
                <div className={styles.viewProjectLabel}>
                  <span>Voir le projet</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
              
              {/* Carte avec icône - slide vers le haut au hover */}
              <div className={styles.cardSlider}>
                <div className={styles.projectContent}>
                  <div className={styles.triangleIndicator} />
                  <div className={styles.projectIcon}>
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="30" stroke="#6b8ec8" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className={styles.projectTitle}>
                    <h3>{project.title}</h3>
                    {project.short_description && (
                      <div className={styles.subtitle}>{project.short_description}</div>
                    )}
                  </div>
                  <div className={styles.projectNumber}>{project.number}</div>
                  <div className={styles.progressLine} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
