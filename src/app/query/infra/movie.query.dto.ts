import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBooleanString,
  IsInt,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

export class MovieQueryRequest {
  @IsOptional()
  @Transform((input: any) =>
    input.value == undefined ? null : input.value == 'true',
  )
  @ApiPropertyOptional()
  watched?: boolean;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional()
  @ValidateIf((object) => object.pageSize !== undefined)
  @Min(1)
  page?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional()
  @ValidateIf((object) => object.page !== undefined)
  @Min(1)
  pageSize?: number;
}
