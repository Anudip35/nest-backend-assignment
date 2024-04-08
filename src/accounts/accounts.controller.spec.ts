import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('topUpAccount', () => {
    it('should top up the account successfully', () => {
      const currency = 'USD';
      const amount = 100;
      jest.spyOn(service, 'topUpAccount').mockImplementation(() => {});

      const result = controller.topUpAccount({ currency, amount });

      expect(result).toEqual({ message: 'Account topped up successfully' });
      expect(service.topUpAccount).toHaveBeenCalledWith(currency, amount);
    });

    it('should throw an internal server error', () => {
      const currency = 'USD';
      const amount = 100;
      jest.spyOn(service, 'topUpAccount').mockImplementation(() => {
        throw new Error('Internal server error');
      });

      expect(() => controller.topUpAccount({ currency, amount })).toThrow(
        new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });

  describe('getBalance', () => {
    it('should return the account balances', () => {
      const balances = { USD: 100, EUR: 200, GBP: 300 };
      jest.spyOn(service, 'getBalance').mockReturnValue({ balances });

      const result = controller.getBalance();

      expect(result).toEqual({ balances });
      expect(service.getBalance).toHaveBeenCalled();
    });

    it('should throw an internal server error', () => {
      jest.spyOn(service, 'getBalance').mockImplementation(() => {
        throw new Error('Internal server error');
      });

      expect(() => controller.getBalance()).toThrow(
        new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });
});
