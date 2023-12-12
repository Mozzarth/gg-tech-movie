import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieDelete } from '../app/movie.delete';

const mockMovieRepository: jest.Mocked<MovieRepository> = {
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('MovieDelete', () => {
  let movieDelete: MovieDelete;

  beforeEach(() => {
    movieDelete = new MovieDelete(mockMovieRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a movie by ID', async () => {
    const movieId = '123';
    await movieDelete.handle(movieId);
    expect(mockMovieRepository.delete).toHaveBeenCalledWith(movieId);
  });
});
