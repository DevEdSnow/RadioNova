import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getActiveStations,
    getLiveStations,
    getStationById,
    getStations,
    getStationsByCategory,
    searchStations,
} from "@/services/stationService";

import {
    Station,
    StationCategory,
    StationFilters,
} from "@/types/station";

import { useRadioStore } from "@/store";

interface UseStationsOptions {
  autoLoad?: boolean;
  filters?: StationFilters;
}

export const useStations = (
  options: UseStationsOptions = {}
) => {
  const {
    autoLoad = true,
    filters,
  } = options;

  const [stations, setStations] = useState<
    Station[]
  >([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState<
    string | null
  >(null);

  const currentStation =
    useRadioStore(
      (state) => state.currentStation
    );

  const setStation = useRadioStore(
    (state) => state.setStation
  );

  /**
   * Carga todas las estaciones.
   */
  const loadStations = useCallback(
    async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await getStations(filters);

        setStations(response);

        return response;
      } catch (error) {
        console.error(
          "Error al cargar estaciones:",
          error
        );

        setError(
          "No se pudieron cargar las estaciones."
        );

        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  /**
   * Carga únicamente las estaciones activas.
   */
  const loadActiveStations =
    useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await getActiveStations();

        setStations(response);

        return response;
      } catch (error) {
        console.error(
          "Error al cargar estaciones activas:",
          error
        );

        setError(
          "No se pudieron cargar las estaciones activas."
        );

        return [];
      } finally {
        setIsLoading(false);
      }
    }, []);

  /**
   * Carga estaciones que están transmitiendo.
   */
  const loadLiveStations =
    useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await getLiveStations();

        setStations(response);

        return response;
      } catch (error) {
        console.error(
          "Error al cargar estaciones en vivo:",
          error
        );

        setError(
          "No se pudieron cargar las estaciones en vivo."
        );

        return [];
      } finally {
        setIsLoading(false);
      }
    }, []);

  /**
   * Obtiene una estación por ID.
   */
  const getStation = useCallback(
    async (id: number) => {
      try {
        setError(null);

        return await getStationById(id);
      } catch (error) {
        console.error(
          `Error al obtener estación ${id}:`,
          error
        );

        setError(
          "No se pudo obtener la estación."
        );

        return null;
      }
    },
    []
  );

  /**
   * Busca estaciones.
   */
  const search = useCallback(
    async (query: string) => {
      try {
        if (!query.trim()) {
          return loadStations();
        }

        setIsLoading(true);
        setError(null);

        const response =
          await searchStations(query);

        setStations(response);

        return response;
      } catch (error) {
        console.error(
          "Error al buscar estaciones:",
          error
        );

        setError(
          "No se pudieron buscar las estaciones."
        );

        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [loadStations]
  );

  /**
   * Filtra estaciones por categoría.
   */
  const filterByCategory =
    useCallback(
      async (
        category: StationCategory
      ) => {
        try {
          setIsLoading(true);
          setError(null);

          const response =
            await getStationsByCategory(
              category
            );

          setStations(response);

          return response;
        } catch (error) {
          console.error(
            "Error al filtrar estaciones:",
            error
          );

          setError(
            "No se pudieron filtrar las estaciones."
          );

          return [];
        } finally {
          setIsLoading(false);
        }
      },
      []
    );

  /**
   * Selecciona una estación.
   */
  const selectStation = useCallback(
    (station: Station) => {
      setStation(station);
    },
    [setStation]
  );

  /**
   * Comprueba si una estación
   * es la estación actualmente seleccionada.
   */
  const isSelected = useCallback(
    (stationId: number) => {
      return (
        currentStation?.id === stationId
      );
    },
    [currentStation]
  );

  /**
   * Limpia la lista de estaciones.
   */
  const clearStations = useCallback(() => {
    setStations([]);
    setError(null);
  }, []);

  /**
   * Recarga las estaciones.
   */
  const refresh = useCallback(
    async () => {
      return loadStations();
    },
    [loadStations]
  );

  /**
   * Carga automáticamente las estaciones.
   */
  useEffect(() => {
    if (autoLoad) {
      loadStations();
    }
  }, [
    autoLoad,
    loadStations,
  ]);

  return {
    // Datos
    stations,
    currentStation,

    // Estado
    isLoading,
    error,

    // Carga
    loadStations,
    loadActiveStations,
    loadLiveStations,

    // Búsqueda
    search,

    // Filtros
    filterByCategory,

    // Estación
    getStation,
    selectStation,
    isSelected,

    // Utilidades
    refresh,
    clearStations,

    stationsCount: stations.length,
    hasStations: stations.length > 0,
  };
};