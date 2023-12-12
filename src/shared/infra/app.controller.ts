import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class AppController {
  constructor() {}

  @Get()
  health() {}
}
