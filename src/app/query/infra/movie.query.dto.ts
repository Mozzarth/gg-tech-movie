import { PaginatedRequest } from 'src/app/shared/domain/pagination';
import { ApiProperty } from '@nestjs/swagger';

export class MovieQueryRequest implements PaginatedRequest {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;
}
