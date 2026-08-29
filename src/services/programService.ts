import { api } from "./api";

import {
    DayOfWeek,
    Program,
    ProgramCategory,
    ProgramFilters,
    ProgramResponse,
} from "@/types/program";

/**
 * Obtiene todos los programas.
 */
export const getPrograms = async (
  filters?: ProgramFilters
): Promise<ProgramResponse> => {
  try {
    const response = await api.get<ProgramResponse>(
      "/programs",
      {
        params: filters,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los programas:",
      error
    );

    throw new Error(
      "No se pudieron obtener los programas."
    );
  }
};

/**
 * Obtiene un programa por su ID.
 */
export const getProgramById = async (
  id: number
): Promise<Program> => {
  try {
    const response = await api.get<Program>(
      `/programs/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener el programa ${id}:`,
      error
    );

    throw new Error(
      "No se pudo obtener el programa."
    );
  }
};

/**
 * Obtiene los programas activos.
 */
export const getActivePrograms = async (): Promise<
  Program[]
> => {
  try {
    const response = await api.get<Program[]>(
      "/programs/active"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener programas activos:",
      error
    );

    throw new Error(
      "No se pudieron obtener los programas activos."
    );
  }
};

/**
 * Obtiene los programas que se transmiten
 * en un día determinado.
 */
export const getProgramsByDay = async (
  dayOfWeek: DayOfWeek
): Promise<Program[]> => {
  try {
    const response = await api.get<Program[]>(
      "/programs/day",
      {
        params: {
          dayOfWeek,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener programas del día ${dayOfWeek}:`,
      error
    );

    throw new Error(
      "No se pudieron obtener los programas de este día."
    );
  }
};

/**
 * Obtiene los programas de una categoría.
 */
export const getProgramsByCategory = async (
  category: ProgramCategory
): Promise<Program[]> => {
  try {
    const response = await api.get<Program[]>(
      "/programs/category",
      {
        params: {
          category,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener programas de ${category}:`,
      error
    );

    throw new Error(
      "No se pudieron obtener los programas de esta categoría."
    );
  }
};

/**
 * Busca programas por nombre o descripción.
 */
export const searchPrograms = async (
  search: string
): Promise<Program[]> => {
  try {
    if (!search.trim()) {
      return [];
    }

    const response = await api.get<Program[]>(
      "/programs/search",
      {
        params: {
          search: search.trim(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al buscar programas:",
      error
    );

    throw new Error(
      "No se pudieron buscar los programas."
    );
  }
};

/**
 * Obtiene el programa que está actualmente
 * en transmisión.
 */
export const getCurrentProgram = async (): Promise<
  Program | null
> => {
  try {
    const response = await api.get<Program | null>(
      "/programs/current"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el programa actual:",
      error
    );

    throw new Error(
      "No se pudo obtener el programa actual."
    );
  }
};