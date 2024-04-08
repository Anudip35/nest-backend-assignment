import { Module } from '@nestjs/common';
import { FxRatesModule } from 'src/fx-rates/fxRates.module';
import { FxRatesService } from 'src/fx-rates/fxRates.service';
import { FxConversionController } from './fxConversion.controller';
import { FxConversionService } from './fxConversion.service';

@Module({
  // imports: [FxRatesModule],
  controllers: [FxConversionController],
  providers: [FxConversionService, FxRatesService],
})
export class FxConversionModule {}
