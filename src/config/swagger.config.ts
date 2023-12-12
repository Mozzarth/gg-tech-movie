import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static handle(input: { app: INestApplication; pathDoc: string }) {
    const { app, pathDoc } = input;
    const config = new DocumentBuilder()
      .setTitle('Title example')
      .setDescription('Description API')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(pathDoc, app, document);
  }
}
