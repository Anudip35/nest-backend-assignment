import { Injectable } from '@nestjs/common';
import { FxRatesService } from '../fx-rates/fxRates.service';

@Injectable()
export class FxConversionService {
  constructor(private readonly fxRatesService: FxRatesService) {}

  async convert(quoteId: string, fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    try {
      await this.fxRatesService.fetchFxRates(fromCurrency, toCurrency);
      const fxRate = this.fxRatesService.getFxRate(quoteId);
      console.log("Fxconversion.service calling- ", fxRate);
      const convertedAmount = amount * fxRate.rate;
      
      return convertedAmount;
    } catch (error) {
      throw new Error('Failed to perform FX conversion');
    }
  }
}
