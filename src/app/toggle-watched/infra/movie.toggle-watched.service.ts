import { MovieRepositoryMemory } from 'src/app/shared/infra/movie.repository.memory';
import { MovieSetWatched } from '../app/movie.toggle-watched';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieToggleWatchedService extends MovieSetWatched {
  constructor(movieRepository: MovieRepositoryMemory) {
    super(movieRepository);
  }
}
