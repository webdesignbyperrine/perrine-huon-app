'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ImageUploader from '@/components/admin/ImageUploader';
import ImageCropper, { CropSettings } from '@/components/admin/ImageCropper';
import { generateSlug } from '@/lib/utils';
import {
  AdminPageLayout,
  AdminError,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  AdminCheckbox,
  AdminFormButtons,
} from '@/components/admin/ui';

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
  { value: 'Autre', label: 'Autre' },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    location: '',
    year: new Date().getFullYear(),
    short_description: '',
    long_description: '',
    image_crop: null as CropSettings | null,
    published: false,
  });

  const updateField = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const mainImage = images.find(img => img.is_main);
    
    const projectData = {
      ...formData,
      featured_image: mainImage?.url || images[0]?.url || null,
      image_crop: formData.image_crop,
    };

    const { data: project, error: insertError } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    // Créer les relations project_media
    if (images.length > 0 && project) {
      const projectMedia = images.map((img, index) => ({
        project_id: project.id,
        media_id: img.id,
        sort_order: index,
        is_main: img.is_main || false,
      }));

      const { error: mediaError } = await supabase
        .from('project_media')
        .insert(projectMedia);

      if (mediaError) console.error('Error linking media:', mediaError);
    }

    router.push('/admin/projects');
  }

  const mainImageUrl = images.find(img => img.is_main)?.url || images[0]?.url;

  return (
    <AdminPageLayout backHref="/admin/projects" backLabel="Retour aux projets" title="NOUVEAU PROJET">
      <AdminError message={error} />

      <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl space-y-6">
        <AdminInput
          label="Titre du projet"
          required
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Ex: Site E-commerce Mode"
        />

        <AdminInput
          label="Slug (URL)"
          required
          value={formData.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          placeholder="site-ecommerce-mode"
          hint={`Généré automatiquement. URL : /portfolio/${formData.slug}`}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <AdminInput
            label="Client"
            value={formData.client}
            onChange={(e) => updateField('client', e.target.value)}
            placeholder="Nom du client"
          />

          <AdminSelect
            label="Type de projet"
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            options={PROJECT_TYPES}
          />
        </div>

        <AdminInput
          label="Année"
          type="number"
          value={formData.year}
          onChange={(e) => updateField('year', parseInt(e.target.value))}
          placeholder="2024"
        />

        <AdminInput
          label="Description courte"
          value={formData.short_description}
          onChange={(e) => updateField('short_description', e.target.value)}
          placeholder="Une ligne de description"
        />

        <AdminTextarea
          label="Description détaillée"
          value={formData.long_description}
          onChange={(e) => updateField('long_description', e.target.value)}
          rows={6}
          placeholder="Description complète du projet, technologies utilisées, défis relevés..."
        />

        <div>
          <label className="block text-white/80 mb-4 text-sm uppercase tracking-wider">
            Galerie d'images du projet
          </label>
          <ImageUploader images={images} onImagesChange={setImages} maxImages={10} />
          <p className="text-white/40 text-xs mt-2">
            La première image (ou celle marquée comme "Principale") sera utilisée comme image de couverture
          </p>
        </div>

        {mainImageUrl && (
          <div>
            <label className="block text-white/80 mb-4 text-sm uppercase tracking-wider">
              Recadrer l'image d'aperçu
            </label>
            <ImageCropper
              imageUrl={mainImageUrl}
              initialCrop={formData.image_crop || undefined}
              onCropChange={(crop) => updateField('image_crop', crop)}
              aspectRatio={16 / 9}
            />
          </div>
        )}

        <AdminCheckbox
          id="published"
          label="Publier immédiatement"
          checked={formData.published}
          onChange={(e) => updateField('published', e.target.checked)}
        />

        <AdminFormButtons
          loading={loading}
          submitLabel="Créer le projet"
          loadingLabel="Création..."
          cancelHref="/admin/projects"
        />
      </form>
    </AdminPageLayout>
  );
}
