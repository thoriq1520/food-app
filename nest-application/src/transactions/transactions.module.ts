import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { Customers } from 'src/customers/customers.entity';
import { Foods } from 'src/foods/foods.entity';
import { CustomerModule } from 'src/customers/customers.module';
import { FoodsModule } from 'src/foods/foods.module';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction, Customers, Foods]),
  CustomerModule,
  FoodsModule
],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
