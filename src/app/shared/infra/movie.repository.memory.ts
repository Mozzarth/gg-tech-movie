import { MovieRepository } from '../domain/movie.repository';
import { PaginatedResponse } from '../domain/pagination';
import { MovieFindDto } from '../domain/movie.dto';
import { Injectable } from '@nestjs/common';
import { Movie } from '../domain/movie';
import {
  MovieGetPaginate,
  MovieFilter,
  PaginationInfo,
  FilterKeyValue,
} from './movie.repository.helper';

@Injectable()
export class MovieRepositoryMemory implements MovieRepository {
  private readonly movies: Map<string, Movie> = new Map();

  async create(input: Movie): Promise<void> {
    this.movies.set(input.id, input);
  }

  async update(id: string, input: Partial<Movie>): Promise<void> {
    const movie = this.movies.get(id);
    if (!movie) return;
    this.movies.set(id, { ...movie, ...input });
  }
  async findOne(criteria: Partial<Movie>): Promise<Movie | null> {
    const moviesArray = this.getMovies();
    return FilterKeyValue.handle(moviesArray, criteria);
  }
  async findById(id: string): Promise<Movie | null> {
    return this.movies.get(id) || null;
  }

  async delete(id: string): Promise<void> {
    this.movies.delete(id);
  }

  private getMovies() {
    return Array.from(this.movies.values());
  }

  /**
   * Busca películas basadas en los criterios proporcionados y devuelve una respuesta paginada.
   * @param {MovieFindDto} input - Los criterios de búsqueda y paginación para filtrar y paginar las películas.
   * @returns {Promise<PaginatedResponse<Movie>>} Una promesa que se resuelve con una respuesta paginada de películas que cumplen con los criterios de búsqueda.
   */
  async find(input: MovieFindDto): Promise<PaginatedResponse<Movie>> {
    /**
     * @type {Movie[]} allMovies - Todas las películas disponibles en la base de datos.
     * Se obtienen todas las películas principalmente por su almacenamiento en memoria y formato de representación como un array.
     * Esto facilita la ordenación y filtrado de las películas.
     */
    const allMovies = this.getMovies();
    const { criteria, paginate } = input;

    /**
     * Ordena todas las películas por fecha de creación de forma descendente, desde la más reciente hasta la más antigua.
     * Hacerlo antes de aplicar los filtros garantiza que la salida final esté ordenada en base a la fecha de creación original,
     * incluso después de aplicar los filtros.
     */
    allMovies.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const filtered = MovieFilter.handle(allMovies, criteria);
    const paginatedMovies = MovieGetPaginate.handle(filtered, paginate);
    const pagination = PaginationInfo.handle(filtered.length, paginate);

    return { pagination, data: paginatedMovies };
  }
}
