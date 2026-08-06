export interface MenuArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;

  featuredImage?: {
    image: any;
    alt?: string;
  };

  author?: {
    name: string;
  };
}

export interface MenuCategory {
  _id: string;
  title: string;
  slug: string;
  articles: MenuArticle[];
}