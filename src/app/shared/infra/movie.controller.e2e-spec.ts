import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieCreateService } from 'src/app/create/infra/movie.create.service';
import { MovieDeleteService } from 'src/app/delete/infra/movie.delete.service';
import { MovieUpdateDetailService } from 'src/app/update-detail/infra/movie.update-detail.service';
import { MovieToggleWatchedService } from 'src/app/toggle-watched/infra/movie.toggle-watched.service';
import { MovieQueryService } from 'src/app/query/infra/movie.query.service';
import { MovieCreateRequest } from 'src/app/create/infra/movie.create.dto';
import { MovieUpdateDetailRequest } from 'src/app/update-detail/infra/movie.update-detail.dto';
import { MovieQueryRequest } from 'src/app/query/infra/movie.query.dto';

describe('MovieController (E2E)', () => {
  let app: INestApplication;
  let movieController: MovieController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieCreateService,
        MovieDeleteService,
        MovieUpdateDetailService,
        MovieToggleWatchedService,
        MovieQueryService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    movieController = moduleFixture.get<MovieController>(MovieController);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/movie (POST)', async () => {
    const createRequest: MovieCreateRequest = {
      title: 'title',
      description: '',
    };

    const result = await movieController.create(createRequest);

    expect(result).toBeDefined();
    console.log({ result });
    // Añade más aserciones según la respuesta esperada
  });

  it('/movie/toggle/:id (POST)', async () => {
    const id = '1';

    const result = await movieController.toggleWatched(id);

    expect(result).toBeDefined();
  });

  it('/movie/detail/:id (PUT)', async () => {
    const id = '1';
    const updateRequest: MovieUpdateDetailRequest = {
      title: 'nuevo title',
    };

    const result = await movieController.update(id, updateRequest);

    expect(result).toBeDefined();
    // Añade más aserciones según la respuesta esperada
  });

  it('/movie/:id (DELETE)', async () => {
    const id = '1';

    const result = await movieController.delete(id);

    expect(result).toBeDefined();
    // Añade más aserciones según la respuesta esperada
  });

  it('/movie (GET)', async () => {
    const queryRequest: MovieQueryRequest = {
      page: 1,
      pageSize: 10,
    };

    const result = await movieController.get(queryRequest);

    expect(result).toBeDefined();
    // Añade más aserciones según la respuesta esperada
  });
});
