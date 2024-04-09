import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesScheduler } from './fxRates.scheduler';
import { FxRatesService } from './fxRates.service';
import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

describe('FxRatesScheduler', () => {
  let scheduler: FxRatesScheduler;
  let fxRatesService: FxRatesService;

  beforeEach(async () => {
    jest.useFakeTimers();

    const module: TestingModule = await Test.createTestingModule({
      providers: [FxRatesScheduler, FxRatesService],
    }).compile();

    scheduler = module.get<FxRatesScheduler>(FxRatesScheduler);
    fxRatesService = module.get<FxRatesService>(FxRatesService);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(scheduler).toBeDefined();
  });

  describe('handleCron', () => {
    it('should fetch FX rates from the service', () => {
      const fetchFxRatesSpy = jest.spyOn(fxRatesService, 'fetchFxRates').mockResolvedValue({});

      scheduler.handleCron();

      expect(fetchFxRatesSpy).toHaveBeenCalledTimes(6);
    });

    it('should log a debug message', () => {
      const loggerSpy = jest.spyOn(scheduler['logger'], 'debug').mockImplementation();

      scheduler.handleCron();

      expect(loggerSpy).toHaveBeenCalledWith('Fetching FX rates...');
    });

    it('should call fetchFxRates for each currency pair', () => {
      const fetchFxRatesSpy = jest.spyOn(fxRatesService, 'fetchFxRates').mockResolvedValue({});

      scheduler.handleCron();

      expect(fetchFxRatesSpy).toHaveBeenCalledWith('USD', 'GBP');
      expect(fetchFxRatesSpy).toHaveBeenCalledWith('EUR', 'GBP');
      expect(fetchFxRatesSpy).toHaveBeenCalledWith('EUR', 'USD');
      expect(fetchFxRatesSpy).toHaveBeenCalledWith('GBP', 'USD');
      expect(fetchFxRatesSpy).toHaveBeenCalledWith('GBP', 'EUR');
      expect(fetchFxRatesSpy).toHaveBeenCalledWith('USD', 'EUR');
    });
  });
});
