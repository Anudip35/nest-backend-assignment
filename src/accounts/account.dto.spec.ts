import { Account } from './account.dto';
import { validate } from 'class-validator';

describe('Account DTO', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account();
  });

  it('should be defined', () => {
    expect(account).toBeDefined();
  });

  it('should have valid currency and amount', async () => {
    account.currency = 'USD';
    account.amount = 100;

    const errors = await validate(account);
    expect(errors.length).toBe(0);
  });

  it('should not accept empty currency', async () => {
    account.currency = '';
    account.amount = 100;

    const errors = await validate(account);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not accept empty amount', async () => {
    account.currency = 'USD';
    account.amount = null;

    const errors = await validate(account);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not accept non-numeric amount', async () => {
    account.currency = 'USD';
    account.amount = '100' as any;

    const errors = await validate(account);
    expect(errors.length).toBeGreaterThan(0);
  });
});
