import { MovieRepository } from 'src/app/shared/domain/movie.repository';

/**
 * Clase que maneja la lógica de eliminación de películas.
 */
export class MovieDelete {
  /**
   * Dependencia de MovieDelete. Inversion de dependencia
   * @param {MovieRepository} repository - Repositorio utilizado para acceder a la capa de datos de las películas.
   */
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Elimina una película identificada por su ID.
   * @param {string} id - El ID de la película que se va a eliminar.
   * @returns {Promise<void>} Una promesa que se resuelve después de la eliminación exitosa.
   */
  handle(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
