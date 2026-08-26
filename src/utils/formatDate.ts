const DEFAULT_LOCALE = "es-MX";

/**
 * Convierte una fecha a formato largo.
 *
 * Ejemplo:
 * 2026-08-26T18:30:00
 * → "26 de agosto de 2026"
 */
export const formatDate = (
  date: string | Date,
  locale: string = DEFAULT_LOCALE
): string => {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(dateObject.getTime())) {
    return "Fecha inválida";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObject);
};

/**
 * Formatea una fecha de manera corta.
 *
 * Ejemplo:
 * 2026-08-26
 * → "26/08/2026"
 */
export const formatShortDate = (
  date: string | Date,
  locale: string = DEFAULT_LOCALE
): string => {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(dateObject.getTime())) {
    return "Fecha inválida";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObject);
};

/**
 * Formatea únicamente la hora.
 *
 * Ejemplo:
 * 2026-08-26T18:30:00
 * → "6:30 p. m."
 */
export const formatTime = (
  date: string | Date,
  locale: string = DEFAULT_LOCALE
): string => {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(dateObject.getTime())) {
    return "Hora inválida";
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(dateObject);
};

/**
 * Formatea fecha y hora.
 *
 * Ejemplo:
 * → "26 de agosto de 2026, 6:30 p. m."
 */
export const formatDateTime = (
  date: string | Date,
  locale: string = DEFAULT_LOCALE
): string => {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(dateObject.getTime())) {
    return "Fecha inválida";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(dateObject);
};

/**
 * Devuelve una fecha relativa.
 *
 * Ejemplos:
 * "Hoy"
 * "Ayer"
 * "Hace 3 días"
 */
export const formatRelativeDate = (
  date: string | Date,
  locale: string = DEFAULT_LOCALE
): string => {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(dateObject.getTime())) {
    return "Fecha inválida";
  }

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfDate = new Date(
    dateObject.getFullYear(),
    dateObject.getMonth(),
    dateObject.getDate()
  );

  const differenceInDays = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (differenceInDays === 0) {
    return "Hoy";
  }

  if (differenceInDays === 1) {
    return "Ayer";
  }

  if (differenceInDays > 1 && differenceInDays < 7) {
    return `Hace ${differenceInDays} días`;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(dateObject);
};