'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database.types';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // Animation au montage - on utilise un petit délai pour l'effet d'entrée
  const [isPageMounted, setIsPageMounted] = useState(true);
  
  // Animation au scroll
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
      question: 'Combien de temps faut-il pour créer un site web ?',
      answer: 'Le délai de création dépend de la complexité du projet. Un site vitrine simple peut être livré en 2-3 semaines, tandis qu\'un site e-commerce ou une application web sur mesure peut prendre 6 à 12 semaines. Je fournis toujours un planning détaillé après notre premier échange.',
      category: 'Process',
      sort_order: 1,
      is_published: true,
    },
    {
      id: '2',
      question: 'Comment fonctionne le SEO géolocalisé ?',
      answer: 'Le SEO géolocalisé permet d\'optimiser votre visibilité sur des recherches locales spécifiques. Je travaille sur l\'optimisation des contenus, des balises meta, la création de pages ciblées par ville ou zone géographique, et l\'intégration avec Google My Business pour améliorer votre positionnement local.',
      category: 'SEO',
      sort_order: 2,
      is_published: true,
    },
    {
      id: '3',
      question: 'Proposez-vous un service de maintenance ?',
      answer: 'Oui, je propose des formules de maintenance mensuelles incluant les mises à jour de sécurité, l\'optimisation continue, les sauvegardes automatiques et le support technique prioritaire.',
      category: 'Services',
      sort_order: 3,
      is_published: true,
    },
    {
      id: '4',
      question: 'Quels sont vos tarifs ?',
      answer: 'Mes tarifs varient selon la nature et l\'ampleur du projet. Je propose des devis personnalisés après un premier échange pour bien comprendre vos besoins et objectifs. N\'hésitez pas à me contacter pour discuter de votre projet.',
      category: 'Tarifs',
      sort_order: 4,
      is_published: true,
    },
    {
      id: '5',
      question: 'Travaillez-vous avec des clients hors de France ?',
      answer: 'Oui, je travaille avec des clients partout dans le monde. La majorité des échanges se font en ligne (visio, email), ce qui facilite la collaboration à distance. Le SEO peut être optimisé pour n\'importe quelle zone géographique.',
      category: 'Process',
      sort_order: 5,
      is_published: true,
    },
    {
      id: '6',
      question: 'Quelles technologies utilisez-vous ?',
      answer: 'J\'utilise des technologies modernes et performantes comme Next.js, React, TypeScript, Tailwind CSS, et Supabase. Le choix des technologies est toujours adapté à vos besoins spécifiques et aux objectifs du projet.',
      category: 'Technique',
      sort_order: 6,
      is_published: true,
    },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : demoFaqs;
  const categories = ['all', ...Array.from(new Set(displayFaqs.map(f => f.category).filter(Boolean)))] as string[];
  const filteredFaqs = selectedCategory === 'all' 
    ? displayFaqs 
    : displayFaqs.filter(f => f.category === selectedCategory);

  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-7xl md:text-8xl font-bold mb-6 transition-all duration-700 ${isPageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>
          <p className={`text-xl text-white/50 max-w-3xl mx-auto font-light transition-all duration-700 delay-100 ${isPageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Les réponses à vos questions sur mes services, mon processus de travail et le SEO local
          </p>
          <div className={`w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-8 transition-all duration-1000 delay-200 ${isPageMounted ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
        </div>

        {/* Filtres par catégorie */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-300 ${isPageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as string)}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-secondary to-accent-red text-white'
                  : 'glass-dark text-white/60 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Toutes' : cat}
            </button>
          ))}
        </div>

        {/* Liste des FAQs */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
          </div>
        ) : (
          <div ref={faqsRef} className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`glass-dark rounded-2xl p-6 hover:-translate-y-1 transition-all duration-500 ${faqsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between text-left group"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white pr-4 group-hover:text-secondary transition-colors">
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
                  <p className="text-white/70 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div ref={ctaRef} className={`text-center mt-16 glass-dark rounded-2xl p-12 max-w-3xl mx-auto hover:bg-white/5 transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Vous n'avez pas trouvé votre réponse ?
          </h3>
          <p className="text-white/60 mb-8">
            Contactez-moi directement et je vous répondrai dans les 24h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
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
                <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
                <span className="absolute inset-1 rounded-full pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(180deg, #476787 0%, var(--secondary) 50%, #1C2A35 100%)', boxShadow: '0 0 20px rgba(47, 69, 88, 0.6), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)' }}>
                  <span className="absolute top-1 left-6 right-6 h-2 rounded-full transition-transform duration-500 group-hover/cta:translate-x-2" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.4) 70%, transparent 100%)' }} />
                </span>
                <span className="relative z-10 text-white font-semibold tracking-wider uppercase text-sm drop-shadow-lg">Me contacter</span>
              </div>
            </Link>
            <Link
              href="/#rdv"
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
                <span className="absolute top-0 left-6 right-6 h-2 rounded-t-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
                <span className="relative z-10 text-white/80 group-hover/cta:text-white font-semibold tracking-wider uppercase text-sm transition-colors">Réserver un appel</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

