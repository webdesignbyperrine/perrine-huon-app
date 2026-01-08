'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

type Project = {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string;
  year: number;
  featured_image: string;
  published: boolean;
  created_at: string;
};

export default function AdminProjectsPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
    }
  }, [isAdmin, filter]);

  async function fetchProjects() {
    const supabase = createClient();
    setLoading(true);

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter === 'published') {
      query = query.eq('published', true);
    } else if (filter === 'draft') {
      query = query.eq('published', false);
    }

    const { data } = await query;
    setProjects(data || []);
    setLoading(false);
  }

  async function togglePublished(id: string, currentStatus: boolean) {
    const supabase = createClient();
    const { error } = await supabase
      .from('projects')
      .update({ published: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchProjects();
    }
  }

  async function deleteProject(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (!error) {
      fetchProjects();
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <Link href="/admin" className="text-secondary hover:underline mb-4 inline-block text-sm">
                ← Dashboard
              </Link>
              <h1 className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  PROJETS
                </span>
              </h1>
            </div>
            <Link
              href="/admin/projects/new"
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold uppercase text-sm tracking-wider hover:opacity-90 transition-opacity"
            >
              + Nouveau projet
            </Link>
          </div>

          {/* Filtres */}
          <div className="flex gap-4 mb-8">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 uppercase text-sm tracking-wider transition-all ${
                  filter === f
                    ? 'bg-secondary text-white'
                    : 'glass-dark text-white/60 hover:text-white'
                }`}
              >
                {f === 'all' ? 'Tous' : f === 'published' ? 'Publiés' : 'Brouillons'}
              </button>
            ))}
          </div>

          {/* Liste des projets */}
          {projects.length === 0 ? (
            <div className="glass-dark p-12 rounded-xl text-center">
              <p className="text-white/50 mb-4">Aucun projet trouvé</p>
              <Link href="/admin/projects/new" className="text-secondary hover:underline">
                Créer votre premier projet
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-dark p-6 rounded-xl flex items-center gap-6 hover:bg-white/5 transition-all"
                >
                  {/* Image */}
                  <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-primary-800">
                    {project.featured_image && (
                      <Image
                        src={project.featured_image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/50 text-sm">
                      {project.client} • {project.location} • {project.year}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs uppercase tracking-wider ${
                          project.published
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-orange-500/20 text-orange-300'
                        }`}
                      >
                        {project.published ? '✓ Publié' : '○ Brouillon'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="px-4 py-2 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => togglePublished(project.id, project.published)}
                      className="px-4 py-2 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm"
                    >
                      {project.published ? 'Dépublier' : 'Publier'}
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-2 glass-dark hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-all text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}







