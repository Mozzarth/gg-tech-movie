import { MovieToggleWatchedService } from 'src/app/toggle-watched/infra/movie.toggle-watched.service';
import { MovieUpdateDetailService } from 'src/app/update-detail/infra/movie.update-detail.service';
import { MovieCreateService } from 'src/app/create/infra/movie.create.service';
import { MovieDeleteService } from 'src/app/delete/infra/movie.delete.service';
import { MovieQueryService } from 'src/app/query/infra/movie.query.service';
import { MovieRepositoryMemory } from './movie.repository.memory';
import { MovieController } from './movie.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MovieController],
  providers: [
    MovieQueryService,
    MovieCreateService,
    MovieDeleteService,
    MovieUpdateDetailService,
    MovieToggleWatchedService,
    MovieRepositoryMemory,
  ],
})
export class MovieModule {}
