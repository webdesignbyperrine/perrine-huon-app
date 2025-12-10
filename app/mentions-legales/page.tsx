export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              MENTIONS LÉGALES
            </span>
          </h1>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Éditeur du site</h2>
              <p>
                <strong>Perrine Huon</strong><br />
                Développeuse Web & Designer<br />
                Email : contact@perrinehuon.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Hébergement</h2>
              <p>
                Ce site est hébergé par <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, design) est la propriété exclusive de Perrine Huon, 
                sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Protection des données</h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. 
                Pour exercer ces droits, contactez : contact@perrinehuon.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

