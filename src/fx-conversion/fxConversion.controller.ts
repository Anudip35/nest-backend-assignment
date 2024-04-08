import { Controller, Post, Body, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { FxConversionDto } from './fxConversion.dto';
import { FxConversionService } from './fxConversion.service';

@Controller('fx-conversion')
export class FxConversionController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async convert(@Body() fxConversionDto: FxConversionDto): Promise<{ convertedAmount: number, currency: string }> {
    const { quoteId, fromCurrency, toCurrency, amount } = fxConversionDto;

    try {
      const convertedAmount = await this.fxConversionService.convert(quoteId, fromCurrency, toCurrency, amount);

      if(convertedAmount === null || Number.isNaN(convertedAmount)) {
        throw new HttpException('Failed to perform FX conversion', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return { convertedAmount, currency: toCurrency };
    } catch (error) {
      throw new HttpException(error.message || 'Failed to perform FX conversion', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
