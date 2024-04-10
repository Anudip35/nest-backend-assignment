import { Controller, Post, Body, Get, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiResponse } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { Account } from './account.dto';
import { LoginDto, SignUpDto } from 'src/auth.dto';
import {FirebaseAuthGuard} from '../firebase-guard';
import { UseGuards } from '@nestjs/common/decorators';

@ApiTags('Accounts API')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  @UseGuards(FirebaseAuthGuard)
  @ApiResponse({ status: 403, description: 'Unauthorized Access. Please Login or SignIn' })
  @ApiOperation({ summary: 'Top Up Account API', description: 'This API allows users to top up their account with a specified amount in a given currency.'})
  @ApiResponse({ status: 201, 
    description: 'Account topped up successfully', 
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
  @UseGuards(FirebaseAuthGuard)
  @ApiResponse({ status: 403, description: 'Unauthorized Access. Please Login or SignIn' })
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

  @Post('signup')
  @ApiOperation({ summary: 'User Signup', description: 'Create a new user account' })
  @ApiResponse({ status: 201, description: 'User account created successfully' })
  @ApiBadRequestResponse({ description: 'Enter Valid Email and Password' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    const { email, password } = signUpDto;
    try {
      await this.accountsService.signUp(email, password);
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login', description: 'Authenticate user with email and password' })
  @ApiResponse({ status: 201, description: 'User authenticated successfully' })
  @ApiBadRequestResponse({ description: 'Enter Valid Email and Password' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async login(@Body() loginDto: LoginDto): Promise<void> {
    const { email, password } = loginDto;
    try {
      await this.accountsService.login(email, password);
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('logout')
  @UseGuards(FirebaseAuthGuard)
  @ApiResponse({ status: 403, description: 'Unauthorized Access. Please Login or SignIn' })
  @ApiOperation({ summary: 'User Logout', description: 'Logout user from the system' })
  @ApiResponse({ status: 201, description: 'User logged out successfully' })
  @ApiBadRequestResponse({ description: 'Failed to Logout' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async logout(): Promise<void> {
    try {
      await this.accountsService.logout();
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
