import { MovieNotExistError } from '../../shared/domain/errors/movie-not-exists.error';
import { MovieRepository } from 'src/app/shared/domain/movie.repository';

export class MovieSetWatched {
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Cambia el estado "watched" (visto) de una película identificada por su ID.
   * @param {string} id - El ID de la película cuyo estado de "watched" se va a cambiar.
   * @throws {MovieNotExistError} Si no se encuentra una película con el ID proporcionado.
   * @returns {Promise<Movie>} Una promesa que se resuelve con la película actualizada después de cambiar el estado de "watched".
   */
  async handle(id: string) {
    const movie = await this.repository.findById(id);
    if (!movie) throw new MovieNotExistError(id);

    return this.repository.update(id, { watched: !movie.watched });
  }
}
