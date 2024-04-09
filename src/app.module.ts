import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RateLimitMiddleware } from './rate-limit.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { FxRatesModule } from './fx-rates/fxRates.module';
import { AccountsModule } from './accounts/accounts.module';
import { FxConversionModule } from './fx-conversion/fxConversion.module';

@Module({
  imports: [ScheduleModule.forRoot(), FxRatesModule, AccountsModule, FxConversionModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('*');
  }
}
