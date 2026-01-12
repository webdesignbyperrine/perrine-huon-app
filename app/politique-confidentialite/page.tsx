export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-primary">
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>

          <div className="space-y-8 text-primary/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Responsable de traitement</h2>
              <p>
                <strong className="text-primary">Perrine Huon</strong><br />
                Micro-entreprise<br />
                6 rue d'Arsonval<br />
                75015 Paris, France<br /><br />
                <a href="/#contact" className="text-accent hover:underline">Me contacter via le formulaire</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Données collectées</h2>
              <p>
                Je collecte uniquement les données que vous me fournissez volontairement via le formulaire de contact :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Nom de l'entreprise (optionnel)</li>
                <li>Message</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Base légale et finalités</h2>
              <p>
                Le traitement de vos données repose sur <strong className="text-primary">votre consentement</strong>, donné lors de l'envoi du formulaire de contact.
              </p>
              <p className="mt-4">
                Vos données sont utilisées uniquement pour :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Répondre à votre demande de contact</li>
                <li>Vous proposer un devis personnalisé</li>
                <li>Vous accompagner dans votre projet</li>
              </ul>
              <p className="mt-4">
                Je ne vends, ne loue ni ne partage vos données avec des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Destinataires des données</h2>
              <p>
                Seule Perrine Huon a accès à vos données personnelles. Aucun tiers n'y a accès, 
                sauf obligation légale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Hébergement et transferts</h2>
              <p>
                Vos données sont stockées de manière sécurisée chez :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong className="text-primary">Supabase Inc.</strong> (base de données) — Serveurs sécurisés</li>
                <li><strong className="text-primary">Vercel Inc.</strong> (hébergement) — États-Unis</li>
              </ul>
              <p className="mt-4">
                Ces prestataires sont conformes au RGPD et ont signé des clauses contractuelles types 
                approuvées par la Commission européenne pour encadrer les transferts de données hors UE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Sécurité des données</h2>
              <p>
                Je mets en œuvre des mesures techniques et organisationnelles pour protéger vos données :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Connexion sécurisée HTTPS</li>
                <li>Accès restreint aux données (moi seule)</li>
                <li>Hébergeurs certifiés et sécurisés</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Durée de conservation</h2>
              <p>
                Vos données sont conservées pendant <strong className="text-primary">3 ans maximum</strong> après notre dernier échange, 
                puis supprimées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Vos droits (RGPD)</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong className="text-primary">Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li><strong className="text-primary">Droit de rectification</strong> : corriger vos données inexactes</li>
                <li><strong className="text-primary">Droit à l'effacement</strong> : supprimer vos données</li>
                <li><strong className="text-primary">Droit à la portabilité</strong> : récupérer vos données dans un format exploitable</li>
                <li><strong className="text-primary">Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong className="text-primary">Droit de retirer votre consentement</strong> à tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, <a href="/#contact" className="text-accent hover:underline">contactez-moi via le formulaire</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Réclamation</h2>
              <p>
                Si vous estimez que le traitement de vos données ne respecte pas la réglementation, 
                vous pouvez introduire une réclamation auprès de la <strong className="text-primary">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) :
              </p>
              <p className="mt-4">
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  www.cnil.fr/fr/plaintes
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Cookies</h2>
              <p>
                Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. 
                Aucun cookie de tracking ou publicitaire n'est utilisé sans votre consentement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité :<br /><br />
                <a href="/#contact" className="text-accent hover:underline">Me contacter via le formulaire</a>
              </p>
            </section>

            <p className="text-sm text-primary/50 mt-12">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}





