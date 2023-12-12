import { MovieRepository } from 'src/app/shared/domain/movie.repository';
import { MovieCreate } from '../app/movie.create';
import { MovieCreateMapper } from '../app/movie.create-mapper';
import { MovieCreateInput } from '../app/movie.dto';
import { Movie } from 'src/app/shared/domain/movie';
import { MovieCreateService } from './movie.create.service';

const mockMovieRepository: jest.Mocked<MovieRepository> = {
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
};

jest.mock('../app/movie.create-mapper');

describe('MovieCreate', () => {
  let movieCreate: MovieCreateService;

  beforeEach(() => {
    movieCreate = new MovieCreate(mockMovieRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a movie when there is no existing movie with the same title', async () => {
    const input: MovieCreateInput = {
      title: 'title',
      description: 'description',
    };

    const movie: Movie = {
      id: 'aaa',
      watched: false,
      description: input.description,
      title: input.title,
      createdAt: new Date(),
    };

    (MovieCreateMapper.build as jest.Mock).mockReturnValueOnce(movie);
    mockMovieRepository.findOne.mockResolvedValueOnce(undefined);

    const result = await movieCreate.handle(input);

    expect(MovieCreateMapper.build).toHaveBeenCalledWith(input);
    expect(mockMovieRepository.findOne).toHaveBeenCalledWith({
      title: movie.title,
    });
    expect(mockMovieRepository.create).toHaveBeenCalledWith(movie);
    expect(result).toEqual(movie);
  });

  it('should throw an error when there is an existing movie with the same title', async () => {
    const input: MovieCreateInput = {
      title: 'title',
      description: 'description',
    };

    const movie = {
      id: 'bbb',
      watched: false,
      description: input.description,
      title: input.title,
      createdAt: new Date(),
    };

    (MovieCreateMapper.build as jest.Mock).mockReturnValueOnce(movie);
    mockMovieRepository.findOne.mockResolvedValueOnce(movie);

    await expect(movieCreate.handle(input)).rejects.toThrowError();
  });
});
