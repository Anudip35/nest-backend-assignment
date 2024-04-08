import { Injectable } from '@nestjs/common';
import { FxRatesService } from '../fx-rates/fxRates.service';

@Injectable()
export class FxConversionService {
  constructor(private readonly fxRatesService: FxRatesService) {}

  async convert(quoteId: string, fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    try {
      const exchangeRate = await this.fxRatesService.fetchFxRates(fromCurrency, toCurrency);
      const convertedAmount = amount * exchangeRate;
      
      return convertedAmount;
    } catch (error) {
      throw new Error('Failed to perform FX conversion');
    }
  }
}
