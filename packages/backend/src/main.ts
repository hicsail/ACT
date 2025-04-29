import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    exposedHeaders: ['Content-Range']
  });

  const config = new DocumentBuilder()
    .setTitle('ACT Backend')
    .setDescription('ACT Backend connection')
    .setVersion('1.0')
    .addTag('ACT')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.error(JSON.stringify(validationErrors));
        return new BadRequestException(validationErrors);
      },
      transform: true
    }));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
