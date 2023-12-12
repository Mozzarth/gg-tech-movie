import { Movie } from '../domain/movie';
import { Pagination } from '../domain/pagination';

export class MovieFilter {
  static handle(movies: Movie[], criteria: Record<string, unknown>): Movie[] {
    return movies.filter((movie) =>
      Object.entries(criteria).every(([key, value]) => movie[key] === value),
    );
  }
}

export class MovieGetPaginate {
  static handle(movies: Movie[], page: number, pageSize: number): Movie[] {
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    return movies.slice(startIdx, endIdx);
  }
}

export class PaginationInfo {
  static handle(
    totalItems: number,
    page: number,
    pageSize: number,
  ): Pagination {
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }
}

export class FilterKeyValue {
  static handle<T>(array: T[], criteria: Partial<T>): T | undefined {
    return array.find((item) =>
      Object.entries(criteria).every(([key, value]) => item[key] === value),
    );
  }
}
