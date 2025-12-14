'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    source: 'form_home',
    consent: false,
  });
  
  const messageRef = useRef<HTMLTextAreaElement>(null);

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
        city: null,
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

  const inputStyles = "w-full px-5 py-4 bg-primary-800/30 border-2 border-primary-400/20 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-secondary/60 focus:bg-primary-800/50 transition-all duration-300";
  const labelStyles = "block text-white/90 font-medium mb-3 text-sm uppercase tracking-wider";

  return (
    <section id="contact" className="py-24 bg-primary-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 
              className="inline-flex items-center justify-center gap-4 mb-6"
              style={{ fontSize: '42px', fontWeight: 'bold', lineHeight: 1.2 }}
            >
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Me Contacter
              </span>
              <svg 
                className="text-secondary flex-shrink-0" 
                style={{ width: '40px', height: '40px' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </h2>
            <p className="text-lg text-white/60 max-w-lg mx-auto">
              Une question ? Un projet ? Parlons-en ensemble.
            </p>
          </div>

          {/* Form Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-primary-800/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Message envoyé !</h3>
                  <p className="text-white/60 mb-8">
                    Merci pour votre message. Je vous réponds sous 24h.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 rounded-xl transition-all duration-300"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Nom & Email en grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelStyles}>
                        Nom complet <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputStyles}
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelStyles}>
                        Email <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputStyles}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  {/* Entreprise */}
                  <div>
                    <label htmlFor="company" className={labelStyles}>
                      Entreprise <span className="text-white/30">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputStyles}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelStyles}>
                      Votre message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      ref={messageRef}
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputStyles} resize-none`}
                      placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
                    />
                  </div>

                  {/* Consentement RGPD */}
                  <div className="flex items-start gap-4 p-4 bg-primary-800/30 rounded-xl border border-primary-400/10">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-0.5 w-5 h-5 rounded-md border-2 border-primary-400/30 bg-transparent text-secondary focus:ring-secondary focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-white/50 text-sm leading-relaxed cursor-pointer">
                      J'accepte que mes données soient utilisées pour me recontacter.{' '}
                      <a href="/politique-confidentialite" className="text-secondary hover:underline">
                        Politique de confidentialité
                      </a>
                    </label>
                  </div>

                  {/* Message d'erreur */}
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  {/* Bouton submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white font-semibold text-lg uppercase tracking-wider rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer →'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact rapide */}
          <div className="mt-12 text-center">
            <p className="text-white/40 text-sm mb-4">Ou contactez-moi directement</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a 
                href="mailto:contact@perrinehuon.com" 
                className="flex items-center gap-2 text-white/60 hover:text-secondary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@perrinehuon.com
              </a>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-2 text-white/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                France entière
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


