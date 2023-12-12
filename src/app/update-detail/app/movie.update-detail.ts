import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieUpdateDetailInput } from './movie.dto';

export class MovieUpdateDetail {
  constructor(private readonly repository: MovieRepository) {}

  handle(id: string, input: MovieUpdateDetailInput) {
    return this.repository.update(id, input);
  }
}
