import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    req['_startTime'] = Date.now();
    await next();
  }
}
