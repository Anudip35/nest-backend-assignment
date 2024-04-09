import { Injectable, NestMiddleware, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requestCount = 0;
  private lastReset = Date.now();

  async use(req: Request, res: Response, next: () => void) {
    try {
      if (this.requestCount >= 10) {
        const now = Date.now();
        const elapsed = now - this.lastReset;

        if (elapsed < 60000) {
          res.status(HttpStatus.TOO_MANY_REQUESTS).json({ message: 'Rate limit exceeded' });
          return;
        } else {
          this.requestCount = 0;
          this.lastReset = now;
        }
      }

      this.requestCount++;
      next();
    } catch (error) {
        console.error('Error in rate limiting middleware:', error);
        // throw new HttpException('Error in Rate Limiting', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
