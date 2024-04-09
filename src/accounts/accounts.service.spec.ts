import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsService],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('topUpAccount', () => {
    it('should top up the account with the specified amount', () => {
      const currency = 'USD';
      const amount = 100;
      service.topUpAccount(currency, amount);
      const balances = service.getBalance();

      expect(balances.balances[currency]).toEqual(amount);
    });
  });

  describe('getBalance', () => {
    it('should return the balances in all currencies', () => {
      const balances = service.getBalance();

      expect(balances).toEqual({"balances": { "USD": 0, "EUR": 0, "GBP": 0 },});
    });
  });
});
