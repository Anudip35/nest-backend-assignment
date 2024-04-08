import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FxRatesService {
  private fxRates: { [key: string]: {rate: number; timestamp: string} } = {};
  private readonly EXPIRATION_TIME = 30 * 1000;
  private readonly API='KP0DTXKM2QO2QW94';

  async fetchFxRates(fromCurrency?: string, toCurrency?: string): Promise<number> {
    try {
      if (!fromCurrency || !toCurrency) {
        fromCurrency = 'USD';
        toCurrency = 'EUR';
      }

      const response = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${this.API}`
      );
    
      const exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      const timestamp= new Date().toLocaleString();;
      const key=`${fromCurrency}-${toCurrency}`;

      this.fxRates[key] = { rate: parseFloat(exchangeRate), timestamp };
      console.log("Fx Rates- ",this.fxRates);
      console.log(this.fxRates[key]);

      // setTimeout(() => {
      //   delete this.fxRates[key];
      //   console.log(`Expired FX rate for ${key}`);
      // }, this.EXPIRATION_TIME);

      return exchangeRate;

    } catch (error) {
      console.error('Error fetching FX rates:', error);
    }
  }

  getFxRate(): { [key: string]: {rate: number; timestamp: string} }{
    return this.fxRates;
  }
}
