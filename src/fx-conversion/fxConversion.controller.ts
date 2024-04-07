import { Controller, Post, Body } from '@nestjs/common';
import { FxConversionDto } from './fxConversion.dto';
import { FxConversionService } from './fxConversion.service';

@Controller('fx-conversion')
export class FxConversionController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  @Post()
  convert(@Body() fxConversionDto: FxConversionDto): { convertedAmount: number, currency: string } {
    const { quoteId, fromCurrency, toCurrency, amount } = fxConversionDto;
    const convertedAmount = this.fxConversionService.convert(quoteId, fromCurrency, toCurrency, amount);
    return { convertedAmount, currency: toCurrency };
  }
}