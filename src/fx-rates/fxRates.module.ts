import { Module } from '@nestjs/common';
import { FxRatesController } from './fxRates.controller';
import { FxRatesService } from './fxRates.service';
import { FxRatesScheduler } from './fxRates.scheduler';

@Module({
  controllers: [FxRatesController],
  providers: [FxRatesService, FxRatesScheduler],
})
export class FxRatesModule {}
