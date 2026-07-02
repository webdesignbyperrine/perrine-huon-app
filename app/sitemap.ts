import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getAllServiceSlugs } from '@/lib/services-data'
import { getAllLocationSlugs } from '@/lib/locations-data'
import { getAllProfessionSlugs } from '@/lib/professions-data'
import { STATIC_BLOG_POSTS } from '@/lib/static-blog-posts'
import { STATIC_PORTFOLIO_PROJECTS } from '@/lib/static-portfolio'
import { locales } from '@/i18n/config'

function multilingualUrl(baseUrl: string, path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = locale === 'fr' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
  }
  return {
    url: `${baseUrl}${path}`,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.perrinehuon.com'
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      ...multilingualUrl(baseUrl, ''),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      ...multilingualUrl(baseUrl, '/portfolio'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      ...multilingualUrl(baseUrl, '/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      ...multilingualUrl(baseUrl, '/faq'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      ...multilingualUrl(baseUrl, '/tarifs-creation-site-web'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      ...multilingualUrl(baseUrl, '/a-propos-perrine-huon-developpeuse-web'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      ...multilingualUrl(baseUrl, '/avis-clients-temoignages'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      ...multilingualUrl(baseUrl, '/freelance-vs-agence-web'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      ...multilingualUrl(baseUrl, '/pourquoi-pas-wordpress'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      ...multilingualUrl(baseUrl, '/mentions-legales'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      ...multilingualUrl(baseUrl, '/politique-confidentialite'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    ...multilingualUrl(baseUrl, `/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const locationPages: MetadataRoute.Sitemap = getAllLocationSlugs().map((slug) => ({
    ...multilingualUrl(baseUrl, `/creation-site-internet-${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const professionPages: MetadataRoute.Sitemap = getAllProfessionSlugs().map((slug) => ({
    ...multilingualUrl(baseUrl, `/site-internet-${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const supabase = await createClient()
  
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, updated_at')
    .eq('published', true)
  
  const supabaseProjectSlugs = new Set((projects || []).map((p) => p.slug))
  const projectPages: MetadataRoute.Sitemap = (projects || []).map((project) => ({
    ...multilingualUrl(baseUrl, `/portfolio/${project.slug}`),
    lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const staticProjectPages: MetadataRoute.Sitemap = STATIC_PORTFOLIO_PROJECTS
    .filter((p) => !supabaseProjectSlugs.has(p.slug))
    .map((p) => ({
      ...multilingualUrl(baseUrl, `/portfolio/${p.slug}`),
      lastModified: new Date(p.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))

  // Blog pages with multilingual URLs
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, published_at')
    .eq('published', true)
  
  const supabaseBlogSlugs = new Set((posts || []).map((p) => p.slug))
  const blogPages: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    ...multilingualUrl(baseUrl, `/blog/${post.slug}`),
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const staticBlogPages: MetadataRoute.Sitemap = STATIC_BLOG_POSTS
    .filter((p) => !supabaseBlogSlugs.has(p.slug))
    .map((p) => ({
      ...multilingualUrl(baseUrl, `/blog/${p.slug}`),
      lastModified: new Date(p.updated_at || p.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...professionPages,
    ...projectPages,
    ...staticProjectPages,
    ...blogPages,
    ...staticBlogPages,
  ]
}
