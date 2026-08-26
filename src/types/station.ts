export interface Station {
  id: number;
  name: string;
  description?: string;
  frequency?: string;
  slogan?: string;

  logoUrl?: string;
  coverUrl?: string;

  stream: RadioStream;

  location?: StationLocation;

  category: StationCategory;
  language: string;
  country: string;

  websiteUrl?: string;

  socialMedia?: SocialMedia;

  isActive: boolean;
  isLive: boolean;
  isFavorite: boolean;

  listeners?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface RadioStream {
  url: string;
  format: StreamFormat;
  bitrate?: number;
  codec?: string;
}

export enum StreamFormat {
  MP3 = "MP3",
  AAC = "AAC",
  OGG = "OGG",
  HLS = "HLS",
}

export interface StationLocation {
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export enum StationCategory {
  MUSIC = "MUSIC",
  NEWS = "NEWS",
  SPORTS = "SPORTS",
  ROCK = "ROCK",
  POP = "POP",
  ELECTRONIC = "ELECTRONIC",
  REGIONAL = "REGIONAL",
  CULTURE = "CULTURE",
  TALK = "TALK",
  RELIGIOUS = "RELIGIOUS",
  VARIETY = "VARIETY",
}

export interface StationResponse {
  stations: Station[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StationFilters {
  search?: string;
  category?: StationCategory;
  country?: string;
  language?: string;
  city?: string;
  isLive?: boolean;
  page?: number;
  limit?: number;
}