import { Controller, Post, Body, Get, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { Account } from './account.dto';

@ApiTags('Accounts API')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  @ApiOperation({ summary: 'Top Up Account API', description: 'This API allows users to top up their account with a specified amount in a given currency.'})
  @ApiOkResponse({
    description: 'Account topped up Successfully!!',
    schema: {
      properties: {
        currency: { type: 'string' },
        amount: { type: 'number'}
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UsePipes(new ValidationPipe({ transform: true }))
  topUpAccount(@Body() account: Account): { message: string } {
    try {
      this.accountsService.topUpAccount(account.currency, account.amount);
      return { message: 'Account topped up successfully' };
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('balance')
  @ApiOperation({ summary: 'Balance API' , description: "This API retrieves the balances in all currencies for the user's account."})
  @ApiOkResponse({
    description: 'Return Account Balance',
    schema: {
      properties: {
        balances: { type: 'object' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  getBalance(): { balances: { [key: string]: number } } {
    try {
      return this.accountsService.getBalance();
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
