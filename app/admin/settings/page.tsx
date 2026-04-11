'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { optimizeImageWithPreset } from '@/lib/image-optimizer';
import { AdminPageLayout, AdminLoadingSpinner, AdminError } from '@/components/admin/ui';

type Settings = {
  logo_url: string;
  site_title: string;
  site_description: string;
};

const DEFAULT_SETTINGS: Settings = {
  logo_url: '/images/logo_vert_perrine_huon.png',
  site_title: 'Perrine Huon',
  site_description: 'Web Designer & Développeuse Front-End',
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    fetchSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSettings() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url, name, bio')
          .eq('id', user.id)
          .single();

        if (profile) {
          setSettings({
            logo_url: profile.avatar_url || DEFAULT_SETTINGS.logo_url,
            site_title: profile.name || DEFAULT_SETTINGS.site_title,
            site_description: profile.bio || DEFAULT_SETTINGS.site_description,
          });
        }
      }
    } catch (err) {
      console.error('Erreur chargement paramètres:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const optimizedFile = await optimizeImageWithPreset(file, 'logo');
      const supabase = createClient();
      const fileExt = optimizedFile.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `settings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, optimizedFile, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      setSettings((prev) => ({ ...prev, logo_url: publicUrl }));
      setSuccess('Logo optimisé et uploadé avec succès !');
    } catch (err) {
      console.error('Erreur upload logo:', err);
      setError("Erreur lors de l'upload du logo");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('Non authentifié');

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: settings.logo_url,
          name: settings.site_title,
          bio: settings.site_description,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setSuccess('Paramètres sauvegardés avec succès !');

      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      console.error('Erreur sauvegarde paramètres:', err);
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <AdminLoadingSpinner />;

  return (
    <AdminPageLayout backHref="/admin" backLabel="Retour au dashboard" title="PARAMÈTRES DU SITE">
      <AdminError message={error} />

      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
          {success}
        </div>
      )}

      <div className="glass-dark p-8 rounded-xl space-y-8">
        {/* Logo du site */}
        <div>
          <label className="block text-white/80 mb-3 text-sm uppercase tracking-wider">
            Logo du site
          </label>
          <div className="flex items-start gap-6">
            <div className="relative w-32 h-32 bg-primary-800/50 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
              {settings.logo_url ? (
                <Image
                  src={settings.logo_url}
                  alt="Logo"
                  width={128}
                  height={128}
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div className="text-white/40 text-center text-xs">Aucun logo</div>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity rounded-lg"
              >
                {uploading ? 'Optimisation...' : 'Changer le logo'}
              </button>
              <p className="text-white/60 text-sm">
                Le logo sera automatiquement optimisé et converti au format web (WebP)
              </p>
              <p className="text-white/40 text-xs">
                Formats acceptés : PNG, JPG, WebP
              </p>
              {uploading && (
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                  <span>Compression et conversion en cours...</span>
                </div>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>

        {/* Titre du site */}
        <div>
          <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
            Titre du site
          </label>
          <input
            type="text"
            value={settings.site_title}
            onChange={(e) => setSettings((prev) => ({ ...prev, site_title: e.target.value }))}
            className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
            placeholder="Perrine Huon"
          />
        </div>

        {/* Description du site */}
        <div>
          <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
            Description du site
          </label>
          <textarea
            value={settings.site_description}
            onChange={(e) => setSettings((prev) => ({ ...prev, site_description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
            placeholder="Web Designer & Développeuse Front-End"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity rounded-lg"
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les paramètres'}
          </button>
        </div>
      </div>
    </AdminPageLayout>
  );
}
