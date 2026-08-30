import {
    Station,
    StationCategory,
    StreamFormat,
} from "@/types/station";

/**
 * Estaciones predeterminadas de RadioNova.
 */
export const DEFAULT_STATIONS: Station[] = [
  {
    id: 1,
    name: "RadioNova 98.7 FM",
    description:
      "La mejor música y entretenimiento durante todo el día.",
    slogan: "Tu música, tu momento.",
    logoUrl:
      "https://placehold.co/300x300/png?text=RadioNova",
    coverUrl:
      "https://placehold.co/1200x500/png?text=RadioNova",
    frequency: "98.7 FM",

    stream: {
      url: "https://example.com/stream",
      format: StreamFormat.MP3,
      bitrate: 128,
      codec: "MP3",
    },

    location: {
      city: "Oaxaca",
      state: "Oaxaca",
      country: "México",
    },

    category: StationCategory.MUSIC,
    language: "es",
    country: "MX",

    websiteUrl: "https://example.com",

    socialMedia: {
      facebook: "https://facebook.com/radionova",
      instagram: "https://instagram.com/radionova",
      youtube: "https://youtube.com/@radionova",
    },

    isActive: true,
    isLive: true,
    isFavorite: false,
    listeners: 1250,
  },

  {
    id: 2,
    name: "Nova Hits",
    description:
      "Los éxitos más populares del momento.",
    slogan: "Los hits que quieres escuchar.",
    logoUrl:
      "https://placehold.co/300x300/png?text=Nova+Hits",
    coverUrl:
      "https://placehold.co/1200x500/png?text=Nova+Hits",
    frequency: "101.5 FM",

    stream: {
      url: "https://example.com/novahits",
      format: StreamFormat.MP3,
      bitrate: 128,
      codec: "MP3",
    },

    location: {
      city: "Oaxaca",
      state: "Oaxaca",
      country: "México",
    },

    category: StationCategory.POP,
    language: "es",
    country: "MX",

    websiteUrl: "https://example.com",

    isActive: true,
    isLive: true,
    isFavorite: false,
    listeners: 980,
  },

  {
    id: 3,
    name: "Nova Rock",
    description:
      "Rock clásico, alternativo y contemporáneo.",
    slogan: "El poder del rock.",
    logoUrl:
      "https://placehold.co/300x300/png?text=Nova+Rock",
    coverUrl:
      "https://placehold.co/1200x500/png?text=Nova+Rock",
    frequency: "105.3 FM",

    stream: {
      url: "https://example.com/novarock",
      format: StreamFormat.MP3,
      bitrate: 128,
      codec: "MP3",
    },

    location: {
      city: "Oaxaca",
      state: "Oaxaca",
      country: "México",
    },

    category: StationCategory.ROCK,
    language: "es",
    country: "MX",

    websiteUrl: "https://example.com",

    isActive: true,
    isLive: true,
    isFavorite: false,
    listeners: 750,
  },

  {
    id: 4,
    name: "Nova Noticias",
    description:
      "Noticias, información y actualidad.",
    slogan: "La información al momento.",
    logoUrl:
      "https://placehold.co/300x300/png?text=Noticias",
    coverUrl:
      "https://placehold.co/1200x500/png?text=Nova+Noticias",
    frequency: "90.1 FM",

    stream: {
      url: "https://example.com/noticias",
      format: StreamFormat.AAC,
      bitrate: 128,
      codec: "AAC",
    },

    location: {
      city: "Oaxaca",
      state: "Oaxaca",
      country: "México",
    },

    category: StationCategory.NEWS,
    language: "es",
    country: "MX",

    websiteUrl: "https://example.com",

    isActive: true,
    isLive: true,
    isFavorite: false,
    listeners: 540,
  },

  {
    id: 5,
    name: "Nova Classic",
    description:
      "Los grandes clásicos de todos los tiempos.",
    slogan: "Los clásicos nunca mueren.",
    logoUrl:
      "https://placehold.co/300x300/png?text=Classic",
    coverUrl:
      "https://placehold.co/1200x500/png?text=Nova+Classic",
    frequency: "92.9 FM",

    stream: {
      url: "https://example.com/classic",
      format: StreamFormat.MP3,
      bitrate: 128,
      codec: "MP3",
    },

    location: {
      city: "Oaxaca",
      state: "Oaxaca",
      country: "México",
    },

    category: StationCategory.VARIETY,
    language: "es",
    country: "MX",

    websiteUrl: "https://example.com",

    isActive: true,
    isLive: true,
    isFavorite: false,
    listeners: 620,
  },
];

/**
 * Estación predeterminada.
 */
export const DEFAULT_STATION =
  DEFAULT_STATIONS[0];

/**
 * Número de estaciones que se muestran
 * inicialmente.
 */
export const DEFAULT_STATIONS_LIMIT = 20;

/**
 * Categorías disponibles para la interfaz.
 */
export const STATION_CATEGORIES = [
  {
    id: "all",
    name: "Todas",
    category: undefined,
  },

  {
    id: "music",
    name: "Música",
    category: StationCategory.MUSIC,
  },

  {
    id: "pop",
    name: "Pop",
    category: StationCategory.POP,
  },

  {
    id: "rock",
    name: "Rock",
    category: StationCategory.ROCK,
  },

  {
    id: "electronic",
    name: "Electrónica",
    category: StationCategory.ELECTRONIC,
  },

  {
    id: "news",
    name: "Noticias",
    category: StationCategory.NEWS,
  },

  {
    id: "sports",
    name: "Deportes",
    category: StationCategory.SPORTS,
  },

  {
    id: "regional",
    name: "Regional",
    category: StationCategory.REGIONAL,
  },

  {
    id: "culture",
    name: "Cultura",
    category: StationCategory.CULTURE,
  },

  {
    id: "talk",
    name: "Talk",
    category: StationCategory.TALK,
  },

  {
    id: "religious",
    name: "Religiosa",
    category: StationCategory.RELIGIOUS,
  },

  {
    id: "variety",
    name: "Variedades",
    category: StationCategory.VARIETY,
  },
] as const;