import { MovieUpdateDetail } from '../app/movie.update-detail';
import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieUpdateDetailInput } from '../app/movie.dto';

const mockMovieRepository: jest.Mocked<MovieRepository> = {
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

describe('MovieUpdateDetail', () => {
  let movieUpdateDetail: MovieUpdateDetail;

  beforeEach(() => {
    movieUpdateDetail = new MovieUpdateDetail(mockMovieRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update movie details', async () => {
    const movieId = '123';
    const updateInput: MovieUpdateDetailInput = {
      title: 'Updated Title',
      description: 'Updated Description',
    };

    mockMovieRepository.update.mockResolvedValueOnce();
    await movieUpdateDetail.handle(movieId, updateInput);

    expect(mockMovieRepository.update).toHaveBeenCalledWith(
      movieId,
      updateInput,
    );
  });
});
