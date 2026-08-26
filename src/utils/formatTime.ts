const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;

/**
 * Formatea una duración en segundos.
 *
 * Ejemplos:
 * 65  → "01:05"
 * 125 → "02:05"
 * 3665 → "1:01:05"
 */
export const formatDuration = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);

  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
  );
  const remainingSeconds = totalSeconds % SECONDS_PER_MINUTE;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

/**
 * Formatea segundos para mostrar la posición
 * actual del reproductor.
 *
 * Ejemplo:
 * 125 → "02:05"
 */
export const formatPlayerTime = (seconds: number): string => {
  return formatDuration(seconds);
};

/**
 * Convierte minutos y segundos a segundos.
 *
 * Ejemplo:
 * 2 minutos y 30 segundos → 150
 */
export const timeToSeconds = (
  minutes: number,
  seconds: number
): number => {
  if (
    !Number.isFinite(minutes) ||
    !Number.isFinite(seconds) ||
    minutes < 0 ||
    seconds < 0
  ) {
    return 0;
  }

  return minutes * SECONDS_PER_MINUTE + seconds;
};

/**
 * Convierte segundos a un objeto de tiempo.
 *
 * Ejemplo:
 * 125 → { minutes: 2, seconds: 5 }
 */
export const secondsToTime = (
  totalSeconds: number
): {
  minutes: number;
  seconds: number;
  hours: number;
} => {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const seconds = Math.floor(totalSeconds);

  return {
    hours: Math.floor(seconds / SECONDS_PER_HOUR),
    minutes: Math.floor(
      (seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
    ),
    seconds: seconds % SECONDS_PER_MINUTE,
  };
};