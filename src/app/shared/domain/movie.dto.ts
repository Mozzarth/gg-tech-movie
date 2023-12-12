import { Movie } from './movie';
import { PaginatedRequest } from './pagination';

export interface MovieFindDto {
  paginated: PaginatedRequest;
  criteria?: Partial<Movie>;
}
