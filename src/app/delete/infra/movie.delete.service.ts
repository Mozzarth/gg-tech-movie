import { Injectable } from '@nestjs/common';
import { MovieDelete } from '../app/movie.delete';
import { MovieRepositoryMemory } from 'src/app/shared/infra/movie.repository.memory';

@Injectable()
export class MovieDeleteService extends MovieDelete {
  constructor(movieRepository: MovieRepositoryMemory) {
    super(movieRepository);
  }
}
