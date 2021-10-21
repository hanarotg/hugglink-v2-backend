import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exceoption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
        transformOptions: {
            enableImplicitConversion: true,
        }
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(3030);
}
bootstrap();
