'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database.types';
import { Link } from '@/i18n/routing';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FAQPageJsonLd } from '@/components/JsonLd';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedField } from '@/lib/i18n-helpers';

export default function FAQPage() {
  const t = useTranslations('faq-page');
  const locale = useLocale() as 'fr' | 'en' | 'es';
  
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const [faqsRef, faqsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    async function fetchFAQs() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setFaqs(data);
      }
      setLoading(false);
    }

    fetchFAQs();
  }, []);

  const demoFaqs = [
    {
      id: '1',
      question: t('demoFaqs.1.question'),
      answer: t('demoFaqs.1.answer'),
      category: t('demoFaqs.1.category'),
      sort_order: 1,
      is_published: true,
    },
    {
      id: '2',
      question: t('demoFaqs.2.question'),
      answer: t('demoFaqs.2.answer'),
      category: t('demoFaqs.2.category'),
      sort_order: 2,
      is_published: true,
    },
    {
      id: '3',
      question: t('demoFaqs.3.question'),
      answer: t('demoFaqs.3.answer'),
      category: t('demoFaqs.3.category'),
      sort_order: 3,
      is_published: true,
    },
    {
      id: '4',
      question: t('demoFaqs.4.question'),
      answer: t('demoFaqs.4.answer'),
      category: t('demoFaqs.4.category'),
      sort_order: 4,
      is_published: true,
    },
    {
      id: '5',
      question: t('demoFaqs.5.question'),
      answer: t('demoFaqs.5.answer'),
      category: t('demoFaqs.5.category'),
      sort_order: 5,
      is_published: true,
    },
    {
      id: '6',
      question: t('demoFaqs.6.question'),
      answer: t('demoFaqs.6.answer'),
      category: t('demoFaqs.6.category'),
      sort_order: 6,
      is_published: true,
    },
  ];

  const supabaseHasTranslations = locale === 'fr' || (faqs.length > 0 && `question_${locale}` in faqs[0]);
  const displayFaqs = faqs.length > 0 && supabaseHasTranslations ? faqs : demoFaqs;
  const categories = ['all', ...Array.from(new Set(displayFaqs.map(f => getLocalizedField(f, 'category', locale)).filter(Boolean)))] as string[];
  const filteredFaqs = selectedCategory === 'all'
    ? displayFaqs
    : displayFaqs.filter(f => getLocalizedField(f, 'category', locale) === selectedCategory);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-paper-light grain-overlay pt-32 pb-20">
      <FAQPageJsonLd faqs={displayFaqs.map(f => ({ question: getLocalizedField(f, 'question', locale), answer: getLocalizedField(f, 'answer', locale) }))} />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary/40 uppercase tracking-widest mb-4">
            {t('header.subtitle')}
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-6">
            {t('header.title')}
          </h1>
          <p className="text-lg text-primary/60 max-w-3xl mx-auto">
            {t('header.description')}
          </p>
          <div className="w-24 h-0.5 bg-primary/20 mx-auto mt-8" />
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                selectedCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-primary/5 border-2 border-primary/10 text-primary/60 hover:text-primary hover:border-primary/30'
              }`}
            >
              {cat === 'all' ? t('filters.all') : cat}
            </button>
          ))}
        </div>

        {/* Liste des FAQs */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div ref={faqsRef} className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`bg-paper border-2 border-primary/10 rounded-sketch-lg p-6 hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 ${
                  faqsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between text-left group"
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
                  <p className="text-primary/60 leading-relaxed font-light">
                    {getLocalizedField(faq, 'answer', locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div 
          ref={ctaRef} 
          className={`text-center mt-16 bg-paper border-2 border-primary/10 rounded-sketch-xl p-12 max-w-3xl mx-auto hover:border-primary/20 transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">
            {t('cta.title')}
          </h3>
          <p className="text-primary/60 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="btn-cta group inline-flex items-center gap-2"
            >
              <span>{t('cta.contactButton')}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/#rdv"
              className="btn-sketch group inline-flex items-center gap-2"
            >
              <span>{t('cta.bookCallButton')}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
