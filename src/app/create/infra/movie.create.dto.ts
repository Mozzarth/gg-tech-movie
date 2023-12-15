import { ApiProperty } from '@nestjs/swagger';
import { MovieCreateInput } from '../app/movie.dto';
import { IsBoolean, IsString } from 'class-validator';

export class MovieCreateRequest implements MovieCreateInput {
  @IsString()
  @ApiProperty({ example: 'Assassin`s Creed' })
  title: string;

  @IsString()
  @ApiProperty({
    example:
      'Gracias a una tecnología revolucionaria, Cal Lynch experimenta las aventuras de Aguilar, su antepasado español del siglo XV...',
  })
  description: string;

  @IsBoolean()
  @ApiProperty({})
  watched: boolean;
}
