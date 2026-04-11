export type Profile = {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type ImageCropSettings = {
  /** Position X en % (0-100) */
  x: number;
  /** Position Y en % (0-100) */
  y: number;
  /** Largeur en % (0-100) */
  width: number;
  /** Hauteur en % (0-100) */
  height: number;
};

/** Correspond aux colonnes réelles de la table `projects` en base de données. */
export type Project = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  /** Champ utilisé également pour le type de projet (ex. "Site vitrine"). */
  location: string | null;
  year: number | null;
  short_description: string | null;
  long_description: string | null;
  featured_image: string | null;
  image_crop: ImageCropSettings | null;
  published: boolean;
  created_at: string;
};

/** Correspond aux colonnes réelles de la table `blog_posts` en base de données. */
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_city: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Correspond aux colonnes réelles de la table `faqs` en base de données. */
export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_published: boolean;
};

/** Correspond aux colonnes réelles de la table `contact_messages`. */
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  city: string | null;
  subject: string | null;
  message: string;
  source: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
};

/** Correspond aux colonnes réelles de la table `media_assets`. */
export type MediaAsset = {
  id: string;
  file_name: string;
  file_url: string;
  file_path: string;
  file_type: string;
  file_size: number;
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

/** Correspond aux colonnes réelles de la table `testimonials`. */
export type Testimonial = {
  id: string;
  name: string;
  profession: string | null;
  company: string | null;
  city: string | null;
  content: string;
  rating: number;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};
