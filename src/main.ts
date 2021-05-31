import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Documentación de la API')
    .setDescription('Documentacion de como funciona esta API')
    .setVersion('1.0')    
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  
  app.useGlobalPipes(new ValidationPipe({skipMissingProperties: true,}));
  app.enableCors();
  app.setGlobalPrefix("api/v1");

  await app.listen(3000);
}
bootstrap();
