import { Movie } from './movie';
import { MovieFindDto } from './movie.dto';
import { PaginatedRequest, PaginatedResponse } from './pagination';

type update = Partial<Movie>;

export interface MovieRepository {
  create(input: Movie): Promise<void>;
  update(id: string, input: update): Promise<void>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<Movie | null>;
  findOne(criteria: Partial<Movie>): Promise<Movie | null>;
  find(input: MovieFindDto): Promise<PaginatedResponse<Movie>>;
}
