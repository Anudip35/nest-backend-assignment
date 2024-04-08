import { Controller, Post, Body, Get, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TopUpDto } from './topup.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  @UsePipes(new ValidationPipe({ transform: true }))
  topUpAccount(@Body() topUpDto: TopUpDto): { message: string } {
    try {
      this.accountsService.topUpAccount(topUpDto.currency, topUpDto.amount);
      return { message: 'Account topped up successfully' };
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('balance')
  getBalance(): { balances: { [key: string]: number } } {
    try {
      return this.accountsService.getBalance();
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
