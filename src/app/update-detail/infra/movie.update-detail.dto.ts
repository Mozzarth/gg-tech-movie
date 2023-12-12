import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieUpdateDetailInput } from '../app/movie.dto';

export class MovieUpdateDetailRequest implements MovieUpdateDetailInput {
  @ApiPropertyOptional({ example: 'Assassin`s Creed' })
  title?: string;

  @ApiPropertyOptional({
    example:
      'Gracias a una tecnología revolucionaria, Cal Lynch experimenta las aventuras de Aguilar, su antepasado español del siglo XV...',
  })
  description?: string;
}
