import { SwaggerConfig } from './config/swagger.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infra/app.module';
async function bootstrap() {
  const port = process.env.API_PORT || 80;
  const pathDoc = 'doc';
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.handle({ app, pathDoc });

  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port} 🚀`);
    console.log(`Swagger documentation: http://localhost:${port}/doc 📃`);
  });
}
bootstrap();
