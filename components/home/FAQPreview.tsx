'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FAQPreview() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Animations au scroll
  const [titleRef, titleVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [faqsRef, faqsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    async function fetchFAQs() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .limit(5);

      if (!error && data) {
        setFaqs(data);
      }
      setLoading(false);
    }

    fetchFAQs();
  }, []);

  // FAQs de démo
  const demoFaqs = [
    {
      id: '1',
      question: 'Combien de temps faut-il pour créer un site web ?',
      answer: 'Le délai de création dépend de la complexité du projet. Un site vitrine simple peut être livré en 2-3 semaines, tandis qu\'un site e-commerce ou une application web sur mesure peut prendre 6 à 12 semaines.',
      category: 'Process',
    },
    {
      id: '2',
      question: 'Comment fonctionne le SEO géolocalisé ?',
      answer: 'Le SEO géolocalisé permet d\'optimiser votre visibilité sur des recherches locales spécifiques. Je travaille sur l\'optimisation des contenus, des balises meta, et la création de pages ciblées par ville ou zone géographique pour améliorer votre positionnement local.',
      category: 'SEO',
    },
    {
      id: '3',
      question: 'Proposez-vous un service de maintenance ?',
      answer: 'Oui, je propose des formules de maintenance mensuelles incluant les mises à jour, la sécurité, les sauvegardes et le support technique.',
      category: 'Services',
    },
    {
      id: '4',
      question: 'Quels sont vos tarifs ?',
      answer: 'Mes tarifs varient selon la nature et l\'ampleur du projet. Je propose des devis personnalisés après un premier échange pour bien comprendre vos besoins. N\'hésitez pas à me contacter pour discuter de votre projet.',
      category: 'Tarifs',
    },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : demoFaqs;

  return (
    <section id="faq-preview" className="relative pt-24 lg:pt-32 pb-32 lg:pb-40 bg-paper-light grain-overlay overflow-hidden">
      {/* Éléments décoratifs - z-index 0 pour rester en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute top-32 left-10 w-8 h-8 text-primary/10" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-48 right-20 w-6 h-6 text-primary/10" viewBox="0 0 24 24">
          <polygon points="12,4 20,20 4,20" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      
      {/* Transition ondulée en bas - vers bleu */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        <svg 
          className="w-full h-20 lg:h-28" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 100 L0 40 Q 200 70 400 40 T 800 40 T 1200 40 T 1600 40 L1600 100 Z" fill="#2B5B8A"/>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <span 
            className={`inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Questions fréquentes
          </span>
          <h2 
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 transition-all duration-700 delay-100 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            FAQ
          </h2>
          <p 
            className={`text-lg text-primary/60 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Les réponses aux questions les plus courantes sur mes services et mon processus de travail.
          </p>
          
          {/* Ligne décorative */}
          <div 
            className={`w-24 h-0.5 bg-primary/20 mx-auto mt-8 transition-all duration-1000 delay-300 ${
              titleVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div ref={faqsRef} className="max-w-4xl mx-auto space-y-4">
              {displayFaqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className={`bg-paper border-2 border-primary/10 rounded-sketch-lg p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 ${
                    faqsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-primary pr-4 group-hover:text-accent transition-colors">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 flex-shrink-0 text-accent transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-primary/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className={`text-center mt-12 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link 
                href="/faq" 
                className="btn-sketch group inline-flex items-center gap-2"
              >
                <span>Voir toutes les questions</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
