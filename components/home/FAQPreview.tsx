'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/types/database.types';

export default function FAQPreview() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section id="faq-preview" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Questions Fréquentes</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mt-4">
            Les réponses aux questions les plus courantes sur mes services et mon processus de travail.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto space-y-4">
              {displayFaqs.map((faq, index) => (
                <div key={faq.id} className="card">
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

            <div className="text-center mt-12">
              <Link href="/faq" className="btn-secondary inline-block">
                Voir toutes les questions
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


