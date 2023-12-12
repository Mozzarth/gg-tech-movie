import { MovieToggleWatchedService } from 'src/app/toggle-watched/infra/movie.toggle-watched.service';
import { MovieUpdateDetailService } from 'src/app/update-detail/infra/movie.update-detail.service';
import { MovieUpdateDetailRequest } from 'src/app/update-detail/infra/movie.update-detail.dto';
import { MovieDeleteService } from 'src/app/delete/infra/movie.delete.service';
import { MovieCreateService } from 'src/app/create/infra/movie.create.service';
import { MovieCreateRequest } from 'src/app/create/infra/movie.create.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieQueryService } from 'src/app/query/infra/movie.query.service';
import { MovieQueryRequest } from 'src/app/query/infra/movie.query.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(
    private readonly queryService: MovieQueryService,
    private readonly createService: MovieCreateService,
    private readonly deleteService: MovieDeleteService,
    private readonly updateDetailService: MovieUpdateDetailService,
    private readonly toggleWatchedService: MovieToggleWatchedService,
  ) {}

  @Post()
  create(@Body() input: MovieCreateRequest) {
    return this.createService.handle(input);
  }
  @Post(':id/toggle-watched')
  toggleWatched(@Param('id') id: string) {
    return this.toggleWatchedService.handle(id);
  }
  @Put(':id/detail')
  update(@Param('id') id: string, @Body() input: MovieUpdateDetailRequest) {
    return this.updateDetailService.handle(id, input);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteService.handle(id);
  }

  @Get()
  get(@Query() query: MovieQueryRequest) {
    return this.queryService.handle(query);
  }
}
