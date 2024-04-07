import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from './fxRates.service';

@Controller('fx-rates')
export class FxRatesController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  getFxRates(): { quoteId: string; expiry_at: string } {
    const quoteId = Date.now().toString();
    const expiry_at = (Date.now() + 30000).toString(); // 30 seconds expiry
    return { quoteId, expiry_at };
  }
}