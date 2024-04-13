import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';

@Injectable()
export class AccountsService {
  constructor(private readonly firebaseService: FirebaseService) {
    this.firebaseService.initializeApp();
  }
  
  private static balances = {
    USD: 0,
    EUR: 0,
    GBP: 0,
  };

  static topUpAccount(currency: string, amount: number): void { // Change method to static
    AccountsService.balances[currency] += amount;
  }

  static getBalance(): { balances: { [key: string]: number } } { // Change method to static
    return { balances: AccountsService.balances };
  }

  static reduceAmount(fromCurrency: string, amount: number): void { // Change method to static
    AccountsService.balances[fromCurrency] -= amount;
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.firebaseService.signUp(email, password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.firebaseService.login(email, password);
  }

  async logout(): Promise<void> {
    await this.firebaseService.logout();
  }
}