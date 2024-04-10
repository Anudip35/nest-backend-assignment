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
      const fxRates = await this.fxRatesService.fetchFxRates();
      console.log("fxRates.controller calling- ",fxRates);

      if(Object.keys(fxRates).length === 0) {
        throw new HttpException('No FX rates available', HttpStatus.NOT_FOUND);
      }  

      const latestQuoteId = Object.keys(fxRates).reduce((latestId, currentId) => {
        const currentTimestamp = Date.parse(fxRates[currentId].timestamp);
        const latestTimestamp = Date.parse(fxRates[latestId].timestamp);
        return currentTimestamp > latestTimestamp ? currentId : latestId;
      });
  
      const expiryTimestamp = new Date(fxRates[latestQuoteId].timestamp).getTime() + 30 * 1000;
      const quoteId = latestQuoteId;
      const expiryAt = new Date(expiryTimestamp).toLocaleString();

      return { quoteId, expiry_at: expiryAt };
    } catch (error) {
      throw new HttpException('Failed to fetch FX rates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}