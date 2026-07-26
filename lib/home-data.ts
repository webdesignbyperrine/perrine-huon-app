import { createStaticClient } from '@/lib/supabase/server';

export type HomepageTestimonial = {
  id: string;
  name: string;
  profession: string | null;
  profession_en?: string | null;
  profession_es?: string | null;
  company: string | null;
  city: string | null;
  content: string;
  content_en?: string | null;
  content_es?: string | null;
  rating: number;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};

export type HomepageProject = {
  id: string;
  title: string;
  title_en?: string | null;
  title_es?: string | null;
  slug: string;
  short_description: string | null;
  short_description_en?: string | null;
  short_description_es?: string | null;
  featured_image: string | null;
  published: boolean;
  sort_order?: number | null;
  created_at?: string | null;
};

export type HomepageFaq = {
  id: string;
  question: string;
  question_en?: string | null;
  question_es?: string | null;
  answer: string;
  answer_en?: string | null;
  answer_es?: string | null;
  category: string | null;
  category_en?: string | null;
  category_es?: string | null;
  sort_order: number;
  is_published: boolean;
};

export type HomepageBlogPost = {
  id: string;
  title: string;
  title_en?: string | null;
  title_es?: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_en?: string | null;
  excerpt_es?: string | null;
  featured_image: string | null;
  cover_image_url?: string | null;
  published: boolean;
  published_at: string | null;
};

export type HomepageData = {
  testimonials: HomepageTestimonial[];
  projects: HomepageProject[];
  faqs: HomepageFaq[];
  posts: HomepageBlogPost[];
};

export async function getHomepageData(): Promise<HomepageData> {
  const supabase = createStaticClient();

  const [testimonialsResult, projectsResult, faqsResult, postsResult] = await Promise.all([
    supabase
      .from('testimonials')
      .select('id,name,profession,profession_en,profession_es,company,city,content,content_en,content_es,rating,is_published,sort_order,created_at')
      .eq('is_published', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('projects')
      .select('id,title,title_en,title_es,slug,short_description,short_description_en,short_description_es,featured_image,published,sort_order,created_at')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(4),
    supabase
      .from('faqs')
      .select('id,question,question_en,question_es,answer,answer_en,answer_es,category,category_en,category_es,sort_order,is_published')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .limit(5),
    supabase
      .from('blog_posts')
      .select('id,title,title_en,title_es,slug,excerpt,excerpt_en,excerpt_es,featured_image,cover_image_url,published,published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(6),
  ]);

  return {
    testimonials: (testimonialsResult.data ?? []) as HomepageTestimonial[],
    projects: (projectsResult.data ?? []) as HomepageProject[],
    faqs: (faqsResult.data ?? []) as HomepageFaq[],
    posts: (postsResult.data ?? []) as HomepageBlogPost[],
  };
}
