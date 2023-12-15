import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieUpdateDetailInput } from './movie.dto';

export class MovieUpdateDetail {
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Actualiza los detalles de una película identificada por su ID.
   * @param {string} id - El ID de la película cuyos detalles se van a actualizar.
   * @param {MovieUpdateDetailInput} input - La información actualizada de los detalles de la película.
   * @returns {Promise<Movie>} Una promesa que se resuelve con la película actualizada después de aplicar los cambios.
   */
  handle(id: string, input: MovieUpdateDetailInput) {
    return this.repository.update(id, input);
  }
}
