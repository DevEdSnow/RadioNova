import axios from "axios";
import { Platform } from "react-native";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Agrega información antes de enviar cada petición.
 */
api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Maneja las respuestas y errores de la API.
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("Solicitud incorrecta.");
          break;

        case 401:
          console.error("No autorizado.");
          break;

        case 403:
          console.error("Acceso denegado.");
          break;

        case 404:
          console.error("Recurso no encontrado.");
          break;

        case 500:
          console.error("Error interno del servidor.");
          break;

        default:
          console.error(
            `Error HTTP: ${error.response.status}`
          );
      }
    } else if (error.request) {
      console.error(
        "No se recibió respuesta del servidor."
      );
    } else {
      console.error(
        "Error al realizar la petición:",
        error.message
      );
    }

    return Promise.reject(error);
  }
);

/**
 * Comprueba si estamos ejecutando la aplicación
 * en un dispositivo físico.
 */
export const isPhysicalDevice =
  Platform.OS !== "web";

export default api;