import { MovieNotExistError } from '../../shared/domain/errors/movie-not-exists.error';
import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieSetWatched } from '../app/movie.toggle-watched';

const mockMovieRepository: jest.Mocked<MovieRepository> = {
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('MovieSetWatched', () => {
  let movieSetWatched: MovieSetWatched;

  beforeEach(() => {
    movieSetWatched = new MovieSetWatched(mockMovieRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set movie as watched', async () => {
    const movieId = '123';
    const existingMovie = {
      id: movieId,
      watched: false,
      title: '',
      description: '',
      createdAt: new Date(),
    };

    mockMovieRepository.findById.mockResolvedValueOnce(existingMovie);
    mockMovieRepository.update.mockResolvedValueOnce();

    await movieSetWatched.handle(movieId);

    expect(mockMovieRepository.findById).toHaveBeenCalledWith(movieId);
    expect(mockMovieRepository.update).toHaveBeenCalledWith(movieId, {
      watched: true,
    });
  });

  it('should set movie as unwatched', async () => {
    const movieId = '456';
    const existingMovie = {
      id: movieId,
      title: '',
      watched: true,
      description: '',
      createdAt: new Date(),
    };

    mockMovieRepository.findById.mockResolvedValueOnce(existingMovie);
    mockMovieRepository.update.mockResolvedValueOnce();

    await movieSetWatched.handle(movieId);

    expect(mockMovieRepository.findById).toHaveBeenCalledWith(movieId);
    expect(mockMovieRepository.update).toHaveBeenCalledWith(movieId, {
      watched: false,
    });
  });

  it('should throw MovieNotExistError if movie does not exist', async () => {
    const nonExistingMovieId = '789';
    mockMovieRepository.findById.mockResolvedValueOnce(null);

    await expect(
      movieSetWatched.handle(nonExistingMovieId),
    ).rejects.toThrowError(MovieNotExistError);
    expect(mockMovieRepository.findById).toHaveBeenCalledWith(
      nonExistingMovieId,
    );
    expect(mockMovieRepository.update).not.toHaveBeenCalled();
  });
});
