import { MovieAlreadyExistsError } from '../../shared/domain/errors/movie-already-exists.error';
import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieCreateMapper } from './movie.create-mapper';
import { MovieCreateInput } from './movie.dto';

export class MovieCreate {
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Crea una nueva película utilizando la información proporcionada.
   * @param {MovieCreateInput} input - La información necesaria para crear la película.
   * @throws {MovieAlreadyExistsError} Si ya existe una película con el mismo título.
   * @returns {Promise<Movie>} Una promesa que se resuelve con la película creada.
   */
  async handle(input: MovieCreateInput) {
    const movie = MovieCreateMapper.build(input);

    const alreadyMovie = await this.repository.findOne({ title: movie.title });
    if (alreadyMovie) throw new MovieAlreadyExistsError(movie.title);

    await this.repository.create(movie);
    return movie;
  }
}
