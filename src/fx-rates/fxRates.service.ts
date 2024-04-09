import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FxRatesService {
  private fxRates: { [key: string]: {rate: number; timestamp: string} } = {};
  private readonly EXPIRATION_TIME = 30 * 1000;

  async fetchFxRates(fromCurrency?: string, toCurrency?: string): Promise<Object> {
    try {
      if (!fromCurrency || !toCurrency) {
        fromCurrency = 'USD';
        toCurrency = 'EUR';
      }

      const cacheKey = `${fromCurrency}${toCurrency}`;

      // Check if the exchange rate is cached
      if (cacheKey in this.fxRates) {
        const cachedRate = this.fxRates[cacheKey];
        const currentTime = new Date().getTime();
        const cachedTime = new Date(cachedRate.timestamp).getTime();
        if (cachedTime > currentTime) {
          console.log("Cached data: ",cachedRate);
          return this.fxRates;
        }
      }

      const apiKey = process.env.API_KEY;
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`
      );
      
      const exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      const timestamp= new Date().toLocaleString();

      this.fxRates[cacheKey] = { rate: parseFloat(exchangeRate), timestamp };
      console.log("Fx Rate- ",cacheKey, " ",this.fxRates[cacheKey]);

      setTimeout(() => {
        delete this.fxRates[cacheKey];
        // console.log(`Expired FX rate for ${cacheKey}`);
      }, this.EXPIRATION_TIME);

      return this.fxRates;

    } catch (error) {
      // console.error("Failed to fetch rates");
      throw new Error('Failed to fetch FX rates');
    }
  }

  getFxRate(quoteId: string):{ rate: number; timestamp: string  } {
    return this.fxRates[quoteId];
  }
}
