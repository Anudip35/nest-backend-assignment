import { Injectable } from '@nestjs/common';
import { FxRatesService } from '../fx-rates/fxRates.service';
import {AccountsService} from '../accounts/accounts.service';

@Injectable()
export class FxConversionService {
  constructor(private readonly fxRatesService: FxRatesService, private readonly accountsService: AccountsService) { }

  async convert(quoteId: string, fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    try {
      const checkBalance= AccountsService.getBalance();

      if(checkBalance.balances[fromCurrency]<amount){
        console.log("Insufficient Balance to perform conversion");
        return 0;
      }

      await this.fxRatesService.fetchFxRates(fromCurrency, toCurrency);
      const fxRate = this.fxRatesService.getFxRate(quoteId);

      console.log("Fxconversion.service calling- ", fxRate);
      AccountsService.reduceAmount(fromCurrency, amount);
      
      const convertedAmount = amount * fxRate.rate;
      AccountsService.topUpAccount(toCurrency, convertedAmount);

      return convertedAmount;
    } catch (error) {
      throw new Error('Failed to perform FX conversion');
    }
  }
}
