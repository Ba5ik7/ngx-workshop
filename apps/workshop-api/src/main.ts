import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { LoggerInterceptor } from './interceptors/logger.Interceptor';
import { LoggerExceptionFilter } from './filters/logger-exception.filter';
// import { Influx } from './providers/influx';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const influxProvider = app.get(Influx);
  // app.useGlobalInterceptors(new LoggerInterceptor(influxProvider));
  // app.useGlobalFilters(new LoggerExceptionFilter(influxProvider));
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new LoggerExceptionFilter());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4100, '127.0.0.1');
}
bootstrap();
