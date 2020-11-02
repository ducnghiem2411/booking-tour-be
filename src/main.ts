import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  require('dotenv').config();
  // console.log('process.env.DB_NAME', process.env.DB_NAME);
  // console.log('process.env.DB_PASSWORD', process.env.DB_PASSWORD);
  
  const ENV = `${process.env.ENV || 'production'}`.toLowerCase();
  const PORT = process.env.PORT || 8000;
  
  const app = await NestFactory.create(AppModule);
  
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

