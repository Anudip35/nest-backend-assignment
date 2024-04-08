import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesService } from './fxRates.service';
import axios from 'axios';

jest.mock('axios');

describe('FxRatesService', () => {
  let service: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxRatesService],
    }).compile();

    service = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchFxRates', () => {
    it('should fetch fx rates from API and save them in memory', async () => {
      const mockResponse = {
        data: {
          'Realtime Currency Exchange Rate': { '5. Exchange Rate': '0.9' },
        },
      };
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';

      jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse as any);

      await service.fetchFxRates(fromCurrency, toCurrency);

      expect(service.getFxRate()).toEqual({ 'USD-EUR': { rate: 0.9, timestamp: expect.any(String) } });
    });

    it('should throw error when Incorrect api call', async () => {
      const fromCurrency = 'USD';
      const toCurrency = '78787';

      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Failed to fetch FX rates'));

      await expect(service.fetchFxRates(fromCurrency, toCurrency)).rejects.toThrow('Failed to fetch FX rates');
    });
  });
});
