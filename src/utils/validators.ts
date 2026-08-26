export const isRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return true;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email.trim());
};

export const isValidPassword = (
  password: string,
  minLength = 8
): boolean => {
  return password.length >= minLength;
};

export const passwordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  return name.trim().length >= 2 && nameRegex.test(name.trim());
};

export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

  return usernameRegex.test(username);
};

export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "http:" ||
      parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const isValidStreamUrl = (url: string): boolean => {
  if (!isValidUrl(url)) {
    return false;
  }

  return true;
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

  return phoneRegex.test(phone.trim());
};

export const isValidTime = (time: string): boolean => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  return timeRegex.test(time);
};

export const isValidFrequency = (
  frequency: string
): boolean => {
  const frequencyRegex = /^\d{2,3}(\.\d{1,2})?\s?(AM|FM)$/i;

  return frequencyRegex.test(frequency.trim());
};

export const isPositiveNumber = (
  value: number
): boolean => {
  return Number.isFinite(value) && value > 0;
};

export const isNonNegativeNumber = (
  value: number
): boolean => {
  return Number.isFinite(value) && value >= 0;
};

export const isValidId = (id: number): boolean => {
  return Number.isInteger(id) && id > 0;
};

export const isValidHexColor = (
  color: string
): boolean => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  return colorRegex.test(color);
};

export const isValidImageUrl = (
  url: string
): boolean => {
  if (!isValidUrl(url)) {
    return false;
  }

  return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
};

export const isValidVolume = (
  volume: number
): boolean => {
  return Number.isFinite(volume) && volume >= 0 && volume <= 1;
};

export const isValidLanguage = (
  language: string
): boolean => {
  return /^[a-z]{2}(-[A-Z]{2})?$/.test(language);
};

export const isValidCountryCode = (
  country: string
): boolean => {
  return /^[A-Z]{2}$/.test(country);
};