import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { LoggerInterceptor } from './interceptors/logger.Interceptor';
import { Influx } from './providers/influx';
import { LoggerExceptionFilter } from './filters/logger-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const influxProvider = app.get(Influx);
  app.useGlobalInterceptors(new LoggerInterceptor(influxProvider));
  app.useGlobalFilters(new LoggerExceptionFilter(influxProvider));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4100, '127.0.0.1');
}
bootstrap();
