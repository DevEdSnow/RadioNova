import { api } from "./api";

import {
    News,
    NewsCategory,
    NewsFilters,
    NewsResponse,
} from "@/types/news";

/**
 * Obtiene todas las noticias.
 */
export const getNews = async (
  filters?: NewsFilters
): Promise<NewsResponse> => {
  try {
    const response = await api.get<NewsResponse>(
      "/news",
      {
        params: filters,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las noticias:",
      error
    );

    throw new Error(
      "No se pudieron obtener las noticias."
    );
  }
};

/**
 * Obtiene una noticia por su ID.
 */
export const getNewsById = async (
  id: number
): Promise<News> => {
  try {
    const response = await api.get<News>(
      `/news/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener la noticia ${id}:`,
      error
    );

    throw new Error(
      "No se pudo obtener la noticia."
    );
  }
};

/**
 * Obtiene las noticias destacadas.
 */
export const getFeaturedNews = async (): Promise<
  News[]
> => {
  try {
    const response = await api.get<News[]>(
      "/news/featured"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener noticias destacadas:",
      error
    );

    throw new Error(
      "No se pudieron obtener las noticias destacadas."
    );
  }
};

/**
 * Obtiene las noticias de una categoría.
 */
export const getNewsByCategory = async (
  category: NewsCategory
): Promise<News[]> => {
  try {
    const response = await api.get<News[]>(
      "/news/category",
      {
        params: {
          category,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener noticias de ${category}:`,
      error
    );

    throw new Error(
      "No se pudieron obtener las noticias de esta categoría."
    );
  }
};

/**
 * Busca noticias por texto.
 */
export const searchNews = async (
  search: string
): Promise<News[]> => {
  try {
    if (!search.trim()) {
      return [];
    }

    const response = await api.get<News[]>(
      "/news/search",
      {
        params: {
          search: search.trim(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al buscar noticias:",
      error
    );

    throw new Error(
      "No se pudieron buscar las noticias."
    );
  }
};

/**
 * Obtiene las últimas noticias.
 */
export const getLatestNews = async (
  limit = 10
): Promise<News[]> => {
  try {
    const response = await api.get<News[]>(
      "/news/latest",
      {
        params: {
          limit,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las últimas noticias:",
      error
    );

    throw new Error(
      "No se pudieron obtener las últimas noticias."
    );
  }
};