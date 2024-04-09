import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionController } from './fxConversion.controller';
import { FxConversionService } from './fxConversion.service';
import { FxConversionDto } from './fxConversion.dto';
import { FxRatesService } from '../fx-rates/fxRates.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('FxConversionController', () => {
  let controller: FxConversionController;
  let service: FxConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxConversionController],
      providers: [FxConversionService, FxRatesService],
    }).compile();

    controller = module.get<FxConversionController>(FxConversionController);
    service = module.get<FxConversionService>(FxConversionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('convert', () => {
    it('should convert currency successfully', async () => {
      const dto: FxConversionDto = {
        quoteId: 'USDEUR',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100,
      };

      const expectedResult = { convertedAmount: 90, currency: 'EUR' };
      jest.spyOn(service, 'convert').mockResolvedValue(expectedResult.convertedAmount);

      const result = await controller.convert(dto);
      expect(result).toEqual(expectedResult);
      expect(result).toHaveProperty('convertedAmount');
      expect(result).toHaveProperty('currency');
    });

    it('should throw internal server error when conversion fails', async () => {
      const dto: FxConversionDto = {
        quoteId: 'USDEUR',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        amount: 100,
      };

      jest.spyOn(service, 'convert').mockRejectedValue(new Error('Failed to perform FX conversion'));

      await expect(controller.convert(dto)).rejects.toThrow(new HttpException('Failed to perform FX conversion', HttpStatus.INTERNAL_SERVER_ERROR));
    });
  });
});
