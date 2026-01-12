'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

// ============================================
// COMPOSANTS UI ADMIN RÉUTILISABLES
// ============================================

/** Spinner de chargement plein écran */
export function AdminLoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
    </div>
  );
}

/** Message d'erreur "non trouvé" avec lien retour */
export function AdminNotFound({ message, backHref, backLabel }: { 
  message: string; 
  backHref: string; 
  backLabel: string;
}) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/70 mb-4">{message}</p>
        <Link href={backHref} className="text-secondary hover:underline">
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

/** Message d'erreur inline */
export function AdminError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
      {message}
    </div>
  );
}

/** Layout de page admin avec header */
export function AdminPageLayout({ 
  children, 
  backHref, 
  backLabel, 
  title 
}: { 
  children: ReactNode;
  backHref: string;
  backLabel: string;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link href={backHref} className="text-secondary hover:underline mb-4 inline-block text-sm">
              ← {backLabel}
            </Link>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Input text admin */
export function AdminInput({ 
  label, 
  required, 
  hint,
  ...props 
}: { 
  label: string; 
  required?: boolean;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      <input
        {...props}
        required={required}
        className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors"
      />
      {hint && <p className="text-white/40 text-xs mt-2">{hint}</p>}
    </div>
  );
}

/** Textarea admin */
export function AdminTextarea({ 
  label, 
  required,
  hint,
  ...props 
}: { 
  label: string; 
  required?: boolean;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      <textarea
        {...props}
        required={required}
        className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
      />
      {hint && <p className="text-white/40 text-xs mt-2">{hint}</p>}
    </div>
  );
}

/** Select admin */
export function AdminSelect({ 
  label, 
  options,
  ...props 
}: { 
  label: string; 
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-white/80 mb-2 text-sm uppercase tracking-wider">
        {label}
      </label>
      <select
        {...props}
        className="w-full px-4 py-3 bg-primary-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-secondary transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

/** Checkbox admin */
export function AdminCheckbox({ 
  label, 
  id,
  ...props 
}: { 
  label: string; 
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id={id}
        {...props}
        className="w-5 h-5 bg-primary-800/50 border border-white/10 rounded"
      />
      <label htmlFor={id} className="text-white/80 text-sm uppercase tracking-wider">
        {label}
      </label>
    </div>
  );
}

/** Boutons de formulaire admin (submit + annuler) */
export function AdminFormButtons({ 
  loading, 
  submitLabel, 
  loadingLabel,
  cancelHref 
}: { 
  loading: boolean;
  submitLabel: string;
  loadingLabel: string;
  cancelHref: string;
}) {
  return (
    <div className="flex gap-4 pt-4">
      <button
        type="submit"
        disabled={loading}
        className="flex-1 py-4 bg-gradient-to-r from-secondary to-accent-orange text-white font-semibold tracking-wider uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {loading ? loadingLabel : submitLabel}
      </button>
      <Link
        href={cancelHref}
        className="px-8 py-4 glass-dark hover:bg-white/5 text-white/80 hover:text-white transition-all text-sm uppercase tracking-wider text-center"
      >
        Annuler
      </Link>
    </div>
  );
}

/** Bouton de génération IA */
export function AIGenerateButton({ 
  onClick, 
  disabled, 
  generating 
}: { 
  onClick: () => void;
  disabled?: boolean;
  generating?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || generating}
      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
    >
      {generating ? '⏳ Génération...' : '✨ Générer avec IA'}
    </button>
  );
}

/** Label avec bouton IA */
export function AdminLabelWithAI({ 
  label, 
  onGenerate, 
  disabled, 
  generating 
}: { 
  label: string;
  onGenerate: () => void;
  disabled?: boolean;
  generating?: boolean;
}) {
  return (
    <div className="flex justify-between items-center mb-2">
      <label className="block text-white/80 text-sm uppercase tracking-wider">
        {label}
      </label>
      <AIGenerateButton onClick={onGenerate} disabled={disabled} generating={generating} />
    </div>
  );
}
