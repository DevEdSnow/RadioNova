import { api } from "./api";

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIRequest {
  message: string;
  conversationId?: string;
  context?: {
    stationId?: number;
    stationName?: string;
    currentSong?: string;
    currentArtist?: string;
  };
}

export interface AIResponse {
  message: string;
  conversationId?: string;
}

export interface AIRecommendation {
  title: string;
  description: string;
  type: "station" | "song" | "artist" | "program";
  id?: number;
}

/**
 * Envía un mensaje al asistente de IA.
 *
 * La aplicación se comunica con nuestro backend.
 * El backend será el encargado de comunicarse con Claude.
 */
export const sendMessageToAI = async (
  request: AIRequest
): Promise<AIResponse> => {
  try {
    const response = await api.post<AIResponse>(
      "/ai/chat",
      request
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al comunicarse con la IA:",
      error
    );

    throw new Error(
      "No se pudo establecer comunicación con el asistente de IA."
    );
  }
};

/**
 * Obtiene recomendaciones personalizadas.
 */
export const getAIRecommendations = async (): Promise<
  AIRecommendation[]
> => {
  try {
    const response = await api.get<AIRecommendation[]>(
      "/ai/recommendations"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener recomendaciones de IA:",
      error
    );

    throw new Error(
      "No se pudieron obtener las recomendaciones."
    );
  }
};

/**
 * Pregunta a la IA sobre la estación actual.
 */
export const askAboutCurrentStation = async (
  stationId: number,
  question: string
): Promise<AIResponse> => {
  try {
    const response = await api.post<AIResponse>(
      "/ai/station",
      {
        stationId,
        question,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al consultar la estación:",
      error
    );

    throw new Error(
      "No se pudo obtener información sobre la estación."
    );
  }
};

/**
 * Pregunta a la IA sobre una canción.
 */
export const askAboutSong = async (
  title: string,
  artist?: string
): Promise<AIResponse> => {
  try {
    const response = await api.post<AIResponse>(
      "/ai/song",
      {
        title,
        artist,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al consultar información de la canción:",
      error
    );

    throw new Error(
      "No se pudo obtener información sobre la canción."
    );
  }
};

/**
 * Genera una recomendación basada en
 * los gustos del usuario.
 */
export const getPersonalizedRecommendation =
  async (
    favoriteGenres: string[],
    favoriteArtists: string[]
  ): Promise<AIRecommendation[]> => {
    try {
      const response = await api.post<
        AIRecommendation[]
      >("/ai/recommendations/personalized", {
        favoriteGenres,
        favoriteArtists,
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error al generar recomendación:",
        error
      );

      throw new Error(
        "No se pudo generar una recomendación personalizada."
      );
    }
  };