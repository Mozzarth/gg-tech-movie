import { Movie } from './movie';
import { PaginatedRequest } from './pagination';

export interface MovieFindDto {
  paginate?: PaginatedRequest;
  criteria?: Partial<Movie>;
}
