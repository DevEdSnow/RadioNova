export const APP_CONFIG = {
  /**
   * Información general de la aplicación.
   */
  app: {
    name: "RadioNova",
    version: "1.0.0",
    description:
      "Tu plataforma de radio, música y entretenimiento.",
    author: "Isai Reyes",
  },

  /**
   * Configuración de la API.
   */
  api: {
    baseUrl:
      process.env.EXPO_PUBLIC_API_URL ??
      "http://localhost:8080/api",

    timeout: 15000,

    endpoints: {
      stations: "/stations",
      radio: "/radio",
      programs: "/programs",
      news: "/news",
      auth: "/auth",
      users: "/users",
      ai: "/ai",
    },
  },

  /**
   * Configuración del reproductor.
   */
  player: {
    defaultVolume: 1,

    minVolume: 0,

    maxVolume: 1,

    reconnectAttempts: 3,

    reconnectDelay: 3000,

    nowPlayingInterval: 15000,

    streamTimeout: 15000,
  },

  /**
   * Configuración de las estaciones.
   */
  stations: {
    defaultLimit: 20,

    maxLimit: 100,

    searchMinLength: 2,

    refreshInterval: 60000,
  },

  /**
   * Configuración de programas.
   */
  programs: {
    defaultLimit: 20,

    refreshInterval: 60000,
  },

  /**
   * Configuración de noticias.
   */
  news: {
    defaultLimit: 10,

    maxLimit: 50,

    refreshInterval: 300000,
  },

  /**
   * Configuración del asistente de IA.
   */
  ai: {
    enabled: true,

    maxMessageLength: 1000,

    maxConversationMessages: 50,

    timeout: 30000,
  },

  /**
   * Configuración de favoritos.
   */
  favorites: {
    maxStations: 100,
  },

  /**
   * Configuración de caché.
   */
  cache: {
    stationsExpiration: 300000,

    programsExpiration: 300000,

    newsExpiration: 300000,

    nowPlayingExpiration: 30000,
  },

  /**
   * Configuración de paginación.
   */
  pagination: {
    defaultPage: 1,

    defaultPageSize: 20,

    maxPageSize: 100,
  },

  /**
   * Configuración de la interfaz.
   */
  ui: {
    animationDuration: 250,

    toastDuration: 3000,

    debounceDelay: 500,

    splashScreenDuration: 1500,
  },

  /**
   * Configuración de desarrollo.
   */
  development: {
    enableLogs: __DEV__,

    showApiErrors: __DEV__,

    showDebugInfo: __DEV__,
  },
} as const;

/**
 * Alias para acceder rápidamente
 * a la configuración de la API.
 */
export const API_CONFIG = APP_CONFIG.api;

/**
 * Configuración del reproductor.
 */
export const PLAYER_CONFIG = APP_CONFIG.player;

/**
 * Configuración de la IA.
 */
export const AI_CONFIG = APP_CONFIG.ai;

/**
 * Configuración de estaciones.
 */
export const STATION_CONFIG =
  APP_CONFIG.stations;

/**
 * Configuración de noticias.
 */
export const NEWS_CONFIG =
  APP_CONFIG.news;

/**
 * Configuración de programas.
 */
export const PROGRAM_CONFIG =
  APP_CONFIG.programs;