export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-primary-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              POLITIQUE DE CONFIDENTIALITÉ
            </span>
          </h1>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Collecte des données</h2>
              <p>
                Nous collectons uniquement les données que vous nous fournissez volontairement via le formulaire de contact :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Nom de l'entreprise (optionnel)</li>
                <li>Ville (optionnel)</li>
                <li>Message</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Utilisation des données</h2>
              <p>
                Vos données sont utilisées uniquement pour :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Répondre à votre demande de contact</li>
                <li>Vous proposer un devis personnalisé</li>
                <li>Vous accompagner dans votre projet</li>
              </ul>
              <p className="mt-4">
                Nous ne vendons, ne louons ni ne partageons vos données avec des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Durée de conservation</h2>
              <p>
                Vos données sont conservées pendant 3 ans maximum après notre dernier échange, 
                puis supprimées automatiquement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Vos droits (RGPD)</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement</strong> : supprimer vos données</li>
                <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format exploitable</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez : <strong>contact@perrinehuon.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
              <p>
                Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. 
                Aucun cookie de tracking ou publicitaire n'est utilisé.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité :<br />
                <strong>contact@perrinehuon.com</strong>
              </p>
            </section>

            <p className="text-sm text-white/50 mt-12">
              Dernière mise à jour : Décembre 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


