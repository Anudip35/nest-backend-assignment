import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  private balances = {
    USD: 0,
    EUR: 0,
    GBP: 0,
  };

  topUpAccount(currency: string, amount: number): void {
    this.balances[currency] += amount;
  }

  getBalance(): { balances: { [key: string]: number } } {
    return { balances: this.balances };
  }
}
