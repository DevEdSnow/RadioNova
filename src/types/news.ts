export interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  category: NewsCategory;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  source?: string;
  sourceUrl?: string;
  featured: boolean;
  tags?: string[];
}

export enum NewsCategory {
  GENERAL = "GENERAL",
  MUSIC = "MUSIC",
  ENTERTAINMENT = "ENTERTAINMENT",
  TECHNOLOGY = "TECHNOLOGY",
  SPORTS = "SPORTS",
  CULTURE = "CULTURE",
  LOCAL = "LOCAL",
  NATIONAL = "NATIONAL",
  INTERNATIONAL = "INTERNATIONAL",
}

export interface NewsResponse {
  news: News[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NewsFilters {
  category?: NewsCategory;
  search?: string;
  page?: number;
  limit?: number;
}