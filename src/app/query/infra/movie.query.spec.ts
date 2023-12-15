import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieQuery } from '../app/movie.query';
import { PaginatedRequest } from 'src/app/shared/domain/pagination';
import { Movie } from 'src/app/shared/domain/movie';
import { PaginatedResponse } from 'src/app/shared/domain/pagination';
import { MovieFindDto } from 'src/app/shared/domain/movie.dto';

const mockMovieRepository: jest.Mocked<MovieRepository> = {
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('MovieQuery', () => {
  let movieQuery: MovieQuery;

  beforeEach(() => {
    movieQuery = new MovieQuery(mockMovieRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should query movies with pagination', async () => {
    const input: MovieFindDto = {
      paginate: { page: 1, pageSize: 10 },
    };

    const paginatedMovies: Movie[] = [];

    const totalItems = paginatedMovies.length;

    mockMovieRepository.find.mockResolvedValueOnce({
      pagination: {
        page: input.paginate.page,
        pageSize: input.paginate.pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / input.paginate.pageSize),
      },
      data: paginatedMovies,
    });

    const result: PaginatedResponse<Movie> = await movieQuery.handle(input);

    expect(mockMovieRepository.find).toHaveBeenCalledWith(input);
    expect(result.pagination).toEqual({
      page: input.paginate.page,
      pageSize: input.paginate.pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / input.paginate.pageSize),
    });
    expect(result.data).toEqual(paginatedMovies);
  });
});
