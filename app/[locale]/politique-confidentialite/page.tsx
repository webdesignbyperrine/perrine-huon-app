import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function PolitiqueConfidentialite({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-primary">
            {t('title')}
          </h1>

          <div className="space-y-8 text-primary/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('data_controller.title')}</h2>
              <p>
                <strong className="text-primary">Perrine Huon</strong><br />
                {t('data_controller.business_type')}<br />
                6 rue d'Arsonval<br />
                75015 Paris, France<br /><br />
                <Link href="/#contact" className="text-accent hover:underline">{t('data_controller.contact_link')}</Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('data_collected.title')}</h2>
              <p>
                {t('data_collected.intro')}
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>{t('data_collected.items.name')}</li>
                <li>{t('data_collected.items.email')}</li>
                <li>{t('data_collected.items.company')}</li>
                <li>{t('data_collected.items.message')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('legal_basis.title')}</h2>
              <p>
                {t('legal_basis.consent')} <strong className="text-primary">{t('legal_basis.consent_bold')}</strong>{t('legal_basis.consent_end')}
              </p>
              <p className="mt-4">
                {t('legal_basis.usage_intro')}
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>{t('legal_basis.purposes.reply')}</li>
                <li>{t('legal_basis.purposes.quote')}</li>
                <li>{t('legal_basis.purposes.support')}</li>
              </ul>
              <p className="mt-4">
                {t('legal_basis.no_sharing')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('recipients.title')}</h2>
              <p>
                {t('recipients.text')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('hosting.title')}</h2>
              <p>
                {t('hosting.intro')}
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong className="text-primary">Supabase Inc.</strong> {t('hosting.supabase')}</li>
                <li><strong className="text-primary">Vercel Inc.</strong> {t('hosting.vercel')}</li>
              </ul>
              <p className="mt-4">
                {t('hosting.gdpr_compliance')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('security.title')}</h2>
              <p>
                {t('security.intro')}
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>{t('security.measures.https')}</li>
                <li>{t('security.measures.restricted')}</li>
                <li>{t('security.measures.certified')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('retention.title')}</h2>
              <p>
                {t('retention.text')} <strong className="text-primary">{t('retention.duration')}</strong> {t('retention.after')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('rights.title')}</h2>
              <p>
                {t('rights.intro')}
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong className="text-primary">{t('rights.list.access')}</strong>{t('rights.list.access_desc')}</li>
                <li><strong className="text-primary">{t('rights.list.rectification')}</strong>{t('rights.list.rectification_desc')}</li>
                <li><strong className="text-primary">{t('rights.list.erasure')}</strong>{t('rights.list.erasure_desc')}</li>
                <li><strong className="text-primary">{t('rights.list.portability')}</strong>{t('rights.list.portability_desc')}</li>
                <li><strong className="text-primary">{t('rights.list.objection')}</strong>{t('rights.list.objection_desc')}</li>
                <li><strong className="text-primary">{t('rights.list.withdraw')}</strong> {t('rights.list.withdraw_desc')}</li>
              </ul>
              <p className="mt-4">
                {t('rights.exercise')} <Link href="/#contact" className="text-accent hover:underline">{t('rights.contact_link')}</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('complaint.title')}</h2>
              <p>
                {t('complaint.text')} <strong className="text-primary">{t('complaint.cnil')}</strong> {t('complaint.cnil_full')}
              </p>
              <p className="mt-4">
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  www.cnil.fr/fr/plaintes
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('cookies.title')}</h2>
              <p>
                {t('cookies.text')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('contact.title')}</h2>
              <p>
                {t('contact.text')}<br /><br />
                <Link href="/#contact" className="text-accent hover:underline">{t('contact.link')}</Link>
              </p>
            </section>

            <p className="text-sm text-primary/50 mt-12">
              {t('last_update')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}





