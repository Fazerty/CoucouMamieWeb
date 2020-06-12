import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!configService.isProduction()) {

    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Coucou Mamie API')
      .setDescription('Coucou Mamie API')
      .build());

    SwaggerModule.setup('docs', app, document);

  }

  await app.listen(3000);
}
bootstrap();
