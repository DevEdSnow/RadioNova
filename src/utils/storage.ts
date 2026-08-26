import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Guarda un valor en el almacenamiento local.
 */
export const setItem = async <T>(
  key: string,
  value: T
): Promise<void> => {
  try {
    const serializedValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error al guardar "${key}":`, error);
    throw new Error(`No se pudo guardar el dato: ${key}`);
  }
};

/**
 * Obtiene un valor del almacenamiento local.
 */
export const getItem = async <T>(
  key: string
): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error al obtener "${key}":`, error);
    return null;
  }
};

/**
 * Elimina un valor del almacenamiento local.
 */
export const removeItem = async (
  key: string
): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error al eliminar "${key}":`, error);
    throw new Error(`No se pudo eliminar el dato: ${key}`);
  }
};

/**
 * Comprueba si existe una clave.
 */
export const hasItem = async (
  key: string
): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value !== null;
  } catch (error) {
    console.error(`Error al comprobar "${key}":`, error);
    return false;
  }
};

/**
 * Elimina todos los datos almacenados por la aplicación.
 */
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error al limpiar el almacenamiento:", error);
    throw new Error("No se pudo limpiar el almacenamiento");
  }
};

/**
 * Obtiene todas las claves almacenadas.
 */
export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    return [...keys];
  } catch (error) {
    console.error("Error al obtener las claves:", error);
    return [];
  }
};