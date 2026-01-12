export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-primary">
            MENTIONS LÉGALES
          </h1>

          <div className="space-y-8 text-primary/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Éditeur du site</h2>
              <p>
                <strong className="text-primary">Perrine Huon</strong><br />
                Micro-entreprise<br />
                6 rue d'Arsonval<br />
                75015 Paris, France<br />
                SIRET : En cours d'immatriculation<br />
                <br />
                <a href="/#contact" className="text-accent hover:underline">Me contacter via le formulaire</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Directeur de publication</h2>
              <p>
                <strong className="text-primary">Perrine Huon</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Hébergement</h2>
              <p>
                Ce site est hébergé par <strong className="text-primary">Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis<br />
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vercel.com</a>
              </p>
              <p className="mt-4">
                Nom de domaine enregistré chez <strong className="text-primary">IONOS SE</strong><br />
                Elgendorfer Str. 57<br />
                56410 Montabaur, Allemagne
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, design) est la propriété exclusive de Perrine Huon, 
                sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Protection des données personnelles</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles, 
                ainsi qu'un droit d'opposition et de limitation du traitement.<br /><br />
                Pour exercer ces droits, <a href="/#contact" className="text-accent hover:underline">contactez-moi via le formulaire</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Cookies</h2>
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. 
                Aucun cookie publicitaire ou de tracking tiers n'est utilisé sans votre consentement explicite.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}





