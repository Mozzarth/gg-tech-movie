import { MovieNotExistError } from '../../shared/domain/errors/movie-not-exists.error';
import { MovieRepository } from 'src/app/shared/domain/movie.repository';

export class MovieSetWatched {
  constructor(private readonly repository: MovieRepository) {}

  async handle(id: string) {
    const movie = await this.repository.findById(id);

    if (!movie) throw new MovieNotExistError(id);

    return this.repository.update(id, { watched: !movie.watched });
  }
}
