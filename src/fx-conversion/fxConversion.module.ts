import { Module } from '@nestjs/common';
import { FxRatesService } from 'src/fx-rates/fxRates.service';
import { FxConversionController } from './fxConversion.controller';
import { FxConversionService } from './fxConversion.service';

@Module({
  controllers: [FxConversionController],
  providers: [FxConversionService, FxRatesService],
})
export class FxConversionModule {}
