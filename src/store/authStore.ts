import { User } from "@/types/user";
import {
    getItem,
    removeItem,
    setItem,
} from "@/utils/storage";
import { create } from "zustand";

const AUTH_USER_KEY = "radionova_auth_user";
const AUTH_TOKEN_KEY = "radionova_access_token";
const REFRESH_TOKEN_KEY = "radionova_refresh_token";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    user: User,
    accessToken: string,
    refreshToken?: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  loadSession: () => Promise<void>;

  updateUser: (user: User) => Promise<void>;

  updateAccessToken: (token: string) => Promise<void>;

  clearSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  /**
   * Guarda la sesión del usuario.
   */
  login: async (
    user,
    accessToken,
    refreshToken
  ) => {
    try {
      await setItem(AUTH_USER_KEY, user);
      await setItem(AUTH_TOKEN_KEY, accessToken);

      if (refreshToken) {
        await setItem(
          REFRESH_TOKEN_KEY,
          refreshToken
        );
      }

      set({
        user,
        accessToken,
        refreshToken: refreshToken ?? null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      set({
        isLoading: false,
      });

      throw error;
    }
  },

  /**
   * Cierra la sesión del usuario.
   */
  logout: async () => {
    try {
      await removeItem(AUTH_USER_KEY);
      await removeItem(AUTH_TOKEN_KEY);
      await removeItem(REFRESH_TOKEN_KEY);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      throw error;
    }
  },

  /**
   * Recupera la sesión guardada al iniciar la aplicación.
   */
  loadSession: async () => {
    try {
      set({
        isLoading: true,
      });

      const user = await getItem<User>(
        AUTH_USER_KEY
      );

      const accessToken = await getItem<string>(
        AUTH_TOKEN_KEY
      );

      const refreshToken = await getItem<string>(
        REFRESH_TOKEN_KEY
      );

      if (user && accessToken) {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });

        return;
      }

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error(
        "Error al recuperar la sesión:",
        error
      );

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  /**
   * Actualiza la información del usuario.
   */
  updateUser: async (user) => {
    try {
      await setItem(AUTH_USER_KEY, user);

      set({
        user,
      });
    } catch (error) {
      console.error(
        "Error al actualizar el usuario:",
        error
      );

      throw error;
    }
  },

  /**
   * Actualiza el token de acceso.
   */
  updateAccessToken: async (token) => {
    try {
      await setItem(AUTH_TOKEN_KEY, token);

      set({
        accessToken: token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error(
        "Error al actualizar el token:",
        error
      );

      throw error;
    }
  },

  /**
   * Elimina completamente la sesión.
   */
  clearSession: async () => {
    try {
      await removeItem(AUTH_USER_KEY);
      await removeItem(AUTH_TOKEN_KEY);
      await removeItem(REFRESH_TOKEN_KEY);

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error(
        "Error al limpiar la sesión:",
        error
      );

      throw error;
    }
  },
}));