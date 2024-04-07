import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TopUpDto {
  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
