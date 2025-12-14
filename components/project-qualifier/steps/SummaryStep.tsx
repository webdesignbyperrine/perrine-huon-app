'use client';

import { useQualifier } from '../context';
import { 
  PROJECT_TYPES, 
  FEATURES_OPTIONS, 
  DESIGN_STYLES, 
  ANIMATION_LEVELS, 
  BUDGET_OPTIONS, 
  DEADLINE_OPTIONS, 
  ACCOMPAGNEMENT_OPTIONS 
} from '../types';
import { SparklesIcon, CheckIcon, ArrowLeftIcon } from '../icons';

export default function SummaryStep() {
  const { data, resetQualifier, goPrevious, getCompletedSteps } = useQualifier();
  const completedSteps = getCompletedSteps();

  // Récupérer les labels
  const projectTypeLabel = PROJECT_TYPES.find(p => p.value === data.projectType)?.label;
  const designStyleLabel = DESIGN_STYLES.find(d => d.value === data.designStyle)?.label;
  const animationLabel = ANIMATION_LEVELS.find(a => a.value === data.animationLevel)?.label;
  const budgetInfo = BUDGET_OPTIONS.find(b => b.value === data.budget);
  const deadlineInfo = DEADLINE_OPTIONS.find(d => d.value === data.deadline);
  const accompagnementLabel = ACCOMPAGNEMENT_OPTIONS.find(a => a.value === data.accompagnement)?.label;
  
  const featuresLabels = data.features
    .filter(f => f !== 'autre')
    .map(f => FEATURES_OPTIONS.find(fo => fo.value === f)?.label)
    .filter(Boolean);

  // Générer un titre dynamique
  const generateTitle = () => {
    if (!data.projectType && !data.budget) {
      return "Votre projet sur mesure";
    }
    
    const projectName = projectTypeLabel || "projet web";
    return `Votre ${projectName.toLowerCase()}`;
  };

  // Générer un message personnalisé
  const generateMessage = () => {
    const messages = [];
    
    if (budgetInfo) {
      messages.push(`Avec un budget ${budgetInfo.label.toLowerCase()}`);
    }
    
    if (deadlineInfo && data.deadline !== 'pas-contrainte') {
      messages.push(`livrable en ${deadlineInfo.description.toLowerCase()}`);
    }
    
    if (messages.length === 0) {
      return "J'ai hâte de découvrir votre projet et de vous accompagner dans sa réalisation.";
    }
    
    return `${messages.join(', ')}, je suis prête à donner vie à votre vision.`;
  };

  // Préparer le message pour le formulaire de contact
  const prepareContactMessage = () => {
    let message = "Bonjour,\n\nVoici le résumé de mon projet :\n\n";
    
    if (projectTypeLabel) {
      message += `📌 Type de projet : ${projectTypeLabel}\n`;
    }
    
    if (featuresLabels.length > 0) {
      message += `⚙️ Fonctionnalités : ${featuresLabels.join(', ')}\n`;
    }
    
    if (data.featureOther) {
      message += `   Autres besoins : ${data.featureOther}\n`;
    }
    
    if (designStyleLabel) {
      message += `🎨 Style de design : ${designStyleLabel}\n`;
    }
    
    if (animationLabel) {
      message += `✨ Animations : ${animationLabel}\n`;
    }
    
    if (budgetInfo) {
      message += `💰 Budget : ${budgetInfo.label} (${budgetInfo.range})\n`;
    }
    
    if (deadlineInfo) {
      message += `⏱️ Délais : ${deadlineInfo.label} (${deadlineInfo.description})\n`;
    }
    
    if (accompagnementLabel) {
      message += `🤝 Accompagnement : ${accompagnementLabel}\n`;
    }
    
    if (data.inspirations) {
      message += `💡 Inspirations : ${data.inspirations}\n`;
    }
    
    message += "\nJ'aimerais discuter de ce projet avec vous.\n\nMerci !";
    
    return encodeURIComponent(message);
  };

  return (
    <div className="py-4">
      {/* Animation de célébration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent-orange rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-accent-red rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* Titre */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent-red to-accent-orange rounded-full blur-2xl opacity-30" />
          <div className="relative w-20 h-20 glass-dark rounded-full flex items-center justify-center">
            <SparklesIcon className="w-10 h-10 text-secondary" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-secondary via-accent-orange to-accent-red bg-clip-text text-transparent text-glow">
            {generateTitle()}
          </span>
        </h2>
        <p className="text-white/60 font-light max-w-lg mx-auto">
          {generateMessage()}
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="glass-dark rounded-2xl p-6 max-w-2xl mx-auto mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <CheckIcon className="w-5 h-5 text-secondary" />
          Récapitulatif de vos choix
        </h3>
        
        <div className="space-y-4">
          {/* Type de projet */}
          {projectTypeLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Type de projet</span>
              <span className="text-white font-medium text-right">{projectTypeLabel}</span>
            </div>
          )}

          {/* Fonctionnalités */}
          {featuresLabels.length > 0 && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Fonctionnalités</span>
              <span className="text-white font-medium text-right max-w-xs">
                {featuresLabels.join(', ')}
                {data.featureOther && `, ${data.featureOther}`}
              </span>
            </div>
          )}

          {/* Style de design */}
          {designStyleLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Style de design</span>
              <span className="text-white font-medium">{designStyleLabel}</span>
            </div>
          )}

          {/* Animations */}
          {animationLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Animations</span>
              <span className="text-white font-medium">{animationLabel}</span>
            </div>
          )}

          {/* Budget */}
          {budgetInfo && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Budget</span>
              <span className="text-secondary font-semibold">{budgetInfo.range}</span>
            </div>
          )}

          {/* Délais */}
          {deadlineInfo && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Délais</span>
              <span className="text-white font-medium">
                {deadlineInfo.label} ({deadlineInfo.description})
              </span>
            </div>
          )}

          {/* Accompagnement */}
          {accompagnementLabel && (
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <span className="text-white/50 text-sm">Accompagnement</span>
              <span className="text-white font-medium">{accompagnementLabel}</span>
            </div>
          )}

          {/* Inspirations */}
          {data.inspirations && (
            <div className="flex justify-between items-start">
              <span className="text-white/50 text-sm">Inspirations</span>
              <span className="text-white/80 font-light text-right max-w-xs text-sm">
                {data.inspirations}
              </span>
            </div>
          )}

          {/* Message si rien n'a été rempli */}
          {completedSteps === 0 && (
            <div className="text-center py-4">
              <p className="text-white/50 text-sm">
                Vous n&apos;avez pas encore complété d&apos;étapes, mais ce n&apos;est pas grave !
                <br />
                Je serais ravie de découvrir votre projet lors de notre échange.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* CTA Principal */}
        <a
          href={`#contact?message=${prepareContactMessage()}`}
          onClick={(e) => {
            e.preventDefault();
            // Scroll vers le formulaire de contact
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
              // Pré-remplir le message après un court délai
              setTimeout(() => {
                const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
                if (messageField) {
                  messageField.value = decodeURIComponent(prepareContactMessage());
                  // Déclencher un événement pour React
                  const event = new Event('input', { bubbles: true });
                  messageField.dispatchEvent(event);
                }
              }, 500);
            }
          }}
          className="group relative px-10 py-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent-red to-accent-orange opacity-100 group-hover:opacity-90 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent-red to-accent-orange blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
          <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Obtenir un devis adapté à vos choix
          </span>
        </a>

        {/* CTA Secondaire - Recommencer */}
        <button
          onClick={resetQualifier}
          className="group px-6 py-4 glass-dark hover:bg-white/5 transition-all duration-300"
        >
          <span className="text-white/60 group-hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Recommencer
          </span>
        </button>
      </div>

      {/* Bouton retour */}
      <div className="text-center mt-6">
        <button
          onClick={goPrevious}
          className="text-white/40 hover:text-white/70 text-sm transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Modifier mes choix
        </button>
      </div>
    </div>
  );
}

