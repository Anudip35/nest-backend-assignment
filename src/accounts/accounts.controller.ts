import { Controller, Post, Body, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TopUpDto } from './topup.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  topUpAccount(@Body() topUpDto: TopUpDto): { message: string } {
    this.accountsService.topUpAccount(topUpDto.currency, topUpDto.amount);
    return { message: 'Account topped up successfully' };
  }

  @Get('balance')
  getBalance(): { balances: { [key: string]: number } } {
    return this.accountsService.getBalance();
  }
}
