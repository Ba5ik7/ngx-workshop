import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Influx } from '../providers/influx';
import { Point } from '@influxdata/influxdb-client';

@Catch()
export class LoggerExceptionFilter implements ExceptionFilter {
  constructor(private readonly influx: Influx) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const { method, originalUrl: path } = request;
    const duration = Date.now() - request['_startTime'];


    const point = new Point('api_requests')
      .tag('host', request.hostname || 'unknown')
      .stringField('method', method)
      .stringField('path', path)
      .intField('status', status)
      .intField('duration', duration);
    this.influx.writePoint('Ngx-Workshop', 'Ngx-Workshop-Bucket', point);

    response.status(status).json({
      message: exception.message,
    });
  }
}
