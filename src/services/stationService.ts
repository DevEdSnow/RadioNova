import { api } from "./api";

import {
    Station,
    StationCategory,
    StationFilters,
} from "@/types/station";

/**
 * Obtiene todas las estaciones.
 */
export const getStations = async (
  filters?: StationFilters
): Promise<Station[]> => {
  try {
    const response = await api.get<Station[]>(
      "/stations",
      {
        params: filters,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las estaciones:",
      error
    );

    throw new Error(
      "No se pudieron obtener las estaciones."
    );
  }
};

/**
 * Obtiene una estación por su ID.
 */
export const getStationById = async (
  id: number
): Promise<Station> => {
  try {
    const response = await api.get<Station>(
      `/stations/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener la estación ${id}:`,
      error
    );

    throw new Error(
      "No se pudo obtener la estación."
    );
  }
};

/**
 * Obtiene las estaciones activas.
 */
export const getActiveStations = async (): Promise<
  Station[]
> => {
  try {
    const response = await api.get<Station[]>(
      "/stations/active"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener estaciones activas:",
      error
    );

    throw new Error(
      "No se pudieron obtener las estaciones activas."
    );
  }
};

/**
 * Obtiene las estaciones que están transmitiendo.
 */
export const getLiveStations = async (): Promise<
  Station[]
> => {
  try {
    const response = await api.get<Station[]>(
      "/stations/live"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener estaciones en vivo:",
      error
    );

    throw new Error(
      "No se pudieron obtener las estaciones en vivo."
    );
  }
};

/**
 * Obtiene estaciones por categoría.
 */
export const getStationsByCategory = async (
  category: StationCategory
): Promise<Station[]> => {
  try {
    const response = await api.get<Station[]>(
      "/stations/category",
      {
        params: {
          category,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener estaciones de ${category}:`,
      error
    );

    throw new Error(
      "No se pudieron obtener las estaciones de esta categoría."
    );
  }
};

/**
 * Busca estaciones por nombre.
 */
export const searchStations = async (
  search: string
): Promise<Station[]> => {
  try {
    if (!search.trim()) {
      return [];
    }

    const response = await api.get<Station[]>(
      "/stations/search",
      {
        params: {
          search: search.trim(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al buscar estaciones:",
      error
    );

    throw new Error(
      "No se pudieron buscar las estaciones."
    );
  }
};

/**
 * Obtiene las estaciones favoritas
 * del usuario autenticado.
 */
export const getFavoriteStations = async (): Promise<
  Station[]
> => {
  try {
    const response = await api.get<Station[]>(
      "/stations/favorites"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener estaciones favoritas:",
      error
    );

    throw new Error(
      "No se pudieron obtener las estaciones favoritas."
    );
  }
};

/**
 * Agrega una estación a favoritos en el backend.
 */
export const addStationToFavorites = async (
  stationId: number
): Promise<void> => {
  try {
    await api.post(
      `/stations/${stationId}/favorite`
    );
  } catch (error) {
    console.error(
      "Error al agregar estación a favoritos:",
      error
    );

    throw new Error(
      "No se pudo agregar la estación a favoritos."
    );
  }
};

/**
 * Elimina una estación de favoritos en el backend.
 */
export const removeStationFromFavorites = async (
  stationId: number
): Promise<void> => {
  try {
    await api.delete(
      `/stations/${stationId}/favorite`
    );
  } catch (error) {
    console.error(
      "Error al eliminar estación de favoritos:",
      error
    );

    throw new Error(
      "No se pudo eliminar la estación de favoritos."
    );
  }
};