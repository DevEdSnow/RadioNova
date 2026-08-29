import {
    Station,
    StationCategory,
} from "@/types/station";

/**
 * Estaciones disponibles por defecto.
 *
 * Estas estaciones sirven como datos iniciales
 * mientras conectamos RadioNova con el backend.
 */
export const DEFAULT_STATIONS: Station[] = [
  {
    id: 1,
    name: "RadioNova 98.7 FM",
    description:
      "La mejor música y entretenimiento durante todo el día.",
    logo: "https://placehold.co/300x300/png?text=RadioNova",
    stream: {
      url: "https://example.com/stream",
      format: "audio/mpeg",
      bitrate: 128,
    },
    category: StationCategory.MUSIC,
    genre: "Pop",
    language: "es",
    country: "MX",
    city: "Oaxaca",
    frequency: "98.7 FM",
    isActive: true,
    isLive: true,
    isFavorite: false,
  },

  {
    id: 2,
    name: "Nova Hits",
    description:
      "Los éxitos más populares del momento.",
    logo: "https://placehold.co/300x300/png?text=Nova+Hits",
    stream: {
      url: "https://example.com/novahits",
      format: "audio/mpeg",
      bitrate: 128,
    },
    category: StationCategory.MUSIC,
    genre: "Hits",
    language: "es",
    country: "MX",
    city: "Oaxaca",
    frequency: "101.5 FM",
    isActive: true,
    isLive: true,
    isFavorite: false,
  },

  {
    id: 3,
    name: "Nova Rock",
    description:
      "Rock clásico, alternativo y contemporáneo.",
    logo: "https://placehold.co/300x300/png?text=Nova+Rock",
    stream: {
      url: "https://example.com/novarock",
      format: "audio/mpeg",
      bitrate: 128,
    },
    category: StationCategory.ROCK,
    genre: "Rock",
    language: "es",
    country: "MX",
    city: "Oaxaca",
    frequency: "105.3 FM",
    isActive: true,
    isLive: true,
    isFavorite: false,
  },

  {
    id: 4,
    name: "Nova Noticias",
    description:
      "Noticias, información y actualidad.",
    logo: "https://placehold.co/300x300/png?text=Noticias",
    stream: {
      url: "https://example.com/noticias",
      format: "audio/mpeg",
      bitrate: 128,
    },
    category: StationCategory.NEWS,
    genre: "Noticias",
    language: "es",
    country: "MX",
    city: "Oaxaca",
    frequency: "90.1 FM",
    isActive: true,
    isLive: true,
    isFavorite: false,
  },

  {
    id: 5,
    name: "Nova Classic",
    description:
      "Los grandes clásicos de todos los tiempos.",
    logo: "https://placehold.co/300x300/png?text=Classic",
    stream: {
      url: "https://example.com/classic",
      format: "audio/mpeg",
      bitrate: 128,
    },
    category: StationCategory.CLASSIC,
    genre: "Clásicos",
    language: "es",
    country: "MX",
    city: "Oaxaca",
    frequency: "92.9 FM",
    isActive: true,
    isLive: true,
    isFavorite: false,
  },
];

/**
 * Estación recomendada para mostrar
 * inicialmente en la aplicación.
 */
export const DEFAULT_STATION =
  DEFAULT_STATIONS[0];

/**
 * Número máximo de estaciones
 * mostradas inicialmente.
 */
export const DEFAULT_STATIONS_LIMIT = 20;

/**
 * Categorías principales que aparecen
 * en la interfaz.
 */
export const STATION_CATEGORIES = [
  {
    id: "all",
    name: "Todas",
    category: null,
  },
  {
    id: "music",
    name: "Música",
    category: StationCategory.MUSIC,
  },
  {
    id: "rock",
    name: "Rock",
    category: StationCategory.ROCK,
  },
  {
    id: "pop",
    name: "Pop",
    category: StationCategory.POP,
  },
  {
    id: "news",
    name: "Noticias",
    category: StationCategory.NEWS,
  },
  {
    id: "classic",
    name: "Clásicos",
    category: StationCategory.CLASSIC,
  },
] as const;