import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieFindDto } from 'src/app/shared/domain/movie.dto';

export class MovieQuery {
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Busca películas utilizando los criterios proporcionados.
   * @param {MovieFindDto} input - Los criterios de búsqueda para filtrar las películas.
   * @returns {Promise<Movie[]>} Una promesa que se resuelve con un array de películas que cumplen con los criterios de búsqueda.
   */
  handle(input: MovieFindDto) {
    return this.repository.find(input);
  }
}
