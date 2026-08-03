export interface Category {
  title: string;
  slug: string;
}

export interface Author {
  name: string;
  slug: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children?: {
    _key: string;
    _type: string;
    text: string;
  }[];
}

export interface Article {
  _id: string;

  title: string;

  slug: string;

  excerpt: string;

  body?: PortableTextBlock[];

  publishedAt: string;

  featured: boolean;

  breaking: boolean;

  featuredImage?: {
    image: any;
    caption?: string;
    photoCredit?: string;
    alt?: string;
  };

  author: Author;

  categories: Category[];
}