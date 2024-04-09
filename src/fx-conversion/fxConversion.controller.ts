import { Controller, Post, Body, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { FxConversionDto } from './fxConversion.dto';
import { FxConversionService } from './fxConversion.service';
import { ApiTags, ApiOperation, ApiResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('FX Conversion')
@Controller('fx-conversion')
export class FxConversionController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  @Post()
  @ApiOperation({ summary: 'FX Conversion API', description: 'This API performs an FX conversion using the provided quoteId and converts the specified amount from one currency to another.' })
  @ApiResponse({ status: 201, 
    description: 'FX Conversion Successfull', 
    schema: {
      properties: {
        convertedAmount: { type: 'number' },
        currency: { type: 'string' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Failed to perform FX conversion due to invalid input' })
  @ApiInternalServerErrorResponse({ description: 'Failed to perform FX conversion' })
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
