import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './create-transactions.dto';
import { UpdateTransactionDto } from './update-transactions.dto';
import { Transaction } from './transactions.entity';
import { Customers } from 'src/customers/customers.entity';
import { Foods } from 'src/foods/foods.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(Customers)
        private customerRepository: Repository<Customers>,
        @InjectRepository(Foods)
        private foodRepository: Repository<Foods>,
    ) {}

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        // Fetch the customer and food entities
        const customer = await this.customerRepository.findOne({ where: { customer_id: createTransactionDto.customer_id } });
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${createTransactionDto.customer_id} not found`);
        }

        const food = await this.foodRepository.findOne({ where: { food_id: createTransactionDto.food_id } });

        if (!food) {
            throw new NotFoundException(`Food with ID ${createTransactionDto.food_id} not found`);
        }

        // Create a new transaction instance
        const transaction = this.transactionRepository.create({
            customer,
            food,
            qty: createTransactionDto.qty,
            total_price: createTransactionDto.total_price,
            transaction_date: createTransactionDto.transaction_date,
        });

        return await this.transactionRepository.save(transaction);
    }

    async findAll(keyword: string, limit: number, page: number) {
        const query = this.transactionRepository.createQueryBuilder('transaction')
            .leftJoinAndSelect('transaction.customer', 'customer')
            .leftJoinAndSelect('transaction.food', 'food');

        if (keyword) {
            query.where('LOWER(customer.name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` })
                 .orWhere('LOWER(food.food_name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
        }

        const [transactions, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return { transactions, total };
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOne({ where: { transaction_id: id }, relations: ['customer', 'food'] });
        if (!transaction) {
            throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        // Fetch the transaction to update
        const transaction = await this.transactionRepository.findOne({ where: { transaction_id: id } });
        if (!transaction) {
            throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
    
        // Fetch the related customer and food entities if their IDs are provided in the DTO
        if (updateTransactionDto.customer_id) {
            const customer = await this.customerRepository.findOne({ where: { customer_id: updateTransactionDto.customer_id } });
            if (!customer) {
                throw new NotFoundException(`Customer with ID ${updateTransactionDto.customer_id} not found`);
            }
            transaction.customer = customer;
        }
    
        if (updateTransactionDto.food_id) {
            const food = await this.foodRepository.findOne({ where: { food_id: updateTransactionDto.food_id } });
            if (!food) {
                throw new NotFoundException(`Food with ID ${updateTransactionDto.food_id} not found`);
            }
            transaction.food = food;
        }
    
        // Update other fields
        transaction.qty = updateTransactionDto.qty || transaction.qty;
        transaction.total_price = updateTransactionDto.total_price || transaction.total_price;
        transaction.transaction_date = updateTransactionDto.transaction_date || transaction.transaction_date;
    
        // Save the updated transaction
        return await this.transactionRepository.save(transaction);
    }
    

    async remove(id: number): Promise<void> {
        const result = await this.transactionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
    }

    async removeAll(): Promise<number> {
        const result = await this.transactionRepository.delete({});
        return result.affected;
    }
}
