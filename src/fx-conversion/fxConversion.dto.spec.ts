import { validate } from 'class-validator';
import { FxConversionDto } from './fxConversion.dto';

describe('FxConversionDto', () => {
  it('should be valid', async () => {
    const dto = new FxConversionDto();
    dto.quoteId = 'USDEUR';
    dto.fromCurrency = 'USD';
    dto.toCurrency = 'EUR';
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should require quoteId', async () => {
    const dto = new FxConversionDto();
    dto.fromCurrency = 'USD';
    dto.toCurrency = 'EUR';
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should require fromCurrency', async () => {
    const dto = new FxConversionDto();
    dto.quoteId = 'USDEUR';
    dto.toCurrency = 'EUR';
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should require toCurrency', async () => {
    const dto = new FxConversionDto();
    dto.quoteId = 'USDEUR';
    dto.fromCurrency = 'USD';
    dto.amount = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should require amount', async () => {
    const dto = new FxConversionDto();
    dto.quoteId = 'USDEUR';
    dto.fromCurrency = 'USD';
    dto.toCurrency = 'EUR';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
