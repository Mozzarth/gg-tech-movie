import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieQuery } from '../app/movie.query';
import { PaginatedRequest } from 'src/app/shared/domain/pagination';
import { Movie } from 'src/app/shared/domain/movie';
import { PaginatedResponse } from 'src/app/shared/domain/pagination';

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
    const input: PaginatedRequest = {
      page: 1,
      pageSize: 10,
    };

    const paginatedMovies: Movie[] = [];

    const totalItems = paginatedMovies.length;

    mockMovieRepository.find.mockResolvedValueOnce({
      pagination: {
        page: input.page,
        pageSize: input.pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / input.pageSize),
      },
      data: paginatedMovies,
    });

    const result: PaginatedResponse<Movie> = await movieQuery.handle(input);

    expect(mockMovieRepository.find).toHaveBeenCalledWith({
      paginated: input,
      criteria: {},
    });
    expect(result.pagination).toEqual({
      page: input.page,
      pageSize: input.pageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / input.pageSize),
    });
    expect(result.data).toEqual(paginatedMovies);
  });
});
