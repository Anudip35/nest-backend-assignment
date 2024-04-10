import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RateLimitMiddleware } from './rate-limit.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { FxRatesModule } from './fx-rates/fxRates.module';
import { AccountsModule } from './accounts/accounts.module';
import { FxConversionModule } from './fx-conversion/fxConversion.module';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  imports: [ScheduleModule.forRoot(), FxRatesModule, AccountsModule, FxConversionModule]
})
export class AppModule implements NestModule {
  constructor(private readonly firebaseService: FirebaseService) {
    this.firebaseService.initializeApp();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
