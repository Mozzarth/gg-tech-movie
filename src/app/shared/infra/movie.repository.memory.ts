import { PaginatedResponse, Pagination } from '../domain/pagination';
import { MovieRepository } from '../domain/movie.repository';
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
  constructor() {
    console.log(MovieRepositoryMemory.name);
  }

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
  async find(input: MovieFindDto): Promise<PaginatedResponse<Movie>> {
    const allMovies = this.getMovies();
    const { criteria, paginated } = input;
    const { page, pageSize } = paginated;

    allMovies.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const filtered = MovieFilter.handle(allMovies, criteria);
    const paginatedMovies = MovieGetPaginate.handle(filtered, page, pageSize);

    const pagination = PaginationInfo.handle(filtered.length, page, pageSize);

    return { pagination, data: paginatedMovies };
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
}
