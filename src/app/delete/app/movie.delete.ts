import { MovieRepository } from 'src/app/shared/domain/movie.repository';

export class MovieDelete {
  constructor(private readonly repository: MovieRepository) {}

  handle(id: string) {
    return this.repository.delete(id);
  }
}
