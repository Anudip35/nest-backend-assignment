import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { FxRatesService } from './fxRates.service';
import { ApiTags, ApiOperation, ApiOkResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('FX Rate API')
@Controller('fx-rates')
export class FxRatesController {
  constructor(private readonly fxRatesService: FxRatesService) {}

  @Get()
  @ApiOperation({ summary: 'FX Rate API', description: 'This API fetches live FX conversion rates from memory stored in STEP 1. The system generates a quoteId and sends it in the response to the client.' })
  @ApiOkResponse({
    description: 'FX Rates fetched Successfully!!',
    schema: {
      properties: {
        quoteId: { type: 'string' },
        expiry_at: { type: 'string' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Failed to Fetch FX rates due to API limits reached!' })
  @ApiInternalServerErrorResponse({ description: 'Failed to fetch FX rates' })
  async getFxRates(): Promise<{ quoteId: string; expiry_at: string }> {
    try {
      const quoteId = Date.now().toString();
      const fxRates = this.fxRatesService.getFxRate(); // Fetch rates from memory
      console.log("Fx rates- ",fxRates);

      if(Object.keys(fxRates).length === 0) {
        throw new HttpException('No FX rates available', HttpStatus.NOT_FOUND);
      }  

      const latestTimestamp = Object.values(fxRates).reduce((maxTimestamp, rate) => {
        const timestamp = Date.parse(rate.timestamp);
        return Math.max(maxTimestamp, timestamp);
      }, 0);

      const expiryAt = new Date(latestTimestamp + 30 * 1000).toLocaleString();

      return { quoteId, expiry_at: expiryAt };
    } catch (error) {
      throw new HttpException('Failed to fetch FX rates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}