import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const common = (await import(`../messages/${locale}/common.json`)).default;
  const tarifs = (await import(`../messages/${locale}/tarifs.json`)).default;
  const about = (await import(`../messages/${locale}/about.json`)).default;
  const biography = (await import(`../messages/${locale}/biography.json`)).default;
  const testimonialsPage = (await import(`../messages/${locale}/testimonials-page.json`)).default;
  const freelance = (await import(`../messages/${locale}/freelance.json`)).default;
  const wordpress = (await import(`../messages/${locale}/wordpress.json`)).default;
  const legal = (await import(`../messages/${locale}/legal.json`)).default;
  const privacy = (await import(`../messages/${locale}/privacy.json`)).default;
  const faqPage = (await import(`../messages/${locale}/faq-page.json`)).default;
  const portfolioPage = (await import(`../messages/${locale}/portfolio-page.json`)).default;
  const portfolioDetail = (await import(`../messages/${locale}/portfolio-detail.json`)).default;
  const servicesPage = (await import(`../messages/${locale}/services-page.json`)).default;
  const servicesPages = (await import(`../messages/${locale}/services-pages.json`)).default;
  const blog = (await import(`../messages/${locale}/blog.json`)).default;
  const blogDetail = (await import(`../messages/${locale}/blog-detail.json`)).default;

  const messages = {
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

  return {
    locale,
    messages,
  };
});
