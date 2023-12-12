import { ApiProperty } from '@nestjs/swagger';
import { MovieCreateInput } from '../app/movie.dto';

export class MovieCreateRequest implements MovieCreateInput {
  @ApiProperty({ example: 'Assassin`s Creed' })
  title: string;

  @ApiProperty({
    example:
      'Gracias a una tecnología revolucionaria, Cal Lynch experimenta las aventuras de Aguilar, su antepasado español del siglo XV...',
  })
  description: string;
}
