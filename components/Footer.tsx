import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-800 border-t border-primary-400/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Perrine Huon</h3>
            <p className="text-white/70 mb-4">
              Création de sites et applications web avec SEO géolocalisé ultra performant.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/perrinehuon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portfolio" className="text-white/70 hover:text-secondary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SEO Local */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">SEO Géolocalisé</h3>
            <p className="text-white/70 mb-2">
              Expertise en référencement local pour :
            </p>
            <ul className="text-white/60 text-sm space-y-1">
              <li>• Paris et Île-de-France</li>
              <li>• Lyon et région Rhône-Alpes</li>
              <li>• Lille et Hauts-de-France</li>
              <li>• Bordeaux et Nouvelle-Aquitaine</li>
              <li>• Toute la France</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-400/20 pt-8 text-center text-white/50 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p>© {currentYear} Perrine Huon. Tous droits réservés.</p>
            <div className="flex space-x-4">
              <Link href="/mentions-legales" className="hover:text-secondary transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-secondary transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



