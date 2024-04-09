import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesController } from './fxRates.controller';
import { FxRatesService } from './fxRates.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('FxRatesController', () => {
  let controller: FxRatesController;
  let service: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxRatesController],
      providers: [FxRatesService],
    }).compile();

    controller = module.get<FxRatesController>(FxRatesController);
    service = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFxRates', () => {
    it('should return fx rates and expiry information', async () => {
      const fxRatesMock = {
        'USD-EUR': { rate: 0.9, timestamp: new Date().toLocaleString() },
      };
      jest.spyOn(service, 'fetchFxRates').mockResolvedValueOnce(fxRatesMock);

      const result = await controller.getFxRates();

      expect(result).toEqual({
        quoteId: expect.any(String),
        expiry_at: expect.any(String),
      });
    });

    it('should throw an internal server error when fetching fx rates fails', async () => {
      jest.spyOn(service, 'fetchFxRates').mockRejectedValueOnce(new Error('Failed to fetch FX rates'));

      await expect(controller.getFxRates()).rejects.toThrow(
        new HttpException('Failed to fetch FX rates', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });
});
