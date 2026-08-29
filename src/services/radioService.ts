import { api } from "./api";

import {
    Station,
    StationCategory,
    StationFilters,
} from "@/types/station";

import { NowPlaying } from "@/types/radio";

/**
 * Obtiene las estaciones de radio.
 */
export const getStations = async (
  filters?: StationFilters
): Promise<Station[]> => {
  try {
    const response = await api.get<Station[]>(
      "/radio/stations",
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
      `/radio/stations/${id}`
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
 * Obtiene las estaciones que están actualmente
 * transmitiendo.
 */
export const getLiveStations = async (): Promise<
  Station[]
> => {
  try {
    const response = await api.get<Station[]>(
      "/radio/stations/live"
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
      "/radio/stations/category",
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
 * Busca estaciones.
 */
export const searchStations = async (
  search: string
): Promise<Station[]> => {
  try {
    if (!search.trim()) {
      return [];
    }

    const response = await api.get<Station[]>(
      "/radio/stations/search",
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
 * Obtiene la información de la canción
 * que está sonando actualmente.
 */
export const getNowPlaying = async (
  stationId: number
): Promise<NowPlaying | null> => {
  try {
    const response = await api.get<
      NowPlaying | null
    >(`/radio/stations/${stationId}/now-playing`);

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener información de la canción:",
      error
    );

    throw new Error(
      "No se pudo obtener la canción actual."
    );
  }
};

/**
 * Comprueba si el stream de una estación
 * está disponible.
 */
export const checkStream = async (
  stationId: number
): Promise<boolean> => {
  try {
    const response = await api.get<{
      available: boolean;
    }>(
      `/radio/stations/${stationId}/stream/status`
    );

    return response.data.available;
  } catch (error) {
    console.error(
      "Error al comprobar el stream:",
      error
    );

    return false;
  }
};

/**
 * Obtiene la URL del stream de una estación.
 */
export const getStreamUrl = async (
  stationId: number
): Promise<string> => {
  try {
    const response = await api.get<{
      url: string;
    }>(
      `/radio/stations/${stationId}/stream`
    );

    return response.data.url;
  } catch (error) {
    console.error(
      "Error al obtener la URL del stream:",
      error
    );

    throw new Error(
      "No se pudo obtener el stream de la estación."
    );
  }
};