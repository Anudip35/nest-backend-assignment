import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesScheduler } from './fxRates.scheduler';
import { FxRatesService } from './fxRates.service';

describe('FxRatesScheduler', () => {
  let scheduler: FxRatesScheduler;
  let fxRatesService: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxRatesScheduler, FxRatesService],
    }).compile();

    scheduler = module.get<FxRatesScheduler>(FxRatesScheduler);
    fxRatesService = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(scheduler).toBeDefined();
  });

  describe('handleCron', () => {
    it('should fetch FX rates from the service', () => {
      const fetchFxRatesSpy = jest.spyOn(fxRatesService, 'fetchFxRates').mockImplementation();

      scheduler.handleCron();

      expect(fetchFxRatesSpy).toHaveBeenCalled();
    });

    it('should log a debug message', () => {
      const loggerSpy = jest.spyOn(scheduler['logger'], 'debug').mockImplementation();

      scheduler.handleCron();
      
      expect(loggerSpy).toHaveBeenCalledWith('Fetching FX rates...');
    });
  });
});
