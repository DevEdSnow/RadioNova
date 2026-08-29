import { useCallback, useEffect } from "react";

import { useFavoritesStore } from "@/store";
import { Station } from "@/types/station";

/**
 * Hook para gestionar las estaciones favoritas.
 */
export const useFavorites = () => {
  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  const isLoading = useFavoritesStore(
    (state) => state.isLoading
  );

  const loadFavorites = useFavoritesStore(
    (state) => state.loadFavorites
  );

  const addFavorite = useFavoritesStore(
    (state) => state.addFavorite
  );

  const removeFavorite = useFavoritesStore(
    (state) => state.removeFavorite
  );

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const isFavorite = useFavoritesStore(
    (state) => state.isFavorite
  );

  const clearFavorites = useFavoritesStore(
    (state) => state.clearFavorites
  );

  /**
   * Carga los favoritos al montar el hook.
   */
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  /**
   * Agrega una estación a favoritos.
   */
  const handleAddFavorite = useCallback(
    async (station: Station) => {
      await addFavorite(station);
    },
    [addFavorite]
  );

  /**
   * Elimina una estación de favoritos.
   */
  const handleRemoveFavorite = useCallback(
    async (stationId: number) => {
      await removeFavorite(stationId);
    },
    [removeFavorite]
  );

  /**
   * Cambia el estado favorito de una estación.
   */
  const handleToggleFavorite = useCallback(
    async (station: Station) => {
      await toggleFavorite(station);
    },
    [toggleFavorite]
  );

  /**
   * Comprueba si una estación es favorita.
   */
  const checkIsFavorite = useCallback(
    (stationId: number) => {
      return isFavorite(stationId);
    },
    [isFavorite]
  );

  /**
   * Elimina todos los favoritos.
   */
  const handleClearFavorites = useCallback(
    async () => {
      await clearFavorites();
    },
    [clearFavorites]
  );

  return {
    favorites,
    isLoading,

    addFavorite: handleAddFavorite,
    removeFavorite: handleRemoveFavorite,
    toggleFavorite: handleToggleFavorite,

    isFavorite: checkIsFavorite,

    clearFavorites: handleClearFavorites,

    favoritesCount: favorites.length,

    hasFavorites: favorites.length > 0,
  };
};