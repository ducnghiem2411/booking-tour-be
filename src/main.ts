import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exception-filter';
import { TransformInterceptor } from './shared/response-interceptor';

async function bootstrap() {
  require('dotenv').config();
  console.log('process.env', process.env.MONGODB_URI);
  
  const ENV = `${process.env.ENV || 'production'}`.toLowerCase();
  const PORT = process.env.PORT || 8000;
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor)
  app.useGlobalFilters(new HttpExceptionFilter)
  app.useGlobalPipes(new ValidationPipe)

  if (ENV !== 'production') {
    // API documentation
    const options = new DocumentBuilder()
    .setTitle('BOOKING TOUR')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/doc', app, document);
  }
  
  // Enable CORS
  app.enableCors();

  await app.listen(PORT);
  console.log(`App is listening on PORT ${PORT}`)
}
bootstrap();

