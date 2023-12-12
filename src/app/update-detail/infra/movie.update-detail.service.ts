import { MovieRepositoryMemory } from 'src/app/shared/infra/movie.repository.memory';
import { MovieUpdateDetail } from '../app/movie.update-detail';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieUpdateDetailService extends MovieUpdateDetail {
  constructor(movieRepository: MovieRepositoryMemory) {
    super(movieRepository);
  }
}
