'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useQualifier } from '../context';
import { ArrowLeftIcon } from '../icons';

type FormStep = 'email' | 'details' | 'success';

export default function QuoteRequestStep() {
  const t = useTranslations('qualifier.quoteRequest');
  const tRoot = useTranslations('qualifier');
  const { data, goPrevious, resetQualifier } = useQualifier();
  const [formStep, setFormStep] = useState<FormStep>('email');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Validation email
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getProjectLabels = () => {
    const projectType = data.projectType ? tRoot(`projectType.options.${data.projectType}.label`) : undefined;
    const designStyle = data.designStyle ? tRoot(`designStyle.options.${data.designStyle}.label`) : undefined;
    const animation = data.animationLevel ? tRoot(`animationLevel.options.${data.animationLevel}.label`) : undefined;
    const budget = data.budget ? {
      label: tRoot(`budget.options.${data.budget}.label`),
      range: tRoot(`budget.options.${data.budget}.range`),
    } : undefined;
    const deadline = data.deadline ? {
      label: tRoot(`deadline.options.${data.deadline}.label`),
      description: tRoot(`deadline.options.${data.deadline}.description`),
    } : undefined;
    const accompagnement = data.accompagnement ? tRoot(`accompagnement.options.${data.accompagnement}.label`) : undefined;
    const features = data.features
      .filter(f => f !== 'autre')
      .map(f => tRoot(`features.options.${f}`));

    return { projectType, designStyle, animation, budget, deadline, accompagnement, features };
  };

  // Construire un message en filtrant les valeurs vides
  const buildMessage = (lines: (string | false | undefined | null)[]): string => 
    lines.filter(Boolean).join('\n');

  // Préparer le résumé du projet pour la BDD
  const prepareProjectSummary = () => {
    const { projectType, designStyle, animation, budget, deadline, accompagnement, features } = getProjectLabels();

    return buildMessage([
      `📋 ${t('emailSubject')}\n`,
      projectType && `📌 ${t('projectTypeLabel')} : ${projectType}`,
      features.length > 0 && `⚙️ ${t('featuresLabel')} : ${features.join(', ')}`,
      data.featureOther && `   ${t('otherNeeds')} : ${data.featureOther}`,
      designStyle && `🎨 ${t('designLabel')} : ${designStyle}`,
      animation && `✨ ${t('animationsLabel')} : ${animation}`,
      budget && `💰 ${t('budgetLabel')} : ${budget.label} (${budget.range})`,
      deadline && `⏱️ ${t('deadlineLabel')} : ${deadline.label} (${deadline.description})`,
      accompagnement && `🤝 ${t('accompagnementLabel')} : ${accompagnement}`,
      data.inspirations && `💡 ${t('inspirationsLabel')} : ${data.inspirations}`,
    ]);
  };

  // Préparer le message WhatsApp
  const prepareWhatsAppMessage = () => {
    const { projectType, designStyle, animation, budget, deadline, accompagnement, features } = getProjectLabels();

    const message = buildMessage([
      `${t('greeting')} 👋\n`,
      `${t('discussMessage')}\n`,
      projectType && `📌 *${t('projectTypeLabel')}* : ${projectType}`,
      features.length > 0 && `⚙️ *${t('featuresLabel')}* : ${features.join(', ')}`,
      data.featureOther && `   _${t('otherNeeds')}_ : ${data.featureOther}`,
      designStyle && `🎨 *${t('designLabel')}* : ${designStyle}`,
      animation && `✨ *${t('animationsLabel')}* : ${animation}`,
      budget && `💰 *${t('budgetLabel')}* : ${budget.label} (${budget.range})`,
      deadline && `⏱️ *${t('deadlineLabel')}* : ${deadline.label} (${deadline.description})`,
      accompagnement && `🤝 *${t('accompagnementLabel')}* : ${accompagnement}`,
      data.inspirations && `💡 *${t('inspirationsLabel')}* : ${data.inspirations}`,
    ]);

    return encodeURIComponent(message);
  };

  // Jouer le son sparkle
  const playSparkleSound = () => {
    try {
      const audio = new Audio('/sounds/sparkle.wav');
      audio.volume = 0.5;
      audio.play();
    } catch (err) {
      // Fallback silencieux
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async () => {
    playSparkleSound();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          company: company?.trim() || null,
          projectSummary: prepareProjectSummary(),
          projectData: {
            projectType: data.projectType,
            features: data.features,
            featureOther: data.featureOther,
            designStyle: data.designStyle,
            animationLevel: data.animationLevel,
            budget: data.budget,
            deadline: data.deadline,
            accompagnement: data.accompagnement,
            inspirations: data.inspirations,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t('sendError'));
      }

      setFormStep('success');
    } catch (err) {
      console.error('Erreur:', err);
      setError(t('sendErrorDetail'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Étape 1 : Choix du mode de contact
  if (formStep === 'email') {
    return (
      <div className="py-8 max-w-3xl mx-auto">
        {/* Header avec animation */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 mb-6 animate-pulse">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            {t('greatProject')}
          </h2>
          <p className="text-primary/60 text-lg">
            {t('howToReceive')}
          </p>
        </div>

        {/* Deux options côte à côte - Style dark pour meilleure lisibilité */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Option 1 : Email - Fond sombre */}
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-slate-600/30 hover:border-accent/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{t('byEmail')}</h3>
                <p className="text-slate-300 text-sm font-medium">{t('emailDelay')}</p>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                {t('yourEmail')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marie@entreprise.fr"
                className="w-full px-4 py-3 text-base rounded-xl border-2 border-slate-600 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all outline-none bg-slate-700/80 text-white placeholder:text-slate-400"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            {/* CTA Email */}
            <button
              onClick={() => {
                if (isValidEmail(email)) {
                  setFormStep('details');
                  setError('');
                } else {
                  setError(t('invalidEmail'));
                }
              }}
              disabled={!email}
              className="w-full btn-cta btn-cta-pulse py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span>{t('continueBtn')}</span>
              <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 text-slate-300 text-xs mt-3 font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('thirtySeconds')}</span>
            </div>
          </div>

          {/* Option 2 : WhatsApp - Fond sombre */}
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-slate-600/30 hover:border-[#25D366]/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{t('byWhatsApp')}</h3>
                <p className="text-slate-300 text-sm font-medium">{t('whatsAppDesc')}</p>
              </div>
            </div>

            <p className="text-slate-200 text-sm mb-4 leading-relaxed">
              {t('whatsAppPreview')}
            </p>

            {/* Aperçu du message */}
            <div className="bg-[#25D366]/15 rounded-lg p-3 mb-4 text-xs text-slate-200 max-h-24 overflow-hidden relative border border-[#25D366]/30">
              <p className="line-clamp-3 font-medium">
                📌 {t('projectTypeLabel')} • ⚙️ {t('featuresLabel')} • 🎨 {t('designLabel')} • 💰 {t('budgetLabel')} • ⏱️ {t('deadlineLabel')}...
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#25D366]/15 to-transparent"></div>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={`https://wa.me/33645182749?text=${prepareWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-all hover:scale-[1.02] shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>{t('openWhatsApp')}</span>
            </a>

            {/* Badge réponse rapide */}
            <div className="flex items-center justify-center gap-2 text-[#25D366] text-xs mt-3 font-medium">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></span>
              <span>{t('usuallyOnline')}</span>
            </div>
          </div>
        </div>

        {/* Bouton retour */}
        <div className="text-center mt-8">
          <button
            onClick={goPrevious}
            className="text-primary/40 hover:text-primary/70 text-sm transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {t('backToInspirations')}
          </button>
        </div>
      </div>
    );
  }

  // Étape 2 : Détails
  if (formStep === 'details') {
    return (
      <div className="py-8 max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            {t('helloName', { name: firstName || '' })}
          </h2>
          <p className="text-primary/60 text-lg">
            {t('personalizeQuote')}
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-primary/70 mb-2">
                {t('firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marie"
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all outline-none bg-white"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-primary/70 mb-2">
                {t('lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dupont"
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all outline-none bg-white"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="company" className="block text-sm font-medium text-primary/70 mb-2">
              {t('companyOptional')}
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Ma Super Boîte"
              className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all outline-none bg-white"
            />
          </div>

          {/* Email affiché */}
          <div className="flex items-center gap-2 text-primary/50 text-sm mb-6 bg-primary/5 rounded-lg p-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{t('quoteSentTo')} <strong className="text-primary">{email}</strong></span>
          </div>

          {/* Badge 48h */}
          <div className="flex items-center justify-center gap-2 text-accent text-sm mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{t('quoteGuarantee')}</span>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={!firstName || !lastName || isSubmitting}
            className="w-full btn-cta btn-cta-pulse py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('sendingInProgress')}
              </span>
            ) : (
              <span>{t('receiveQuote')}</span>
            )}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}

          {/* Confidentialité */}
          <p className="text-center text-primary/40 text-xs mt-4 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {t('dataConfidential')}
          </p>
        </div>

        {/* Bouton retour */}
        <div className="text-center mt-6">
          <button
            onClick={() => setFormStep('email')}
            className="text-primary/40 hover:text-primary/70 text-sm transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {t('editEmail')}
          </button>
        </div>
      </div>
    );
  }

  // Étape 3 : Succès
  return (
    <div className="py-8 max-w-xl mx-auto text-center">
      {/* Animation de succès */}
      <div className="relative mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Confettis effet */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-accent rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-4 right-1/4 w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute bottom-4 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>

      {/* Message */}
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        {t('sentTitle', { name: firstName })}
      </h2>
      <p className="text-lg text-primary/60 mb-8">
        {t('sentDescription')}
      </p>

      {/* Card récapitulatif */}
      <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
          <span>📬</span> {t('quoteSentToEmail')}
        </h3>
        <p className="text-primary/80 font-medium">{email}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="btn-sketch px-6 py-3 font-semibold"
        >
          {t('backToHomeBtn')}
        </Link>
        <button
          onClick={resetQualifier}
          className="text-primary/50 hover:text-primary/70 text-sm transition-colors underline"
        >
          {t('restartQuiz')}
        </button>
      </div>

      {/* Petit message personnel */}
      <div className="mt-12 p-6 bg-white/60 rounded-xl border border-primary/10">
        <p className="text-primary/70 italic">
          {t('signedBy')}
        </p>
        <p className="text-primary font-semibold mt-2">Perrine</p>
      </div>
    </div>
  );
}

