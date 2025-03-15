import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
// import { Influx } from '../providers/influx';
// import { Point } from '@influxdata/influxdb-client';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  // constructor(private readonly influx: Influx) {}
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    return next
      .handle()
      .pipe(
        tap(() => {
          const duration = Date.now() - start;
          const { method, originalUrl: path } = request;
          const status = response.statusCode;

          // const point = new Point('api_requests')
          //   .tag('host', request.hostname || 'unknown')
          //   .stringField('method', method)
          //   .stringField('path', path)
          //   .intField('status', status)
          //   .intField('duration', duration);

          // this.influx.writePoint('Ngx-Workshop', 'Ngx-Workshop-Bucket', point);
        }),
      );
  }
}
