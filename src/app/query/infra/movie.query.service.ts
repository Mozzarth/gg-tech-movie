import { Injectable } from '@nestjs/common';
import { MovieQuery } from '../app/movie.query';
import { MovieRepositoryMemory } from 'src/app/shared/infra/movie.repository.memory';

@Injectable()
export class MovieQueryService extends MovieQuery {
  constructor(movieRepository: MovieRepositoryMemory) {
    super(movieRepository);
  }
}
