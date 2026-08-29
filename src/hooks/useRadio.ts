import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getLiveStations,
    getStations,
    getStationsByCategory,
    searchStations,
} from "@/services/radioService";

import {
    Station,
    StationCategory,
} from "@/types/station";

import { useRadioStore } from "@/store";

interface UseRadioOptions {
  autoLoad?: boolean;
}

export const useRadio = (
  options: UseRadioOptions = {}
) => {
  const {
    autoLoad = true,
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

  const clearError = useRadioStore(
    (state) => state.clearError
  );

  /**
   * Obtiene todas las estaciones.
   */
  const loadStations = useCallback(
    async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response =
          await getStations();

        setStations(response);
      } catch (error) {
        console.error(
          "Error al cargar estaciones:",
          error
        );

        setError(
          "No se pudieron cargar las estaciones."
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Obtiene las estaciones en vivo.
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
   * Busca estaciones.
   */
  const search = useCallback(
    async (query: string) => {
      try {
        if (!query.trim()) {
          await loadStations();
          return;
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
      clearError();
      setStation(station);
    },
    [setStation, clearError]
  );

  /**
   * Busca una estación dentro
   * de las estaciones cargadas.
   */
  const findStation = useCallback(
    (stationId: number) => {
      return stations.find(
        (station) =>
          station.id === stationId
      );
    },
    [stations]
  );

  /**
   * Recarga las estaciones.
   */
  const refresh = useCallback(
    async () => {
      await loadStations();
    },
    [loadStations]
  );

  /**
   * Carga las estaciones automáticamente.
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
    // Estaciones
    stations,
    currentStation,

    // Estado
    isLoading,
    error,

    // Acciones
    loadStations,
    loadLiveStations,
    search,
    filterByCategory,
    selectStation,
    findStation,
    refresh,

    // Utilidades
    stationsCount: stations.length,
    hasStations: stations.length > 0,
  };
};