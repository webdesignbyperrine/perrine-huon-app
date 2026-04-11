'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database.types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SectionTitle, LoadingSpinner, SectionLink, CTAQuiz } from '@/components/ui';
import { getLocalizedField } from '@/lib/i18n-helpers';

export default function FAQPreview() {
  const t = useTranslations('faqPreview');
  const locale = useLocale() as 'fr' | 'en' | 'es';
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

  // FAQs de démo (internationalisées)
  const demoFaqs = [
    {
      id: '1',
      question: t('demoFaqs.1.question'),
      answer: t('demoFaqs.1.answer'),
      category: t('demoFaqs.1.category'),
    },
    {
      id: '2',
      question: t('demoFaqs.2.question'),
      answer: t('demoFaqs.2.answer'),
      category: t('demoFaqs.2.category'),
    },
    {
      id: '3',
      question: t('demoFaqs.3.question'),
      answer: t('demoFaqs.3.answer'),
      category: t('demoFaqs.3.category'),
    },
    {
      id: '4',
      question: t('demoFaqs.4.question'),
      answer: t('demoFaqs.4.answer'),
      category: t('demoFaqs.4.category'),
    },
  ];

  const supabaseHasTranslations = locale === 'fr' || (faqs.length > 0 && `question_${locale}` in faqs[0]);
  const displayFaqs = faqs.length > 0 && supabaseHasTranslations ? faqs : demoFaqs;

  return (
    <section id="faq-preview" className="relative pt-32 lg:pt-40 pb-32 lg:pb-40 bg-paper-light grain-overlay overflow-hidden">
      {/* Transition ondulée en haut - depuis section bleue (ContactForm) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <svg 
          className="w-full h-20 lg:h-28" 
          preserveAspectRatio="none"
          viewBox="0 0 1600 100"
        >
          <path d="M0 0 L0 60 Q 200 30 400 60 T 800 60 T 1200 60 T 1600 60 L1600 0 Z" fill="#2B5B8A"/>
        </svg>
      </div>
      
      {/* Formes géométriques circulaires décoratives - arrière-plan (desktop uniquement) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grande forme floue - extrême droite (déborde) */}
        <div 
          className="absolute top-[15%] -right-40 w-[380px] h-[380px] rounded-full opacity-[0.09]"
          style={{
            background: 'radial-gradient(circle, var(--primary-blue) 0%, transparent 65%)',
          }}
        />
        
        {/* Forme floue accent - extrême bas gauche (déborde) */}
        <div 
          className="absolute bottom-[5%] -left-36 w-64 h-64 rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 60%)',
          }}
        />
        
        {/* Cercle contour - extrême gauche (majoritairement caché) */}
        <div 
          className="absolute top-[25%] -left-32 w-40 h-40 rounded-full border-2 border-primary/12"
        />
        
        {/* Cercle contour - extrême droite bas (majoritairement caché) */}
        <div 
          className="absolute bottom-[20%] -right-28 w-36 h-36 rounded-full border border-primary/10"
        />
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
        <div ref={titleRef} className="mb-16">
            <SectionTitle
              subtitle={t('subtitle')}
              title={t('title')}
              description={t('description')}
              isVisible={titleVisible}
            />
        </div>

        {loading ? (
          <LoadingSpinner />
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
                      {getLocalizedField(faq, 'question', locale)}
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
                      {getLocalizedField(faq, 'answer', locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className={`text-center mt-12 flex flex-col items-center gap-6 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <SectionLink href="/faq">{t('viewAll')}</SectionLink>
              <CTAQuiz />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
