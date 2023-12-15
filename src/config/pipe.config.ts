import { INestApplication, ValidationPipe } from '@nestjs/common';

export class PipeValidationConfig {
  static handle(app: INestApplication) {
    const validationError = { target: false, value: false };
    const pipe = new ValidationPipe({
      transform: true,
      validationError,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    });
    app.useGlobalPipes(pipe);
  }
}
