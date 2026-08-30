import {
  Colors,
  ColorTheme
} from "./colors";

/**
 * Temas disponibles en RadioNova.
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export type ThemeMode =
  (typeof THEMES)[keyof typeof THEMES];

/**
 * Obtiene los colores correspondientes al tema.
 *
 * Para "system", se debe indicar si el dispositivo
 * está utilizando modo oscuro.
 */
export const getThemeColors = (
  theme: ThemeMode,
  systemIsDark = false
): ColorTheme => {
  if (theme === THEMES.SYSTEM) {
    return systemIsDark
      ? Colors.dark
      : Colors.light;
  }

  return Colors[theme];
};

/**
 * Configuración visual de cada tema.
 */
export const THEME_CONFIG = {
  light: {
    name: "light",
    label: "Claro",
    icon: "☀️",
  },

  dark: {
    name: "dark",
    label: "Oscuro",
    icon: "🌙",
  },

  system: {
    name: "system",
    label: "Sistema",
    icon: "📱",
  },
} as const;

/**
 * Tema utilizado inicialmente.
 */
export const DEFAULT_THEME: ThemeMode =
  THEMES.SYSTEM;

/**
 * Obtiene la configuración visual
 * de un tema determinado.
 */
export const getThemeConfig = (
  theme: ThemeMode
) => {
  return THEME_CONFIG[theme];
};

/**
 * Verifica si un tema es válido.
 */
export const isValidTheme = (
  theme: string
): theme is ThemeMode => {
  return (
    theme === THEMES.LIGHT ||
    theme === THEMES.DARK ||
    theme === THEMES.SYSTEM
  );
};