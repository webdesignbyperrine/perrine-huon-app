'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  sort_order: number;
};

// ---- Ligne projet draggable ----
function SortableProjectRow({
  project,
  onTogglePublished,
  onDelete,
}: {
  project: Project;
  onTogglePublished: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass-dark p-6 rounded-xl flex items-center gap-6 hover:bg-white/5 transition-all"
    >
      {/* Poignée de drag */}
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/60 transition-colors p-1 touch-none"
        aria-label="Réorganiser"
        title="Glisser pour réordonner"
      >
        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor">
          <circle cx="4" cy="4" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="4" cy="10" r="2" />
          <circle cx="12" cy="10" r="2" />
          <circle cx="4" cy="16" r="2" />
          <circle cx="12" cy="16" r="2" />
        </svg>
      </button>

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
          onClick={() => onTogglePublished(project.id, project.published)}
          className="px-4 py-2 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm"
        >
          {project.published ? 'Dépublier' : 'Publier'}
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="px-4 py-2 glass-dark hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-all text-sm"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

// ---- Page principale ----
export default function AdminProjectsPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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
      .order('sort_order', { ascending: true })
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

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);

    setProjects(reordered);

    // Sauvegarde de l'ordre en base
    setSaving(true);
    const supabase = createClient();
    await Promise.all(
      reordered.map((p, index) =>
        supabase
          .from('projects')
          .update({ sort_order: index })
          .eq('id', p.id)
      )
    );
    setSaving(false);
  }, [projects]);

  async function togglePublished(id: string, currentStatus: boolean) {
    const supabase = createClient();
    await supabase
      .from('projects')
      .update({ published: !currentStatus })
      .eq('id', id);
    fetchProjects();
  }

  async function deleteProject(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    const supabase = createClient();
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] pt-32 pb-20">
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
              <p className="text-white/40 text-sm mt-2">
                Glissez-déposez les lignes pour changer l&apos;ordre d&apos;affichage dans le portfolio
              </p>
            </div>
            <div className="flex items-center gap-4">
              {saving && (
                <span className="text-secondary text-sm flex items-center gap-2">
                  <span className="w-3 h-3 border border-secondary/40 border-t-secondary rounded-full animate-spin inline-block" />
                  Sauvegarde…
                </span>
              )}
              <Link
                href="/admin/projects/new"
                className="px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold uppercase text-sm tracking-wider hover:opacity-90 transition-opacity"
              >
                + Nouveau projet
              </Link>
            </div>
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={projects.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {projects.map((project) => (
                    <SortableProjectRow
                      key={project.id}
                      project={project}
                      onTogglePublished={togglePublished}
                      onDelete={deleteProject}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}
