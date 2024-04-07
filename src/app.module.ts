import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FxRatesModule } from './fx-rates/fxRates.module';
import { AccountsModule } from './accounts/accounts.module';
import { FxConversionModule } from './fx-conversion/fxConversion.module';

@Module({
  imports: [ScheduleModule.forRoot(), FxRatesModule, AccountsModule, FxConversionModule]
})
export class AppModule {}
