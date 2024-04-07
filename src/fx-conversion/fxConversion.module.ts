import { Module } from '@nestjs/common';
import { FxConversionController } from './fxConversion.controller';
import { FxConversionService } from './fxConversion.service';

@Module({
  controllers: [FxConversionController],
  providers: [FxConversionService],
})
export class FxConversionModule {}
