import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getItem,
    setItem,
} from "@/utils/storage";

export type ThemeMode =
  | "light"
  | "dark"
  | "system";

const THEME_KEY = "radionova_theme";

export const useTheme = () => {
  const [theme, setThemeState] =
    useState<ThemeMode>("system");

  const [isLoading, setIsLoading] =
    useState(true);

  /**
   * Carga el tema guardado.
   */
  const loadTheme = useCallback(
    async () => {
      try {
        setIsLoading(true);

        const savedTheme =
          await getItem<ThemeMode>(
            THEME_KEY
          );

        if (
          savedTheme === "light" ||
          savedTheme === "dark" ||
          savedTheme === "system"
        ) {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.error(
          "Error al cargar el tema:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Cambia el tema y lo guarda.
   */
  const setTheme = useCallback(
    async (newTheme: ThemeMode) => {
      try {
        setThemeState(newTheme);

        await setItem(
          THEME_KEY,
          newTheme
        );
      } catch (error) {
        console.error(
          "Error al guardar el tema:",
          error
        );
      }
    },
    []
  );

  /**
   * Alterna entre tema claro y oscuro.
   */
  const toggleTheme = useCallback(
    async () => {
      const newTheme =
        theme === "dark"
          ? "light"
          : "dark";

      await setTheme(newTheme);
    },
    [theme, setTheme]
  );

  /**
   * Restablece el tema del sistema.
   */
  const useSystemTheme =
    useCallback(async () => {
      await setTheme("system");
    }, [setTheme]);

  /**
   * Carga el tema al montar el hook.
   */
  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return {
    theme,

    isLoading,

    setTheme,
    toggleTheme,
    useSystemTheme,

    isDark:
      theme === "dark",

    isLight:
      theme === "light",

    isSystem:
      theme === "system",
  };
};