import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FxRatesService } from './fxRates.service';

@Injectable()
export class FxRatesScheduler {
  private readonly logger = new Logger(FxRatesScheduler.name);

  constructor(private readonly fxRatesService: FxRatesService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Fetching FX rates...');
    this.fxRatesService.fetchFxRates();
  }
}
