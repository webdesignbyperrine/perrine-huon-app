'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ContactCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calendlyUrl = "https://calendly.com/perrine-huon/30min";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#D4C4A8] via-[#CDBF9B] to-[#C5B590] dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className={`w-full max-w-4xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-[#2B5B8A]/20 dark:border-[#4A7AA8]/30 overflow-hidden">
            <div className="bg-gradient-to-r from-[#2B5B8A] to-[#1E4A73] dark:from-[#1E4A73] dark:to-[#2B5B8A] p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
              </div>
              <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 font-[family-name:var(--font-outfit)]">
                  Perrine Huon
                </h1>
                <div className="h-1 w-24 bg-[#ff0f7c] mx-auto mb-4 rounded-full"></div>
                <p className="text-xl sm:text-2xl text-white/95 font-semibold">
                  Product Designer
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-10 space-y-8">
              <div className="text-center space-y-4">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <span className="px-5 py-2.5 bg-[#2B5B8A]/10 dark:bg-[#4A7AA8]/20 text-[#2B5B8A] dark:text-[#4A7AA8] rounded-full text-sm sm:text-base font-semibold border border-[#2B5B8A]/20 dark:border-[#4A7AA8]/30 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Web Developer
                  </span>
                  <span className="px-5 py-2.5 bg-[#2B5B8A]/10 dark:bg-[#4A7AA8]/20 text-[#2B5B8A] dark:text-[#4A7AA8] rounded-full text-sm sm:text-base font-semibold border border-[#2B5B8A]/20 dark:border-[#4A7AA8]/30 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    UX Designer
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  Créatrice de sites et apps web sur mesure
                </p>
                <p className="text-base sm:text-lg text-[#2B5B8A] dark:text-[#4A7AA8] font-semibold flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Paris
                </p>

                {/* Réseaux sociaux - juste les logos */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href="https://www.linkedin.com/in/perrinehuon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-transform duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <div className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/perrinehuon.web/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-transform duration-300 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61586560335973"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-transform duration-300 hover:scale-110"
                    aria-label="Facebook"
                  >
                    <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-[#2B5B8A]/20 dark:border-[#4A7AA8]/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-slate-800 px-4">
                    <svg className="w-6 h-6 text-[#2B5B8A] dark:text-[#4A7AA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Section RDV - AVANT les activités */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                  Prenons rendez-vous
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-r from-[#ff0f7c] to-[#d90066] hover:from-[#d90066] hover:to-[#ff0f7c] text-white p-6 rounded-2xl font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    <div className="relative z-10 space-y-2">
                      <div className="flex justify-center mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-lg">RDV via Calendly</div>
                      <div className="text-sm opacity-90">Réservez un créneau</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </a>

                  <Link
                    href="/#contact"
                    className="group relative bg-gradient-to-r from-[#2B5B8A] to-[#1E4A73] hover:from-[#1E4A73] hover:to-[#2B5B8A] dark:from-[#4A7AA8] dark:to-[#2B5B8A] dark:hover:from-[#2B5B8A] dark:hover:to-[#4A7AA8] text-white p-6 rounded-2xl font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    <div className="relative z-10 space-y-2">
                      <div className="flex justify-center mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-lg">RDV via Formulaire</div>
                      <div className="text-sm opacity-90">Envoyez un message</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </Link>
                </div>
              </div>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-[#2B5B8A]/20 dark:border-[#4A7AA8]/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-slate-800 px-4">
                    <svg className="w-6 h-6 text-[#ff0f7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Activités - APRÈS la section RDV */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#ff0f7c]/5 to-[#2B5B8A]/5 dark:from-[#ff0f7c]/10 dark:to-[#2B5B8A]/10 p-6 rounded-2xl border-2 border-[#ff0f7c]/20 dark:border-[#ff0f7c]/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#ff0f7c] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Fondatrice de CoworkMeet
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                        Communauté de freelances pour se rencontrer et collaborer
                      </p>
                      <a
                        href="https://www.coworkmeet.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff0f7c] hover:bg-[#d90066] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        Découvrir CoworkMeet
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#2B5B8A]/5 to-[#ff0f7c]/5 dark:from-[#2B5B8A]/10 dark:to-[#ff0f7c]/10 p-6 rounded-2xl border-2 border-[#2B5B8A]/20 dark:border-[#2B5B8A]/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#2B5B8A] dark:bg-[#4A7AA8] rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">
                        Auteure publiée
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                        Deux livres publiés aux Éditions Michel Lafon
                      </p>
                      <a
                        href="https://www.amazon.fr/stores/Perrine-Huon/author/B004MZ3BJQ?ref=sr_ntt_srch_lnk_1&qid=1772301859&sr=8-1&shoppingPortalEnabled=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2B5B8A] hover:bg-[#1E4A73] dark:bg-[#4A7AA8] dark:hover:bg-[#2B5B8A] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        Voir mes livres
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-[#2B5B8A]/10 dark:border-[#4A7AA8]/20">
                <Link
                  href="/"
                  className="group flex items-center justify-center gap-3 w-full py-4 px-6 bg-gray-100 dark:bg-slate-700 hover:bg-[#2B5B8A]/10 dark:hover:bg-[#4A7AA8]/20 rounded-2xl font-semibold text-[#2B5B8A] dark:text-[#4A7AA8] transition-all duration-300 hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
            <p>Cette page est accessible uniquement via le lien direct</p>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </>
  );
}
