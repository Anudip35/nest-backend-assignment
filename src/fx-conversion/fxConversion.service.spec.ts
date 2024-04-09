import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionService } from './fxConversion.service';
import { FxRatesService } from '../fx-rates/fxRates.service';

describe('FxConversionService', () => {
  let service: FxConversionService;
  let fxRatesService: FxRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FxConversionService,
        {
          provide: FxRatesService,
          useValue: {
            fetchFxRates: jest.fn(),
            getFxRate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FxConversionService>(FxConversionService);
    fxRatesService = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convert', () => {
    it('should convert currency successfully', async () => {
      const quoteId = 'USDEUR';
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';
      const amount = 100;
      const exchangeRate = { rate: 0.9, timestamp: '9/4/2024, 11:23:07 pm' };
      const expectedConvertedAmount = amount * exchangeRate.rate;

      jest.spyOn(fxRatesService, 'fetchFxRates').mockResolvedValue(exchangeRate);
      jest.spyOn(fxRatesService, 'getFxRate').mockReturnValue(exchangeRate);

      const convertedAmount = await service.convert(quoteId, fromCurrency, toCurrency, amount);

      expect(convertedAmount).toEqual(expectedConvertedAmount);
    });

    it('should throw an error when conversion fails', async () => {
      const quoteId = 'USDEUR';
      const fromCurrency = 'USD';
      const toCurrency = '9898';
      const amount = 100;

      jest.spyOn(fxRatesService, 'fetchFxRates').mockRejectedValue(new Error('Failed to fetch FX rates'));

      await expect(service.convert(quoteId, fromCurrency, toCurrency, amount)).rejects.toThrow('Failed to perform FX conversion');
    });
  });
});
