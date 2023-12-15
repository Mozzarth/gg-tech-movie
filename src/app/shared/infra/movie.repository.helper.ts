import { Movie } from '../domain/movie';
import { PaginatedRequest, Pagination } from '../domain/pagination';

export class MovieFilter {
  /**
   * Filtra un array de películas basado en los criterios proporcionados.
   * @param {Movie[]} movies - Array de películas a filtrar.
   * @param {Record<string, unknown>} criteria - Criterios de filtrado.
   * @returns {Movie[]} Array de películas filtradas.
   */
  static handle(movies: Movie[], criteria?: Record<string, unknown>): Movie[] {
    /**
     * Si no se proporcionan criterios, se retorna el array de películas sin cambios.
     */
    if (!criteria) return movies;
    /**
     * Se filtran las películas basadas en cada criterio proporcionado.
     */
    return movies.filter((movie) =>
      Object.entries(criteria).every(([key, value]) => movie[key] === value),
    );
  }
}

export class MovieGetPaginate {
  /**
   * Realiza la paginación de un array de películas según los parámetros proporcionados.
   * @param {Movie[]} movies - Array de películas a paginar.
   * @param {PaginatedRequest} paginate - Parámetros de paginación.
   * @returns {Movie[]} Array de películas paginadas.
   */
  static handle(movies: Movie[], paginate?: PaginatedRequest): Movie[] {
    if (!paginate) return movies;
    const { page, pageSize } = paginate;
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    return movies.slice(startIdx, endIdx);
  }
}

export class PaginationInfo {
  /**
   * Calcula la información de paginación en base al total de elementos y los parámetros proporcionados.
   * @param {number} totalItems - Total de elementos disponibles.
   * @param {PaginatedRequest} paginate - Parámetros de paginación.
   * @returns {Pagination} Información de paginación.
   */
  static handle(totalItems: number, paginate?: PaginatedRequest): Pagination {
    const page = paginate?.page || 1;
    const pageSize = paginate?.pageSize || totalItems;

    const totalPages = Math.ceil(totalItems / pageSize) || 0;
    return { page, pageSize, totalItems, totalPages };
  }
}

/**
 * Clase que maneja la lógica de búsqueda de un elemento en un array basada en criterios clave-valor.
 * @template T - Tipo de los elementos en el array.
 */
export class FilterKeyValue {
  /**
   * Busca un elemento en un array que cumpla con los criterios clave-valor proporcionados.
   * @param {T[]} array - Array en el que se realizará la búsqueda.
   * @param {Partial<T>} criteria - Criterios clave-valor para la búsqueda.
   * @returns {T | undefined} El primer elemento que cumple con los criterios o undefined si no se encuentra ninguno.
   */
  static handle<T>(array: T[], criteria: Partial<T>): T | undefined {
    return array.find((item) =>
      Object.entries(criteria).every(([key, value]) => item[key] === value),
    );
  }
}
