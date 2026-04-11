import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal' });

  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-primary">
            {t('title')}
          </h1>

          <div className="space-y-8 text-primary/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('publisher.title')}</h2>
              <p>
                <strong className="text-primary">Perrine Huon</strong><br />
                {t('publisher.business_type')}<br />
                6 rue d'Arsonval<br />
                75015 Paris, France<br />
                <br />
                SIREN : 789 453 115<br />
                SIRET : 789 453 115 00010<br />
                RCS Paris B 789 453 115<br />
                <br />
                {t('publisher.activity')}<br />
                {t('publisher.start_date')}<br />
                <br />
                <Link href="/#contact" className="text-accent hover:underline">{t('publisher.contact_link')}</Link>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('insurance.title')}</h2>
              <p>
                <strong className="text-primary">Perrine Huon</strong> {t('insurance.text')}<br />
                {t('insurance.policy_number')} <strong className="text-primary">RCPH278564362</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('mediation.title')}</h2>
              <p>
                {t('mediation.intro')}<br /><br />
                <strong className="text-primary">Centre de Médiation et d'Arbitrage de Paris (CMAP)</strong><br />
                39 avenue Franklin D. Roosevelt<br />
                75008 Paris<br />
                <a href="https://www.cmap.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cmap.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('ip_rights.title')}</h2>
              <p>
                {t('ip_rights.text')}<br /><br />
                {t('ip_rights.text2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('hosting.title')}</h2>
              <p>
                {t('hosting.intro')} <strong className="text-primary">Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis<br />
                {t('hosting.phone')} +1 559 288 7060<br />
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vercel.com</a>
              </p>
              <p className="mt-4">
                {t('hosting.domain_text')} <strong className="text-primary">IONOS SE</strong><br />
                Elgendorfer Str. 57<br />
                56410 Montabaur, Allemagne<br />
                <a href="https://www.ionos.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.ionos.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('data_protection.title')}</h2>
              <p>
                {t('data_protection.intro')}<br /><br />
                {t('data_protection.controller')}<br />
                {t('data_protection.usage')}<br /><br />
                {t('data_protection.exercise_rights')} <Link href="/#contact" className="text-accent hover:underline">{t('data_protection.contact_link')}</Link>.<br /><br />
                {t('data_protection.cnil')} 
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline"> www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('cookies.title')}</h2>
              <p>
                {t('cookies.text')}<br /><br />
                {t('cookies.text2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('liability.title')}</h2>
              <p>
                {t('liability.paragraph1')}<br /><br />
                {t('liability.paragraph2')}<br /><br />
                {t('liability.paragraph3')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">{t('jurisdiction.title')}</h2>
              <p>
                {t('jurisdiction.text')}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}





