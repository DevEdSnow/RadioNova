import { create } from "zustand";

import { NowPlaying } from "@/types/radio";
import { RadioStream, Station } from "@/types/station";

interface RadioState {
  // Estación actualmente seleccionada
  currentStation: Station | null;

  // Stream actualmente utilizado
  currentStream: RadioStream | null;

  // Información de la canción actual
  nowPlaying: NowPlaying | null;

  // Estado del reproductor
  isPlaying: boolean;
  isLoading: boolean;

  // Volumen: 0 - 1
  volume: number;

  // Posición y duración
  currentTime: number;
  duration: number;

  // Error del reproductor
  error: string | null;

  // Acciones
  setStation: (station: Station) => void;

  setNowPlaying: (
    nowPlaying: NowPlaying | null
  ) => void;

  setPlaying: (isPlaying: boolean) => void;

  setLoading: (isLoading: boolean) => void;

  setVolume: (volume: number) => void;

  setCurrentTime: (currentTime: number) => void;

  setDuration: (duration: number) => void;

  setError: (error: string | null) => void;

  clearError: () => void;

  resetPlayer: () => void;
}

export const useRadioStore = create<RadioState>(
  (set) => ({
    currentStation: null,

    currentStream: null,

    nowPlaying: null,

    isPlaying: false,

    isLoading: false,

    volume: 1,

    currentTime: 0,

    duration: 0,

    error: null,

    /**
     * Selecciona una estación.
     */
    setStation: (station) => {
      set({
        currentStation: station,
        currentStream: station.stream,
        nowPlaying: null,
        currentTime: 0,
        duration: 0,
        error: null,
      });
    },

    /**
     * Actualiza la información
     * de lo que está sonando.
     */
    setNowPlaying: (nowPlaying) => {
      set({
        nowPlaying,
      });
    },

    /**
     * Cambia el estado de reproducción.
     */
    setPlaying: (isPlaying) => {
      set({
        isPlaying,
      });
    },

    /**
     * Indica si el reproductor
     * está cargando.
     */
    setLoading: (isLoading) => {
      set({
        isLoading,
      });
    },

    /**
     * Cambia el volumen.
     *
     * El valor permitido es de 0 a 1.
     */
    setVolume: (volume) => {
      const normalizedVolume = Math.max(
        0,
        Math.min(1, volume)
      );

      set({
        volume: normalizedVolume,
      });
    },

    /**
     * Actualiza la posición
     * actual del reproductor.
     */
    setCurrentTime: (currentTime) => {
      set({
        currentTime: Math.max(0, currentTime),
      });
    },

    /**
     * Actualiza la duración.
     */
    setDuration: (duration) => {
      set({
        duration: Math.max(0, duration),
      });
    },

    /**
     * Guarda un error.
     */
    setError: (error) => {
      set({
        error,
        isPlaying: false,
        isLoading: false,
      });
    },

    /**
     * Limpia el error actual.
     */
    clearError: () => {
      set({
        error: null,
      });
    },

    /**
     * Restablece completamente
     * el reproductor.
     */
    resetPlayer: () => {
      set({
        currentStation: null,
        currentStream: null,
        nowPlaying: null,
        isPlaying: false,
        isLoading: false,
        currentTime: 0,
        duration: 0,
        error: null,
      });
    },
  })
);