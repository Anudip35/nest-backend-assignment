import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Account {
  @ApiProperty({ type: String, description: 'Currency code (e.g., USD, EUR)' })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({ type: Number, description: 'Amount to top up' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
