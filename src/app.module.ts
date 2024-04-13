import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FxRatesModule } from './fx-rates/fxRates.module';
import { AccountsModule } from './accounts/accounts.module';
import { FxConversionModule } from './fx-conversion/fxConversion.module';
import { FirebaseService } from './firebase.service';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [FirebaseService, {
    provide: APP_GUARD,
    useClass: RateLimiterGuard,
}],
  imports: [RateLimiterModule, ScheduleModule.forRoot(), FxRatesModule, AccountsModule, FxConversionModule]
})

export class AppModule {
  constructor(private readonly firebaseService: FirebaseService) {
    this.firebaseService.initializeApp();
  }
}
