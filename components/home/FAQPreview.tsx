'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database.types';
import SectionDivider from './SectionDivider';
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
    <section id="faq-preview" className="relative py-20 pb-32 bg-primary-900">
      {/* Divider en haut - prend la couleur de cette section (#0d1a2d) */}
      <SectionDivider bottomSectionColor="#0d1a2d" position="top" />
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl md:text-7xl font-bold mt-4 mb-6 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              FAQ
            </span>
          </h2>
          <p className={`text-xl text-white/50 max-w-2xl mx-auto font-light transition-all duration-700 delay-100 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Les réponses aux questions les plus courantes sur mes services et mon processus de travail.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div ref={faqsRef} className="max-w-4xl mx-auto space-y-4">
              {displayFaqs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className={`card hover:-translate-y-1 transition-all duration-500 ${faqsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 flex-shrink-0 text-secondary transition-transform duration-300 ${
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
                    <p className="text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className={`text-center mt-12 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link 
                href="/faq" 
                className="group/cta relative inline-block transition-transform duration-300 hover:scale-[1.02]"
              >
                <div 
                  className="relative flex items-center gap-3 px-10 py-4 rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <span 
                    className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }}
                  />
                  {/* Liquide - Couleur verte pour contraster avec le fond bleu */}
                  <span 
                    className="absolute inset-1 rounded-full pointer-events-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, #1a6b5a 0%, #0d433e 50%, #082b27 100%)',
                      boxShadow: '0 0 20px rgba(13, 67, 62, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    <span 
                      className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}
                    />
                  </span>
                  <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">
                    Voir toutes les questions
                  </span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
      
      {/* Divider en bas - prend la couleur de la section suivante (#0d433e) */}
      <SectionDivider bottomSectionColor="#0d433e" position="bottom" />
    </section>
  );
}




