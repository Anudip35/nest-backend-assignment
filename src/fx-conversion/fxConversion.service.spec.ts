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
      const quoteId = '123';
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';
      const amount = 100;
      const exchangeRate = 0.9;
      const expectedConvertedAmount = amount * exchangeRate;

      jest.spyOn(fxRatesService, 'fetchFxRates').mockResolvedValue(exchangeRate);

      const convertedAmount = await service.convert(quoteId, fromCurrency, toCurrency, amount);

      expect(convertedAmount).toEqual(expectedConvertedAmount);
    });

    it('should throw an error when conversion fails', async () => {
      const quoteId = '123';
      const fromCurrency = 'USD';
      const toCurrency = '9898';
      const amount = 100;

      jest.spyOn(fxRatesService, 'fetchFxRates').mockRejectedValue(new Error('Failed to fetch FX rates'));

      await expect(service.convert(quoteId, fromCurrency, toCurrency, amount)).rejects.toThrow('Failed to perform FX conversion');
    });
  });
});
