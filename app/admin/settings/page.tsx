'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { optimizeImageWithPreset } from '@/lib/image-optimizer';

type Settings = {
  logo_url: string;
  site_title: string;
  site_description: string;
  calendly_url: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState<Settings>({
    logo_url: '/images/logo_vert_perrine_huon.png',
    site_title: 'Perrine Huon',
    site_description: 'Web Designer & Développeuse Front-End',
    calendly_url: 'https://calendly.com/prne-hn/30min',
  });

  const [whatsappNumber, setWhatsappNumber] = useState('33645182749');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const supabase = createClient();
      
      // Récupérer les paramètres depuis la table profiles (pour l'instant)
      // TODO: Créer une table settings dédiée si besoin
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          // Pour l'instant on utilise les valeurs par défaut
          // À terme, stocker ces données dans une table settings
          setSettings({
            logo_url: profile.avatar_url || settings.logo_url,
            site_title: settings.site_title,
            site_description: profile.bio || settings.site_description,
            calendly_url: settings.calendly_url,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
    setLoading(false);
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
      // 1. Optimiser l'image avec le preset "logo"
      console.log('🎨 Optimisation du logo en cours...');
      const optimizedFile = await optimizeImageWithPreset(file, 'logo');

      // 2. Upload vers Supabase Storage
      const supabase = createClient();
      const fileExt = optimizedFile.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `settings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, optimizedFile, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // 3. Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      // 4. Mettre à jour les settings
      setSettings({ ...settings, logo_url: publicUrl });
      setSuccess('✅ Logo optimisé et uploadé avec succès !');

    } catch (error) {
      console.error('Upload error:', error);
      setError('Erreur lors de l\'upload du logo');
    }

    setUploading(false);
    e.target.value = '';
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Non authentifié');
      }

      // Pour l'instant, on stocke juste l'avatar dans profiles
      // TODO: Créer une vraie table settings
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: settings.logo_url,
          bio: settings.site_description,
        })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess('✅ Paramètres sauvegardés avec succès !');
      
      // Recharger la page après 1 seconde pour voir les changements
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error: any) {
      console.error('Save error:', error);
      setError(error.message || 'Erreur lors de la sauvegarde');
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link href="/admin" className="text-secondary hover:underline mb-4 inline-block text-sm">
              ← Retour au dashboard
            </Link>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                PARAMÈTRES DU SITE
              </span>
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {error}
            </div>
          )}

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
                {/* Aperçu du logo */}
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
                    <div className="text-white/40 text-center text-xs">
                      Aucun logo
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-1 space-y-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-6 py-3 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity rounded-lg"
                  >
                    {uploading ? '🔄 Optimisation...' : '📤 Changer le logo'}
                  </button>
                  
                  <p className="text-white/60 text-sm">
                    🎨 Le logo sera automatiquement optimisé et converti au format web (WebP)
                  </p>
                  
                  <p className="text-white/40 text-xs">
                    Formats acceptés : PNG, JPG, WebP • Optimisation automatique pour performance maximale
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
                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
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
                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
                placeholder="Web Designer & Développeuse Front-End"
              />
            </div>

            {/* URL Calendly */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                URL Calendly
              </label>
              <input
                type="url"
                value={settings.calendly_url}
                onChange={(e) => setSettings({ ...settings, calendly_url: e.target.value })}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="https://calendly.com/votre-lien"
              />
              <p className="text-white/40 text-xs mt-2">
                📅 Ce lien sera utilisé pour le bouton de prise de rendez-vous sur votre site
              </p>
            </div>

            {/* Numéro WhatsApp */}
            <div>
              <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
                Numéro WhatsApp
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
                placeholder="33612345678"
              />
              <p className="text-white/40 text-xs mt-2">
                📱 Format international sans le + et sans espaces (ex: 33612345678 pour +33 6 12 34 56 78)
              </p>
              <p className="text-white/40 text-xs mt-1">
                💬 Le bouton WhatsApp flottant apparaîtra en bas à droite de toutes les pages
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-white/10">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity rounded-lg"
              >
                {saving ? 'Enregistrement...' : '💾 Enregistrer les paramètres'}
              </button>
              <Link
                href="/admin"
                className="px-8 py-4 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm uppercase tracking-wider text-center rounded-lg flex items-center"
              >
                Annuler
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

