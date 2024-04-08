import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FxConversionDto {
  @ApiProperty({ type: String, description: 'Quote ID' })
  @IsNotEmpty()
  @IsString()
  quoteId: string;

  @ApiProperty({ type: String, description: 'Currency code to convert from (e.g., USD, EUR)' })
  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @ApiProperty({ type: String, description: 'Currency code to convert to (e.g., USD, EUR)' })
  @IsNotEmpty()
  @IsString()
  toCurrency: string;

  @ApiProperty({ type: Number, description: 'Amount to convert' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
