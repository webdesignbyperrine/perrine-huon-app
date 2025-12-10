export type Profile = {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  main_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_city: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_city: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_published: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  city: string | null;
  message: string;
  source: string;
  status: 'new' | 'in_progress' | 'closed';
  created_at: string;
};

export type MediaAsset = {
  id: string;
  type: 'image' | 'video' | 'youtube' | 'url';
  url: string;
  thumbnail_url: string | null;
  title: string | null;
  alt_text: string | null;
  created_at: string;
};

export type ProjectMedia = {
  id: string;
  project_id: string;
  media_id: string;
  sort_order: number;
  is_main: boolean;
};

export type PostMedia = {
  id: string;
  post_id: string;
  media_id: string;
  sort_order: number;
};

export type ProjectWithMedia = Project & {
  project_media?: (ProjectMedia & {
    media: MediaAsset;
  })[];
};

export type BlogPostWithMedia = BlogPost & {
  post_media?: (PostMedia & {
    media: MediaAsset;
  })[];
};


