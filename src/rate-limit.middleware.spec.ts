import { RateLimitMiddleware } from './rate-limit.middleware';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

describe('RateLimitMiddleware', () => {
  let middleware: RateLimitMiddleware;
  let request: Partial<Request>;
  let response: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(async () => {
    middleware = new RateLimitMiddleware();
    request = {};
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('use', () => {
    it('should pass through if request count is below limit', async () => {
      middleware['requestCount'] = 5;
      await middleware.use(request as Request, response as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reset request count and last reset time if elapsed time is greater than 1 minute', async () => {
      middleware['requestCount'] = 10;
      middleware['lastReset'] = Date.now() - 61000;
      await middleware.use(request as Request, response as Response, nextFunction);
      expect(middleware['requestCount']).toBe(1);
      expect(middleware['lastReset']).toBeGreaterThan(Date.now() - 60000);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should return 429 status if request count exceeds limit', async () => {
      middleware['requestCount'] = 10;
      await middleware.use(request as Request, response as Response, nextFunction);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.TOO_MANY_REQUESTS);
      expect(response.json).toHaveBeenCalledWith({ message: 'Rate limit exceeded' });
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });
});
