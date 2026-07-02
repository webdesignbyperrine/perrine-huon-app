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

const siteUrl = 'https://www.perrinehuon.com';

const ogLocaleMap: Record<string, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const localeUrl = locale === 'fr' ? siteUrl : `${siteUrl}/${locale}`;
  const ogImageUrl = `${siteUrl}/images/og-image.jpg`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    authors: [{ name: 'Perrine Huon', url: siteUrl }],
    creator: 'Perrine Huon',
    publisher: 'Perrine Huon',
    applicationName: t('siteName'),
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: ogLocaleMap[locale] || 'fr_FR',
      alternateLocale: Object.values(ogLocaleMap).filter((l) => l !== (ogLocaleMap[locale] || 'fr_FR')),
      url: localeUrl,
      siteName: t('siteName'),
      title: t('title'),
      description: t('ogDescription'),
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@perrinehuon',
      creator: '@perrinehuon',
      title: t('title'),
      description: t('twitterDescription'),
      images: [
        {
          url: ogImageUrl,
          alt: t('ogImageAlt'),
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: localeUrl,
      languages: {
        'fr': siteUrl,
        'en': `${siteUrl}/en`,
        'es': `${siteUrl}/es`,
        'x-default': siteUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      // Add Google Search Console & Bing Webmaster verification codes here
      // when the user submits the property:
      // google: 'XXXXXXXXXXXX',
      // other: { 'msvalidate.01': 'XXXXXXXXXXXX' },
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
    const biography = (await import(`../../messages/${locale}/biography.json`)).default;
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
      biography,
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
