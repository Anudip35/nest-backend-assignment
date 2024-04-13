import { Module } from '@nestjs/common';
import { FxRatesService } from 'src/fx-rates/fxRates.service';
import { FxConversionController } from './fxConversion.controller';
import { FxConversionService } from './fxConversion.service';
import {AccountsService} from '../accounts/accounts.service';
import { FirebaseService } from 'src/firebase.service';

@Module({
  controllers: [FxConversionController],
  providers: [FxConversionService, FxRatesService, FirebaseService, AccountsService],
})
export class FxConversionModule {}
