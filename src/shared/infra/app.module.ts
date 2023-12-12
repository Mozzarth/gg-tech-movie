import { CustomExceptionFilter } from './custom-exception.filter';
import { MovieModule } from '../../app/shared/infra/movie.module';
import { envVarsSchema } from '../../config/env-var.schema';
import { InfraestructureModule } from './infra.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
  controllers: [AppController],
  imports: [
    MovieModule,
    InfraestructureModule,
    ConfigModule.forRoot({ validationSchema: envVarsSchema }),
  ],
})
export class AppModule {}
