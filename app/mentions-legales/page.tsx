import Link from 'next/link';

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
                Entrepreneur individuel (EI)<br />
                6 rue d'Arsonval<br />
                75015 Paris, France<br />
                <br />
                SIREN : 789 453 115<br />
                SIRET : 789 453 115 00010<br />
                RCS Paris B 789 453 115<br />
                <br />
                Activité : Conception, développement et maintenance de sites internet<br />
                Date de début d'activité : 19/01/2026<br />
                <br />
                <Link href="/#contact" className="text-accent hover:underline">Me contacter via le formulaire</Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Responsabilité civile professionnelle</h2>
              <p>
                <strong className="text-primary">Perrine Huon</strong> est couverte par une assurance Responsabilité Civile Professionnelle.<br />
                Numéro de police : <strong className="text-primary">RCPH278564362</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Médiateur de la consommation</h2>
              <p>
                Conformément à l'article L.616-1 du Code de la consommation, en cas de litige, vous pouvez recourir gratuitement à un médiateur de la consommation :<br /><br />
                <strong className="text-primary">Centre de Médiation et d'Arbitrage de Paris (CMAP)</strong><br />
                39 avenue Franklin D. Roosevelt<br />
                75008 Paris<br />
                <a href="https://www.cmap.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cmap.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Droits de propriété intellectuelle</h2>
              <p>
                Conformément à l'article L.111-1 du Code de la propriété intellectuelle, Perrine Huon est titulaire des droits de propriété intellectuelle et détient les droits d'usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.<br /><br />
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Perrine Huon.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Hébergement</h2>
              <p>
                Ce site est hébergé par <strong className="text-primary">Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis<br />
                Téléphone : +1 559 288 7060<br />
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vercel.com</a>
              </p>
              <p className="mt-4">
                Nom de domaine enregistré chez <strong className="text-primary">IONOS SE</strong><br />
                Elgendorfer Str. 57<br />
                56410 Montabaur, Allemagne<br />
                <a href="https://www.ionos.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.ionos.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Protection des données personnelles</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, 
                vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles, 
                ainsi qu'un droit d'opposition et de limitation du traitement.<br /><br />
                Responsable du traitement des données : Perrine Huon<br />
                Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et ne sont jamais transmises à des tiers.<br /><br />
                Pour exercer ces droits ou pour toute question sur le traitement de vos données, <Link href="/#contact" className="text-accent hover:underline">contactez-moi via le formulaire</Link>.<br /><br />
                Vous pouvez également introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) : 
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline"> www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Cookies</h2>
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. 
                Aucun cookie publicitaire ou de tracking tiers n'est utilisé sans votre consentement explicite.<br /><br />
                Conformément à l'article 82 de la loi Informatique et Libertés et à la directive 2009/136/CE, 
                vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Limitations de responsabilité</h2>
              <p>
                Perrine Huon ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, 
                lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, 
                soit de l'apparition d'un bug ou d'une incompatibilité.<br /><br />
                Perrine Huon ne pourra également être tenue responsable des dommages indirects (tels par exemple qu'une perte de marché 
                ou perte d'une chance) consécutifs à l'utilisation du site.<br /><br />
                Des espaces interactifs (possibilité de poser des questions dans l'espace contact) sont à la disposition des utilisateurs. 
                Perrine Huon se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace 
                qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Droit applicable et juridiction compétente</h2>
              <p>
                Tout litige en relation avec l'utilisation du site est soumis au droit français. 
                Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}





