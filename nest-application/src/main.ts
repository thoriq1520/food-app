import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); 
  const port = configService.get<number>('PORT');
  app.setGlobalPrefix('api');

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  await app.listen(port || 3002);
}
bootstrap();