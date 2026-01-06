'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [formRef, formVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          message: formData.message,
          source: formData.source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        if (response.status === 429) {
          setErrorMessage('Trop de messages envoyés. Patientez une minute avant de réessayer.');
        } else {
          setErrorMessage(data.error || 'Aïe, ça n\'a pas marché ! Réessayez, ou contactez-moi via WhatsApp.');
        }
        return;
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        source: 'form_home',
        consent: false,
      });
    } catch {
      setStatus('error');
      setErrorMessage('Erreur de connexion. Vérifiez votre connexion internet.');
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
    <section id="contact" className="relative pt-32 lg:pt-40 pb-32 lg:pb-40 bg-paper overflow-hidden">
      {/* Transition ondulée en haut - depuis section bleue */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <svg 
          className="w-full h-20 lg:h-28" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 0 L0 60 Q 200 30 400 60 T 800 60 T 1200 60 T 1600 60 L1600 0 Z" fill="#2B5B8A"/>
        </svg>
      </div>
      
      {/* Fond avec texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-50 z-0" />
      
      {/* Formes géométriques circulaires décoratives - arrière-plan (desktop uniquement) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grande forme floue - extrême droite (déborde) */}
        <div 
          className="absolute top-[20%] -right-40 w-[350px] h-[350px] rounded-full opacity-[0.1]"
          style={{
            background: 'radial-gradient(circle, var(--primary-blue) 0%, transparent 65%)',
          }}
        />
        
        {/* Forme floue accent - extrême gauche (déborde) */}
        <div 
          className="absolute bottom-[15%] -left-36 w-64 h-64 rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 60%)',
          }}
        />
        
        {/* Cercle contour - extrême gauche haut (majoritairement caché) */}
        <div 
          className="absolute top-[25%] -left-28 w-36 h-36 rounded-full border-2 border-primary/12"
        />
        
        {/* Cercle contour - extrême droite bas (majoritairement caché) */}
        <div 
          className="absolute bottom-[30%] -right-20 w-28 h-28 rounded-full border border-primary/10"
        />
      </div>
      
      {/* Transition ondulée en bas - vers beige-light */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        <svg 
          className="w-full h-20 lg:h-28" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 100 L0 40 Q 200 70 400 40 T 800 40 T 1200 40 T 1600 40 L1600 100 Z" fill="#D4C4A8"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div ref={titleRef} className="text-center mb-12 lg:mb-16">
            <span 
              className={`inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Parlons de votre projet
            </span>
            <h2 
              className={`flex items-center justify-center gap-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 transition-all duration-700 delay-100 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span>Une idée ? Écrivez-moi</span>
              <svg 
                className={`w-8 h-8 lg:w-10 lg:h-10 text-accent flex-shrink-0 transition-all duration-500 delay-300 ${
                  titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 6L2 7"/>
              </svg>
            </h2>
            <p 
              className={`text-lg text-primary/60 transition-all duration-700 delay-200 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Réponse garantie sous 48h
            </p>
          </div>

          {/* Form Card */}
          <div 
            ref={formRef} 
            className={`relative transition-all duration-700 delay-200 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative bg-paper-light border-2 border-primary/10 rounded-sketch-xl p-8 lg:p-10 shadow-sketch hover:border-primary/20 transition-colors duration-300">
              
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Bien reçu !</h3>
                  <p className="text-primary/60 mb-8">
                    Merci pour votre message. Je vous réponds sous 48h.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-sketch"
                  >
                    Nouveau message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Nom & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary/70 uppercase tracking-wider mb-2">
                        Nom complet <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-sketch w-full"
                        placeholder="Jon Snow"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary/70 uppercase tracking-wider mb-2">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-sketch w-full"
                        placeholder="jon@winterfell.got"
                      />
                    </div>
                  </div>

                  {/* Entreprise */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-primary/70 uppercase tracking-wider mb-2">
                      Entreprise <span className="text-primary/30">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input-sketch w-full"
                      placeholder="Maison Stark"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary/70 uppercase tracking-wider mb-2">
                      Votre message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      ref={messageRef}
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="input-sketch w-full resize-none"
                      placeholder="Winter is coming... et mon projet aussi !"
                    />
                  </div>

                  {/* Consentement RGPD */}
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-sketch border-2 border-primary/10">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-0.5 w-5 h-5 rounded border-2 border-primary/30 bg-transparent text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-primary/50 text-sm leading-relaxed cursor-pointer">
                      J'accepte d'être recontacté(e) par Perrine.{' '}
                      <a href="/politique-confidentialite" className="text-accent hover:underline">
                        Politique de confidentialité
                      </a>
                    </label>
                  </div>

                  {/* Message d'erreur */}
                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-sketch text-red-600 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  {/* Bouton submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-cta btn-cta-pulse w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <span className="flex items-center gap-2 group">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                        Envoyer ma demande
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
