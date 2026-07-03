'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ImageUploader from '@/components/admin/ImageUploader';
import ImageCropper, { CropSettings } from '@/components/admin/ImageCropper';
import {
  AdminPageLayout,
  AdminLoadingSpinner,
  AdminNotFound,
  AdminError,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  AdminCheckbox,
  AdminFormButtons,
  InfoTooltip,
} from '@/components/admin/ui';

type Project = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  location: string | null;
  year: number | null;
  short_description: string | null;
  long_description: string | null;
  featured_image: string | null;
  image_crop: CropSettings | null;
  published: boolean;
};

type UploadedImage = {
  id: string;
  url: string;
  file_name: string;
  file_size: number;
  is_main?: boolean;
};

const PROJECT_TYPES = [
  { value: '', label: 'Sélectionner un type' },
  { value: 'Site vitrine', label: 'Site vitrine' },
  { value: 'Site multi-pages', label: 'Site multi-pages' },
  { value: 'SaaS / Application web', label: 'SaaS / Application web' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Landing page', label: 'Landing page' },
  { value: 'Refonte de site', label: 'Refonte de site' },
  { value: 'CRM - Logiciel de gestion', label: 'CRM - Logiciel de gestion' },
  { value: 'Autre', label: 'Autre' },
];

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const updateField = <K extends keyof Project>(key: K, value: Project[K]) => {
    setProject(prev => prev ? { ...prev, [key]: value } : prev);
  };

  useEffect(() => {
    async function fetchProject() {
      const supabase = createClient();
      
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (projectError) {
        setError('Projet introuvable');
        setLoading(false);
        return;
      }

      setProject(projectData);

      // Récupérer les images liées
      const { data: mediaData, error: mediaError } = await supabase
        .from('project_media')
        .select(`
          media_id,
          is_main,
          sort_order,
          media_assets (id, file_url, file_name, file_size)
        `)
        .eq('project_id', id)
        .order('sort_order', { ascending: true });

      if (!mediaError && mediaData) {
        type MediaRow = {
          media_id: string;
          is_main: boolean;
          sort_order: number;
          media_assets: { id: string; file_url: string; file_name: string; file_size: number };
        };
        const loadedImages = (mediaData as unknown as MediaRow[]).map((item) => ({
          id: item.media_assets.id,
          url: item.media_assets.file_url,
          file_name: item.media_assets.file_name,
          file_size: item.media_assets.file_size,
          is_main: item.is_main,
        }));
        
        setImages(loadedImages);
      }

      setLoading(false);
    }
    fetchProject();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!project) return;

    setSaving(true);
    setError('');

    const supabase = createClient();
    const mainImage = images.find(img => img.is_main);
    
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        title: project.title,
        slug: project.slug,
        client: project.client,
        location: project.location,
        year: project.year,
        short_description: project.short_description,
        long_description: project.long_description,
        featured_image: mainImage?.url || images[0]?.url || null,
        image_crop: project.image_crop || null,
        published: project.published,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    // Remplacer toutes les relations projet-médias en une seule passe
    await supabase.from('project_media').delete().eq('project_id', id);

    if (images.length > 0) {
      const projectMedia = images.map((img, index) => ({
        project_id: id,
        media_id: img.id,
        sort_order: index,
        is_main: img.is_main ?? false,
      }));
      const { error: mediaInsertError } = await supabase
        .from('project_media')
        .insert(projectMedia);

      if (mediaInsertError) {
        setError('Projet sauvegardé mais erreur lors de la mise à jour des images.');
        setSaving(false);
        return;
      }
    }

    router.push('/admin/projects');
  }

  if (loading) return <AdminLoadingSpinner />;
  if (!project) return <AdminNotFound message="Projet introuvable" backHref="/admin/projects" backLabel="Retour aux projets" />;

  const mainImageUrl = images.find(img => img.is_main)?.url || images[0]?.url || project.featured_image;

  return (
    <AdminPageLayout backHref="/admin/projects" backLabel="Retour aux projets" title="MODIFIER LE PROJET">
      <AdminError message={error} />

      <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
        <AdminInput
          label="Titre du projet"
          required
          value={project.title}
          onChange={(e) => updateField('title', e.target.value)}
          tooltip="Affiché en grand (H1) dans le hero de la page projet, et comme titre de la carte dans la liste portfolio."
        />

        <AdminInput
          label="Slug (URL)"
          required
          value={project.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          hint={`URL : /portfolio/${project.slug}`}
          tooltip="Définit l'URL de la page projet : /portfolio/[slug]. Modifier avec précaution si le projet est déjà publié."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <AdminInput
            label="Client"
            value={project.client || ''}
            onChange={(e) => updateField('client', e.target.value)}
            tooltip={"Affiché dans la grille d'infos (3 colonnes) sous le label \"Client\", en dessous du hero."}
          />

          <AdminSelect
            label="Type de projet"
            value={project.location || ''}
            onChange={(e) => updateField('location', e.target.value)}
            options={PROJECT_TYPES}
            tooltip={"Affiché comme badge en haut du hero (ex : \"Site vitrine\") et dans la grille d'infos sous \"Catégorie\"."}
          />
        </div>

        <AdminInput
          label="Année"
          type="number"
          value={project.year || ''}
          onChange={(e) => updateField('year', parseInt(e.target.value) || null)}
          tooltip={"Affiché dans la grille d'infos (3 colonnes) sous le label \"Année\", en dessous du hero."}
        />

        <AdminInput
          label="Description courte"
          value={project.short_description || ''}
          onChange={(e) => updateField('short_description', e.target.value)}
          tooltip="Affiché en sous-titre juste sous le titre (H1) dans le hero de la page projet."
        />

        <AdminTextarea
          label="Description détaillée"
          value={project.long_description || ''}
          onChange={(e) => updateField('long_description', e.target.value)}
          rows={6}
          tooltip={"Affiché dans la section \"À propos du projet\" en bas de la page, après la galerie d'images."}
        />

        <div>
          <label className="flex items-center text-white/80 mb-4 text-sm uppercase tracking-wider">
            Galerie d&apos;images du projet
            <InfoTooltip text="Photos affichées dans le carousel de la section galerie sur la page projet. La première image marquée 'Principale' sert aussi d'image de couverture dans la liste portfolio." />
          </label>
          <ImageUploader images={images} onImagesChange={setImages} maxImages={10} />
          <p className="text-white/40 text-xs mt-2">
            La première image (ou celle marquée comme &quot;Principale&quot;) sera utilisée comme image de couverture
          </p>
        </div>

        {mainImageUrl && (
          <div>
            <label className="flex items-center text-white/80 mb-4 text-sm uppercase tracking-wider">
              Recadrer l&apos;image d&apos;aperçu
              <InfoTooltip text="Définit la zone visible de l'image de couverture (format 16:9) affichée dans la liste portfolio et en haut de la page projet." />
            </label>
            <ImageCropper
              imageUrl={mainImageUrl}
              onCropChange={(crop) => updateField('image_crop', crop)}
              aspectRatio={16 / 9}
            />
          </div>
        )}

        <AdminCheckbox
          id="published"
          label="Publié"
          checked={project.published}
          onChange={(e) => updateField('published', e.target.checked)}
        />

        <AdminFormButtons
          loading={saving}
          submitLabel="Enregistrer les modifications"
          loadingLabel="Enregistrement..."
          cancelHref="/admin/projects"
        />
      </form>
    </AdminPageLayout>
  );
}
