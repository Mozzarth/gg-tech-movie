import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { PaginatedRequest } from 'src/app/shared/domain/pagination';

export class MovieQuery {
  constructor(private readonly repository: MovieRepository) {}

  handle(input: PaginatedRequest) {
    return this.repository.find({ paginated: input, criteria: {} });
  }
}
