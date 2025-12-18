'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import SectionDivider from './SectionDivider';

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
      setErrorMessage('N\'oubliez pas de cocher la case pour que je puisse vous répondre 😉');
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
      setErrorMessage('Aïe, ça n\'a pas marché ! Réessayez, ou contactez-moi via WhatsApp.');
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

  // Couleur originale: bg-[#0d1a2d] - Test précédent: bg-[#2b6379], bg-[#72b8af], bg-[#ea5c7a] - Test actuel: bg-[#0d433e]
  return (
    <section id="contact" className="relative py-24 pb-40 bg-[#0d433e] overflow-hidden">
      {/* Divider en haut - prend la couleur de cette section (#0d433e) */}
      <SectionDivider bottomSectionColor="#0d433e" position="top" />
      {/* Motif grille */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(107, 142, 200, 0.05) 50px, rgba(107, 142, 200, 0.05) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(107, 142, 200, 0.05) 50px, rgba(107, 142, 200, 0.05) 51px)
          `
        }}
      />
      {/* Vaguelettes topographiques */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='topographic' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 30 50 50 T 100 50' fill='none' stroke='rgba(107, 142, 200, 0.15)' stroke-width='1'/%3E%3Cpath d='M0 40 Q 25 20 50 40 T 100 40' fill='none' stroke='rgba(107, 142, 200, 0.1)' stroke-width='1'/%3E%3Cpath d='M0 60 Q 25 40 50 60 T 100 60' fill='none' stroke='rgba(107, 142, 200, 0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23topographic)'/%3E%3C/svg%3E")`
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 
              className="inline-flex items-center justify-center gap-4 mb-6"
              style={{ fontSize: '42px', fontWeight: 'bold', lineHeight: 1.2 }}
            >
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Une idée ? Écrivez-moi
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
              Réponse garantie sous 48h
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
                  <h3 className="text-2xl font-bold mb-4 text-white">Bien reçu !</h3>
                  <p className="text-white/60 mb-8">
                    Merci pour votre message. Je vous réponds sous 48h.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 rounded-xl transition-all duration-300"
                  >
                    Nouveau message
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
                        placeholder="Jon Snow"
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
                        placeholder="jon@winterfell.got"
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
                        placeholder="Maison Stark"
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
                      placeholder="Winter is coming... et mon projet aussi !"
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
                      J'accepte d'être recontacté(e) par Perrine.{' '}
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

                  {/* Bouton submit - Style tube en verre avec liquide */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group/cta relative w-full transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div 
                      className="relative flex items-center justify-center gap-3 w-full py-4 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      {/* Reflet du verre */}
                      <span 
                        className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
                      />
                      
                      {/* Liquide - Couleur bleue pour contraster avec le fond vert */}
                      <span 
                        className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, #476787 0%, #2F4558 50%, #1C2A35 100%)',
                          boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        <span 
                          className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2"
                          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
                        />
                      </span>
                      
                      {/* Contenu */}
                      <span className="relative z-10 text-white font-semibold text-sm uppercase tracking-wider drop-shadow-lg">
                        {status === 'loading' ? (
                          <span className="flex items-center justify-center gap-3">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Envoi en cours...
                          </span>
                        ) : (
                          'Envoyer ma demande'
                        )}
                      </span>
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Divider en bas - prend la couleur de la section suivante (#0d1a2d) */}
      <SectionDivider bottomSectionColor="#0d1a2d" position="bottom" />
    </section>
  );
}


