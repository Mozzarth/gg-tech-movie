import { MovieRepositoryMemory } from 'src/app/shared/infra/movie.repository.memory';
import { MovieCreate } from '../app/movie.create';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieCreateService extends MovieCreate {
  constructor(movieRepository: MovieRepositoryMemory) {
    super(movieRepository);
  }
}
