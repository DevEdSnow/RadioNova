export const Colors = {
  light: {
    // Colores principales
    primary: "#6C5CE7",
    primaryLight: "#8B7FF0",
    primaryDark: "#5142C4",

    secondary: "#00B894",
    secondaryLight: "#26D0AA",
    secondaryDark: "#008F73",

    accent: "#FF7675",

    // Fondo
    background: "#FFFFFF",
    backgroundSecondary: "#F7F7FB",
    backgroundTertiary: "#EEEEF5",

    // Superficies
    surface: "#FFFFFF",
    surfaceSecondary: "#F8F8FC",
    card: "#FFFFFF",

    // Texto
    text: "#1E1E2D",
    textSecondary: "#6C6C7A",
    textTertiary: "#9999A8",
    textInverse: "#FFFFFF",

    // Bordes
    border: "#E5E5EC",
    borderLight: "#F0F0F5",

    // Estados
    success: "#00B894",
    warning: "#FDCB6E",
    error: "#D63031",
    info: "#0984E3",

    // Radio
    live: "#FF4757",
    playing: "#6C5CE7",
    favorite: "#FF4757",

    // Componentes
    input: "#F3F3F8",
    overlay: "rgba(0, 0, 0, 0.45)",
    shadow: "#000000",

    // Reproductor
    playerBackground: "#FFFFFF",
    playerControls: "#6C5CE7",
    playerProgress: "#6C5CE7",
    playerProgressBackground: "#E5E5EC",
  },

  dark: {
    // Colores principales
    primary: "#8B7FF0",
    primaryLight: "#A99FF5",
    primaryDark: "#6C5CE7",

    secondary: "#26D0AA",
    secondaryLight: "#52DFC1",
    secondaryDark: "#00B894",

    accent: "#FF7675",

    // Fondo
    background: "#101014",
    backgroundSecondary: "#18181E",
    backgroundTertiary: "#22222A",

    // Superficies
    surface: "#18181E",
    surfaceSecondary: "#202027",
    card: "#1C1C23",

    // Texto
    text: "#FFFFFF",
    textSecondary: "#B4B4C2",
    textTertiary: "#777784",
    textInverse: "#101014",

    // Bordes
    border: "#30303A",
    borderLight: "#272731",

    // Estados
    success: "#26D0AA",
    warning: "#FDCB6E",
    error: "#FF6B6B",
    info: "#74B9FF",

    // Radio
    live: "#FF4757",
    playing: "#8B7FF0",
    favorite: "#FF6B81",

    // Componentes
    input: "#22222A",
    overlay: "rgba(0, 0, 0, 0.65)",
    shadow: "#000000",

    // Reproductor
    playerBackground: "#18181E",
    playerControls: "#8B7FF0",
    playerProgress: "#8B7FF0",
    playerProgressBackground: "#30303A",
  },
} as const;

/**
 * Tipo de la paleta de colores.
 */
export type ColorTheme =
  (typeof Colors)[keyof typeof Colors];

/**
 * Nombres disponibles de los temas.
 */
export type ThemeName = keyof typeof Colors;