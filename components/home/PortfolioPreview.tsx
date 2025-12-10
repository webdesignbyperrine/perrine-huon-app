'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ProjectWithMedia } from '@/types/database.types';
import styles from '@/styles/portfolio-grid.module.scss';

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
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (!error && data) {
        setProjects(data as ProjectWithMedia[]);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // Projets de démo avec le style exact de la capture
  const demoProjects = [
    {
      id: '1',
      title: 'STUDIO 74',
      slug: 'studio-74',
      short_description: '',
      number: '01',
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 30L35 50L20 70M45 30H80M45 50H65M45 70H80" stroke="#6b8ec8" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: '2',
      title: 'GLOSTER',
      slug: 'gloster',
      short_description: '',
      number: '02',
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="35" r="12" fill="#6b8ec8"/>
          <circle cx="50" cy="65" r="12" fill="#6b8ec8"/>
          <rect x="46" y="45" width="8" height="8" fill="#6b8ec8"/>
        </svg>
      ),
    },
    {
      id: '3',
      title: 'LINEA',
      subtitle: 'VOL.1',
      slug: 'linea-vol1',
      short_description: '',
      number: '03',
      featured: true,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    },
    {
      id: '4',
      title: 'CUBE 2.0',
      slug: 'cube-20',
      short_description: '',
      number: '04',
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 40L50 25L70 40M30 60L50 75L70 60M50 25V75M30 40V60M70 40V60" stroke="#6b8ec8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  const displayProjects = projects.length > 0 ? projects : demoProjects;

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

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {displayProjects.map((project: any) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
            >
              {project.featured ? (
                // Carte featured avec image
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
                // Carte normale avec icône
                <div className={styles.projectContent}>
                  <div className={styles.triangleIndicator} />
                  <div className={styles.projectIcon}>
                    {project.icon || (
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="30" stroke="#6b8ec8" strokeWidth="2"/>
                      </svg>
                    )}
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
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
