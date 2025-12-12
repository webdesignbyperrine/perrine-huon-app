'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    city: '',
    message: '',
    source: 'form_home',
    consent: false,
  });
  
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Écouter les changements du message via input event (pour le pré-remplissage du qualifier)
  useEffect(() => {
    const textarea = messageRef.current;
    if (!textarea) return;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLTextAreaElement;
      setFormData(prev => ({ ...prev, message: target.value }));
    };

    textarea.addEventListener('input', handleInput);
    return () => textarea.removeEventListener('input', handleInput);
  }, []);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validation
    if (!formData.consent) {
      setStatus('error');
      setErrorMessage('Vous devez accepter la politique de confidentialité');
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        city: formData.city || null,
        message: formData.message,
        source: formData.source,
        status: 'new',
      },
    ]);

    if (error) {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer ou m\'envoyer un email directement.');
      console.error('Error:', error);
    } else {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        city: '',
        message: '',
        source: 'form_home',
        consent: false,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section id="contact" className="py-20 bg-primary-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Me Contacter</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mt-4">
              Une question ? Un projet ? Parlons-en ensemble. Je vous réponds sous 24h.
            </p>
          </div>

          <div className="card bg-white/5 backdrop-blur-xl border-secondary/30">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Message envoyé !</h3>
                <p className="text-white/70 mb-6">
                  Merci pour votre message. Je vous réponds dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-800/50 border border-primary-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-800/50 border border-primary-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="jean.dupont@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Entreprise */}
                  <div>
                    <label htmlFor="company" className="block text-white font-semibold mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary-800/50 border border-primary-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary transition-colors"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  {/* Ville */}
                  <div>
                    <label htmlFor="city" className="block text-white font-semibold mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary-800/50 border border-primary-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary transition-colors"
                      placeholder="Paris, Lyon, Marseille..."
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-800/50 border border-primary-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-secondary transition-colors resize-none"
                    placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
                  />
                </div>

                {/* Consentement RGPD */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-primary-400/30 bg-primary-800/50 text-secondary focus:ring-secondary focus:ring-offset-0"
                  />
                  <label htmlFor="consent" className="text-white/70 text-sm">
                    J'accepte que mes données soient utilisées pour me recontacter concernant ma demande. *{' '}
                    <a href="/politique-confidentialite" className="text-secondary hover:underline">
                      En savoir plus
                    </a>
                  </label>
                </div>

                {/* Message d'erreur */}
                {status === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Bouton submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer mon message'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Infos de contact alternatives */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <a href="mailto:contact@perrinehuon.com" className="card group">
              <svg className="w-8 h-8 mx-auto mb-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="text-white/70 group-hover:text-secondary transition-colors">contact@perrinehuon.com</div>
            </a>
            <a href="tel:+33123456789" className="card group">
              <svg className="w-8 h-8 mx-auto mb-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="text-white/70 group-hover:text-secondary transition-colors">+33 1 23 45 67 89</div>
            </a>
            <div className="card">
              <svg className="w-8 h-8 mx-auto mb-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="text-white/70">France entière</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


