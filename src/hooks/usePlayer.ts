import {
    useAudioPlayer,
    useAudioPlayerStatus,
} from "expo-audio";
import {
    useCallback,
    useEffect,
    useRef,
} from "react";

import { useRadioStore } from "@/store";
import { Station } from "@/types/station";

/**
 * Hook principal del reproductor de RadioNova.
 */
export const usePlayer = () => {
  const player = useAudioPlayer();

  const status = useAudioPlayerStatus(player);

  const currentStation = useRadioStore(
    (state) => state.currentStation
  );

  const volume = useRadioStore(
    (state) => state.volume
  );

  const isPlaying = useRadioStore(
    (state) => state.isPlaying
  );

  const isLoading = useRadioStore(
    (state) => state.isLoading
  );

  const error = useRadioStore(
    (state) => state.error
  );

  const setStation = useRadioStore(
    (state) => state.setStation
  );

  const setPlaying = useRadioStore(
    (state) => state.setPlaying
  );

  const setLoading = useRadioStore(
    (state) => state.setLoading
  );

  const setVolume = useRadioStore(
    (state) => state.setVolume
  );

  const setCurrentTime = useRadioStore(
    (state) => state.setCurrentTime
  );

  const setDuration = useRadioStore(
    (state) => state.setDuration
  );

  const setError = useRadioStore(
    (state) => state.setError
  );

  const clearError = useRadioStore(
    (state) => state.clearError
  );

  const previousStream = useRef<string | null>(
    null
  );

  /**
   * Sincroniza el estado del reproductor
   * con radioStore.
   */
  useEffect(() => {
    if (!status) {
      return;
    }

    setCurrentTime(status.currentTime ?? 0);

    setDuration(status.duration ?? 0);

    setPlaying(status.playing ?? false);

    setLoading(
      status.isBuffering ?? false
    );
  }, [
    status,
    setCurrentTime,
    setDuration,
    setPlaying,
    setLoading,
  ]);

  /**
   * Actualiza el volumen del reproductor.
   */
  useEffect(() => {
    player.volume = volume;
  }, [player, volume]);

  /**
   * Reproduce una estación.
   */
  const playStation = useCallback(
    async (station: Station) => {
      try {
        setLoading(true);
        clearError();

        const streamUrl =
          station.stream.url;

        if (!streamUrl) {
          throw new Error(
            "La estación no tiene un stream disponible."
          );
        }

        if (
          previousStream.current !==
          streamUrl
        ) {
          player.replace(streamUrl);

          previousStream.current =
            streamUrl;
        }

        setStation(station);

        player.volume = volume;

        player.play();
      } catch (error) {
        console.error(
          "Error al reproducir estación:",
          error
        );

        setError(
          "No se pudo reproducir la estación."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      player,
      volume,
      setStation,
      setLoading,
      setError,
      clearError,
    ]
  );

  /**
   * Reproduce el stream actual.
   */
  const play = useCallback(() => {
    try {
      clearError();

      player.play();
    } catch (error) {
      console.error(
        "Error al reproducir:",
        error
      );

      setError(
        "No se pudo iniciar la reproducción."
      );
    }
  }, [
    player,
    clearError,
    setError,
  ]);

  /**
   * Pausa la reproducción.
   */
  const pause = useCallback(() => {
    try {
      player.pause();
    } catch (error) {
      console.error(
        "Error al pausar:",
        error
      );

      setError(
        "No se pudo pausar la reproducción."
      );
    }
  }, [player, setError]);

  /**
   * Alterna entre reproducir y pausar.
   */
  const togglePlay = useCallback(() => {
    if (status?.playing) {
      pause();
    } else {
      play();
    }
  }, [
    status?.playing,
    play,
    pause,
  ]);

  /**
   * Detiene completamente la reproducción.
   */
  const stop = useCallback(() => {
    try {
      player.pause();

      setPlaying(false);
    } catch (error) {
      console.error(
        "Error al detener:",
        error
      );

      setError(
        "No se pudo detener la reproducción."
      );
    }
  }, [
    player,
    setPlaying,
    setError,
  ]);

  /**
   * Cambia el volumen.
   */
  const changeVolume = useCallback(
    (newVolume: number) => {
      const normalizedVolume =
        Math.max(
          0,
          Math.min(1, newVolume)
        );

      setVolume(normalizedVolume);

      player.volume =
        normalizedVolume;
    },
    [player, setVolume]
  );

  /**
   * Activa o desactiva el silencio.
   */
  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setVolume(0);
      player.volume = 0;
    } else {
      setVolume(1);
      player.volume = 1;
    }
  }, [
    player,
    volume,
    setVolume,
  ]);

  return {
    // Estado
    player,
    currentStation,

    isPlaying:
      status?.playing ?? isPlaying,

    isLoading:
      status?.isBuffering ?? isLoading,

    currentTime:
      status?.currentTime ?? 0,

    duration:
      status?.duration ?? 0,

    volume,

    error,

    // Acciones
    playStation,
    play,
    pause,
    togglePlay,
    stop,

    changeVolume,
    toggleMute,

    // Estado adicional
    hasStation:
      currentStation !== null,

    isMuted: volume === 0,
  };
};