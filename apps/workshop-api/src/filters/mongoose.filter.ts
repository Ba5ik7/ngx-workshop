import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { MongoErrorCodes } from '../enums/mongo-error-codes.enum';

@Catch(MongoError)
export class MongooseFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    // This is a number in MongoServerError and a string in MongoDriverError
    const status = parseFloat(`${exception.code}`);

    response.status(MongoErrorHttpStatusMap.get(status)).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

export const MongoErrorHttpStatusMap = new Map([
  [MongoErrorCodes.DuplicateKey, HttpStatus.CONFLICT],
]);
