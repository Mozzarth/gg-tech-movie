import { MovieAlreadyExistsError } from '../../shared/domain/errors/movie-already-exists.error';
import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieCreateMapper } from './movie.create-mapper';
import { MovieCreateInput } from './movie.dto';

export class MovieCreate {
  constructor(private readonly repository: MovieRepository) {}

  async handle(input: MovieCreateInput) {
    const movie = MovieCreateMapper.build(input);

    const alreadyMovie = await this.repository.findOne({ title: movie.title });
    if (alreadyMovie) throw new MovieAlreadyExistsError(movie.title);

    await this.repository.create(movie);
    return movie;
  }
}
