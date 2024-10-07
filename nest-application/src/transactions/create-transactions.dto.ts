import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    customer_id: number;

    @IsNotEmpty()
    @IsNumber()
    food_id: number;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsOptional()
    @IsNumber()
    total_price?: number;

    @IsNotEmpty()
    @IsString()
    transaction_date: string;
}
