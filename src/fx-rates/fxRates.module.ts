import { Module } from '@nestjs/common';
import { FxRatesController } from './fxRates.controller';
import { FxRatesService } from './fxRates.service';
import { FxRatesScheduler } from './fxRates.scheduler';
import { FirebaseService } from '../firebase.service';

@Module({
  controllers: [FxRatesController],
  providers: [FxRatesService, FxRatesScheduler, FirebaseService],
})
export class FxRatesModule {}
