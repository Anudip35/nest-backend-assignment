import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class FxConversionDto {
  @IsNotEmpty()
  @IsString()
  quoteId: string;

  @IsNotEmpty()
  @IsString()
  fromCurrency: string;

  @IsNotEmpty()
  @IsString()
  toCurrency: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
