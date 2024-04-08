import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { FxRatesService } from './fxRates.service';

@Controller('fx-rates')
export class FxRatesController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  async getFxRates(): Promise<{ quoteId: string; expiry_at: string }> {
    try {
      const quoteId = Date.now().toString();
      const fxRates = this.fxRatesService.getFxRate(); // Fetch rates from memory

      if(Object.keys(fxRates).length === 0) {
        throw new HttpException('No FX rates available', HttpStatus.NOT_FOUND);
      }  
      
      const latestTimestamp = Object.values(fxRates).reduce((maxTimestamp, rate) => {
        return Math.max(maxTimestamp, +rate.timestamp); // Convert timestamp to number using unary plus operator (+)
      }, 0);

      const expiryAt = new Date(latestTimestamp + 30 * 1000).toISOString();
      console.log(fxRates);

      return { quoteId, expiry_at: expiryAt };
    } catch (error) {
      throw new HttpException('Failed to fetch FX rates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}