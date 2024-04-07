import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FxRatesService {
  private fxRates: { [key: string]: number } = {};

  async fetchFxRates(): Promise<void> {
    try {
      const response = await axios.get(
        'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=RRD08OVEDV37N30P'
      );
    
      const exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      console.log(exchangeRate);
      this.fxRates['USD-EUR'] = parseFloat(exchangeRate);
    } catch (error) {
      console.error('Error fetching FX rates:', error);
    }
  }

  getFxRate(fromCurrency: string, toCurrency: string): number {
    const key = `${fromCurrency}-${toCurrency}`;
    return this.fxRates[key];
  }
}
