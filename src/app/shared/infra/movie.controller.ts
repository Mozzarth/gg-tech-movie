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

  /**
   * Crea una nueva película utilizando la información proporcionada.
   * @param {MovieCreateRequest} input - La información de la película que se va a crear.
   * @returns {Promise<Movie>} Una promesa que se resuelve con el resultado de la operación de creación.
   */
  @Post()
  create(@Body() input: MovieCreateRequest) {
    return this.createService.handle(input);
  }

  /**
   * Cambia el estado de "watched" (visto) de una película identificada por su ID.
   * @param {string} id - El ID de la película cuyo estado de "watched" se va a cambiar.
   * @returns {Promise<void>} Una promesa que se resuelve un void.
   */
  @Post(':id/toggle-watched')
  toggleWatched(@Param('id') id: string) {
    return this.toggleWatchedService.handle(id);
  }

  /**
   * Actualiza los detalles de una película identificada por su ID.
   * @param {string} id - El ID de la película cuyos detalles se van a actualizar.
   * @param {MovieUpdateDetailRequest} input - La información actualizada de los detalles de la película.
   * @returns {Promise<void>} Una promesa que se resuelve un void.
   */
  @Put(':id/detail')
  update(@Param('id') id: string, @Body() input: MovieUpdateDetailRequest) {
    return this.updateDetailService.handle(id, input);
  }

  /**
   * Elimina una película identificada por su ID.
   * @param {string} id - El ID de la película que se va a eliminar.
   * @returns {Promise<void>} Una promesa que se resuelve un void.
   */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteService.handle(id);
  }

  /**
   * Obtiene películas basadas en los parámetros de consulta proporcionados.
   * @param {MovieQueryRequest} query - Los parámetros de consulta para filtrar y paginar las películas.
   * @returns {Promise<PaginatedResponse<Movie[]>>} Una promesa que se resuelve con las movies.
   */
  @Get()
  get(@Query() query: MovieQueryRequest) {
    const { page, pageSize, watched } = query;
    let criteria = { watched };
    let paginate = { page, pageSize };
    if (watched == undefined) criteria = null;
    if (!page || !pageSize) paginate = null;

    return this.queryService.handle({ criteria, paginate });
  }
}
