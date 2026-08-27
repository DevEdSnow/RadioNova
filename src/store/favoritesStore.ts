import { create } from "zustand";

import { Station } from "@/types/station";
import {
    getItem,
    setItem,
} from "@/utils/storage";

const FAVORITES_KEY = "radionova_favorite_stations";

interface FavoritesState {
  favorites: Station[];
  isLoading: boolean;

  loadFavorites: () => Promise<void>;

  addFavorite: (station: Station) => Promise<void>;

  removeFavorite: (stationId: number) => Promise<void>;

  toggleFavorite: (station: Station) => Promise<void>;

  isFavorite: (stationId: number) => boolean;

  clearFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>(
  (set, get) => ({
    favorites: [],
    isLoading: true,

    /**
     * Carga los favoritos guardados
     * en el almacenamiento local.
     */
    loadFavorites: async () => {
      try {
        set({
          isLoading: true,
        });

        const favorites = await getItem<Station[]>(
          FAVORITES_KEY
        );

        set({
          favorites: favorites ?? [],
          isLoading: false,
        });
      } catch (error) {
        console.error(
          "Error al cargar favoritos:",
          error
        );

        set({
          favorites: [],
          isLoading: false,
        });
      }
    },

    /**
     * Agrega una estación a favoritos.
     */
    addFavorite: async (station) => {
      try {
        const currentFavorites =
          get().favorites;

        const alreadyFavorite =
          currentFavorites.some(
            (favorite) => favorite.id === station.id
          );

        if (alreadyFavorite) {
          return;
        }

        const updatedFavorites = [
          ...currentFavorites,
          {
            ...station,
            isFavorite: true,
          },
        ];

        await setItem(
          FAVORITES_KEY,
          updatedFavorites
        );

        set({
          favorites: updatedFavorites,
        });
      } catch (error) {
        console.error(
          "Error al agregar favorito:",
          error
        );

        throw error;
      }
    },

    /**
     * Elimina una estación de favoritos.
     */
    removeFavorite: async (stationId) => {
      try {
        const updatedFavorites =
          get().favorites.filter(
            (station) => station.id !== stationId
          );

        await setItem(
          FAVORITES_KEY,
          updatedFavorites
        );

        set({
          favorites: updatedFavorites,
        });
      } catch (error) {
        console.error(
          "Error al eliminar favorito:",
          error
        );

        throw error;
      }
    },

    /**
     * Agrega o elimina una estación
     * dependiendo de su estado actual.
     */
    toggleFavorite: async (station) => {
      const favorite = get().isFavorite(
        station.id
      );

      if (favorite) {
        await get().removeFavorite(station.id);
      } else {
        await get().addFavorite(station);
      }
    },

    /**
     * Comprueba si una estación
     * está en favoritos.
     */
    isFavorite: (stationId) => {
      return get().favorites.some(
        (station) => station.id === stationId
      );
    },

    /**
     * Elimina todos los favoritos.
     */
    clearFavorites: async () => {
      try {
        await setItem(
          FAVORITES_KEY,
          []
        );

        set({
          favorites: [],
        });
      } catch (error) {
        console.error(
          "Error al limpiar favoritos:",
          error
        );

        throw error;
      }
    },
  })
);