import { Movie } from 'src/app/shared/domain/movie';
import { MovieCreateInput } from './movie.dto';
import { StringHelper } from '../../../shared/app/string.helper';

export class MovieCreateMapper {
  static build(input: MovieCreateInput): Movie {
    return {
      id: StringHelper.uuid(),
      watched: false,
      title: input.title,
      createdAt: new Date(),
      description: input.description,
    };
  }
}
