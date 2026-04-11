import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import LayoutShell from '@/components/LayoutShell';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const siteUrl = 'https://perrinehuon.com';

const ogLocaleMap: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      locale: ogLocaleMap[locale] || 'fr_FR',
      url: siteUrl,
      siteName: t('siteName'),
      title: t('title'),
      description: t('ogDescription'),
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('twitterDescription'),
      images: ['/images/og-image.jpg'],
      creator: '@perrinehuon',
    },
    alternates: {
      canonical: locale === 'fr' ? siteUrl : `${siteUrl}/${locale}`,
      languages: {
        'fr': siteUrl,
        'en': `${siteUrl}/en`,
        'es': `${siteUrl}/es`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Charger TOUS les namespaces pour les composants client
  let messages;
  try {
    const common = (await import(`../../messages/${locale}/common.json`)).default;
    const tarifs = (await import(`../../messages/${locale}/tarifs.json`)).default;
    const about = (await import(`../../messages/${locale}/about.json`)).default;
    const testimonialsPage = (await import(`../../messages/${locale}/testimonials-page.json`)).default;
    const freelance = (await import(`../../messages/${locale}/freelance.json`)).default;
    const wordpress = (await import(`../../messages/${locale}/wordpress.json`)).default;
    const legal = (await import(`../../messages/${locale}/legal.json`)).default;
    const privacy = (await import(`../../messages/${locale}/privacy.json`)).default;
    const faqPage = (await import(`../../messages/${locale}/faq-page.json`)).default;
    const portfolioPage = (await import(`../../messages/${locale}/portfolio-page.json`)).default;
    const portfolioDetail = (await import(`../../messages/${locale}/portfolio-detail.json`)).default;
    const servicesPage = (await import(`../../messages/${locale}/services-page.json`)).default;
    const servicesPages = (await import(`../../messages/${locale}/services-pages.json`)).default;
    const blog = (await import(`../../messages/${locale}/blog.json`)).default;
    const blogDetail = (await import(`../../messages/${locale}/blog-detail.json`)).default;

    messages = {
      ...common,
      tarifs,
      about: { ...common.about, ...about },
      'testimonials-page': testimonialsPage,
      freelance,
      wordpress,
      legal,
      privacy,
      'faq-page': faqPage,
      'portfolio-page': portfolioPage,
      'portfolio-detail': portfolioDetail,
      'services-page': servicesPage,
      'services-pages': servicesPages,
      blog,
      'blog-detail': blogDetail,
    };
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LayoutShell>
        {children}
      </LayoutShell>
    </NextIntlClientProvider>
  );
}
