'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ProjectQualifier from '@/components/project-qualifier/ProjectQualifier';

type ContactView = 'choice' | 'form' | 'qualifier';

export default function ContactForm() {
  const [view, setView] = useState<ContactView>('choice');
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
      setErrorMessage('N\'oubliez pas de cocher la case pour que je puisse vous répondre !');
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

  const handleBackToChoice = () => {
    setView('choice');
    setStatus('idle');
  };

  // URL Calendly
  const calendlyUrl = "https://calendly.com/perrinehuon/30min";

  // Rendu de la vue "Choix" - 3 options
  const renderChoiceView = () => (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div ref={titleRef} className="text-center mb-10 lg:mb-14">
        <span 
          className={`inline-block text-sm font-medium text-paper/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Prêt·e à démarrer ?
        </span>
        <h2 
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-paper mb-4 transition-all duration-700 delay-100 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Donnons vie à votre projet
        </h2>
        <p 
          className={`text-lg text-paper/60 max-w-xl mx-auto transition-all duration-700 delay-200 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Comment souhaitez-vous me contacter ?
        </p>
        
        {/* Ligne décorative */}
        <div 
          className={`w-24 h-0.5 bg-paper/20 mx-auto mt-8 transition-all duration-1000 delay-300 ${
            titleVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
        />
      </div>

      {/* Cartes de choix - 3 colonnes avec alignement CSS Grid */}
      <div 
        ref={formRef}
        className={`grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch transition-all duration-700 delay-200 ${
          formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Option 1 : Message libre */}
        <button
          onClick={() => setView('form')}
          className="group flex flex-col text-center bg-paper/5 border-2 border-paper/10 rounded-sketch-xl p-6 lg:p-8 hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Badge - hauteur fixe */}
          <div className="h-[32px] flex items-center justify-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper/10 border border-paper/20 rounded-full text-xs font-semibold text-paper/70 uppercase tracking-wider">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Rapide
            </span>
          </div>

          {/* Icône - hauteur fixe */}
          <div className="h-[56px] flex items-center justify-center mb-5">
            <div className="w-14 h-14 bg-paper/10 border-2 border-paper/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <svg className="w-7 h-7 text-paper/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 6L2 7"/>
              </svg>
            </div>
          </div>

          {/* Titre - hauteur fixe */}
          <div className="h-[60px] flex items-start justify-center mb-2">
            <h3 className="text-lg lg:text-xl font-bold text-paper">
              J&apos;ai une idée précise
            </h3>
          </div>

          {/* Paragraphe - hauteur fixe pour alignement */}
          <div className="min-h-[100px] flex items-start">
            <p className="text-paper/60 text-sm leading-relaxed">
              Vous savez ce que vous voulez ? Écrivez-moi directement ! Je vous réponds sous 48h.
            </p>
          </div>

          {/* CTA bouton avec border rose */}
          <div className="w-full pt-5">
            <span 
              className="inline-flex items-center justify-center w-full px-6 py-3 border-2 rounded-full font-semibold transition-all duration-300 group-hover:scale-105"
              style={{ borderColor: '#e85d8c', color: '#e85d8c' }}
            >
              Écrire mon message
            </span>
          </div>
        </button>

        {/* Option 2 : Questionnaire guidé */}
        <button
          onClick={() => setView('qualifier')}
          className="group flex flex-col text-center bg-paper/5 border-2 border-paper/10 rounded-sketch-xl p-6 lg:p-8 hover:border-[#e85d8c]/30 hover:bg-paper/10 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Badge recommandé - hauteur fixe */}
          <div className="h-[32px] flex items-center justify-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: 'rgba(232, 93, 140, 0.2)', borderColor: 'rgba(232, 93, 140, 0.4)', color: '#e85d8c' }}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Recommandé
            </span>
          </div>

          {/* Icône - hauteur fixe - style header mobile avec animation */}
          <div className="h-[56px] flex items-center justify-center mb-5">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center animate-bounce-icon"
              style={{ 
                backgroundColor: '#ff0f7c',
                boxShadow: '0 4px 15px rgba(255, 15, 124, 0.4)'
              }}
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
          </div>

          {/* Titre - hauteur fixe */}
          <div className="h-[60px] flex items-start justify-center mb-2">
            <h3 className="text-lg lg:text-xl font-bold text-paper">
              Aidez-moi à définir mon besoin
            </h3>
          </div>

          {/* Paragraphe - hauteur fixe pour alignement */}
          <div className="min-h-[100px] flex items-start">
            <p className="text-paper/60 text-sm leading-relaxed">
              Pas encore sûr·e de ce qu&apos;il vous faut ? Répondez à quelques questions et recevez une estimation personnalisée.
            </p>
          </div>

          {/* CTA bouton rose */}
          <div className="w-full pt-5">
            <span 
              className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 group-hover:scale-105"
              style={{ 
                backgroundColor: '#ff0f7c',
                boxShadow: '0 4px 15px rgba(255, 15, 124, 0.3)'
              }}
            >
              Commencer le quiz interactif
            </span>
            <span className="text-xs text-paper/40 flex items-center justify-center gap-1.5 mt-3">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2 min
            </span>
          </div>
        </button>

        {/* Option 3 : RDV Visio */}
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col text-center bg-paper/5 border-2 border-paper/10 rounded-sketch-xl p-6 lg:p-8 hover:border-paper/20 hover:bg-paper/10 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Badge - hauteur fixe */}
          <div className="h-[32px] flex items-center justify-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper/10 border border-paper/20 rounded-full text-xs font-semibold text-paper/70 uppercase tracking-wider">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30 min
            </span>
          </div>

          {/* Icône visio - hauteur fixe */}
          <div className="h-[56px] flex items-center justify-center mb-5">
            <div className="w-14 h-14 bg-paper/10 border-2 border-paper/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300">
              <svg 
                className="w-7 h-7 text-paper/80" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Titre - hauteur fixe */}
          <div className="h-[60px] flex items-start justify-center mb-2">
            <h3 className="text-lg lg:text-xl font-bold text-paper">
              On s&apos;appelle ?
            </h3>
          </div>

          {/* Paragraphe - hauteur fixe pour alignement */}
          <div className="min-h-[100px] flex items-start">
            <p className="text-paper/60 text-sm leading-relaxed">
              Première consultation offerte, sans engagement. Je vous conseille sur la meilleure approche pour votre projet.
            </p>
          </div>

          {/* CTA bouton avec border rose */}
          <div className="w-full pt-5">
            <span 
              className="inline-flex items-center justify-center w-full px-6 py-3 border-2 rounded-full font-semibold transition-all duration-300 group-hover:scale-105"
              style={{ borderColor: '#e85d8c', color: '#e85d8c' }}
            >
              Réserver un créneau
            </span>
          </div>
        </a>
      </div>

      {/* Reassurance */}
      <div 
        className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-paper/50 text-sm transition-all duration-700 delay-400 ${
          formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Gratuit
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Sans engagement
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Réponse sous 48h
        </span>
      </div>
    </div>
  );

  // Rendu du formulaire classique
  const renderFormView = () => (
    <div className="max-w-2xl mx-auto">
      {/* Header avec bouton retour */}
      <div ref={titleRef} className="text-center mb-10 lg:mb-14">
        <button
          onClick={handleBackToChoice}
          className="inline-flex items-center gap-2 text-paper/50 hover:text-paper mb-6 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux options
        </button>
        <h2 className="flex items-center justify-center gap-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-paper mb-4">
          <span>Écrivez-moi</span>
          <svg 
            className="w-8 h-8 lg:w-10 lg:h-10 text-accent flex-shrink-0"
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
        <p className="text-lg text-paper/60 flex items-center justify-center gap-2">
          <span>Parlez-moi de votre projet, je vous réponds sous 48h</span>
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </p>
      </div>

      {/* Form Card */}
      <div 
        ref={formRef} 
        className={`relative transition-all duration-700 ${
          formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative bg-paper/5 border-2 border-paper/10 rounded-sketch-xl p-8 lg:p-10 hover:border-paper/20 transition-colors duration-300">
          
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 border-2 border-green-500/40 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="flex items-center justify-center gap-2 text-2xl font-bold mb-4 text-paper">
                <span>Bien reçu !</span>
                {/* Picto confetti/célébration */}
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </h3>
              <p className="text-paper/60 mb-8">
                Merci pour votre message. Je vous réponds sous 48h, promis !
              </p>
              <button
                onClick={handleBackToChoice}
                className="btn-cta"
              >
                Retour à l&apos;accueil
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Nom & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-paper/70 uppercase tracking-wider mb-2">
                    Nom complet <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-paper/10 border-2 border-paper/20 rounded-sketch text-paper placeholder-paper/40 focus:border-accent focus:outline-none transition-colors"
                    placeholder="Jon Snow"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-paper/70 uppercase tracking-wider mb-2">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-paper/10 border-2 border-paper/20 rounded-sketch text-paper placeholder-paper/40 focus:border-accent focus:outline-none transition-colors"
                    placeholder="jon@winterfell.got"
                  />
                </div>
              </div>

              {/* Entreprise */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-paper/70 uppercase tracking-wider mb-2">
                  Entreprise <span className="text-paper/30">(optionnel)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-paper/10 border-2 border-paper/20 rounded-sketch text-paper placeholder-paper/40 focus:border-accent focus:outline-none transition-colors"
                  placeholder="Maison Stark"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-paper/70 uppercase tracking-wider mb-2">
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
                  className="w-full px-4 py-3 bg-paper/10 border-2 border-paper/20 rounded-sketch text-paper placeholder-paper/40 focus:border-accent focus:outline-none transition-colors resize-none"
                  placeholder="Parlez-moi de votre projet, vos idées, vos envies... Je suis tout ouïe !"
                />
              </div>

              {/* Consentement RGPD */}
              <div className="flex items-start gap-4 p-4 bg-paper/5 rounded-sketch border-2 border-paper/10">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-paper/30 bg-transparent text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="consent" className="text-paper/50 text-sm leading-relaxed cursor-pointer">
                  J&apos;accepte d&apos;être recontacté(e) par Perrine.{' '}
                  <a href="/politique-confidentialite" className="text-accent hover:underline">
                    Politique de confidentialité
                  </a>
                </label>
              </div>

              {/* Message d'erreur */}
              {status === 'error' && (
                <div className="p-4 bg-red-500/20 border-2 border-red-500/40 rounded-sketch text-red-300 text-sm">
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
                    Envoyer mon message
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
  );

  // Rendu du qualifier
  const renderQualifierView = () => (
    <div className="max-w-5xl mx-auto">
      {/* Qualifier avec bouton retour intégré */}
      <ProjectQualifier mode="inline" onBack={handleBackToChoice} />
    </div>
  );

  return (
    <section id="contact" className="relative pt-32 lg:pt-40 pb-32 lg:pb-40 bg-primary section-dark overflow-hidden">
      {/* Transition ondulée en haut - depuis section beige (PortfolioPreview) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <svg 
          className="w-full h-20 lg:h-28" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 0 L0 60 Q 200 30 400 60 T 800 60 T 1200 60 T 1600 60 L1600 0 Z" fill="#D4C4A8"/>
        </svg>
      </div>
      
      {/* Fond avec texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0" />
      
      {/* Formes géométriques circulaires décoratives - arrière-plan (desktop uniquement) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grande forme floue - extrême droite (déborde) */}
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-paper/8 rounded-full blur-[80px]" />
        
        {/* Forme floue accent - extrême gauche (déborde) */}
        <div className="absolute bottom-[10%] -left-36 w-64 h-64 bg-accent/8 rounded-full blur-[70px]" />
        
        {/* Cercle contour - extrême gauche haut (majoritairement caché) */}
        <div 
          className="absolute top-[20%] -left-28 w-36 h-36 rounded-full border-2 border-paper/10"
        />
        
        {/* Cercle contour - extrême droite bas (majoritairement caché) */}
        <div 
          className="absolute bottom-[30%] -right-20 w-28 h-28 rounded-full border border-paper/8"
        />
      </div>
      
      {/* Transition ondulée en bas - vers beige-light (FAQPreview) */}
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
        {view === 'choice' && renderChoiceView()}
        {view === 'form' && renderFormView()}
        {view === 'qualifier' && renderQualifierView()}
      </div>
    </section>
  );
}
