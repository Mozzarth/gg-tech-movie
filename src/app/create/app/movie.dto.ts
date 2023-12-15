import { Movie } from 'src/app/shared/domain/movie';

export class MovieCreateInput implements Partial<Movie> {
  title: string;
  watched: boolean;
  description: string;
}
