import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';

@Injectable()
export class AccountsService {
  constructor(private readonly firebaseService: FirebaseService) {
    this.firebaseService.initializeApp();
  }
  
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