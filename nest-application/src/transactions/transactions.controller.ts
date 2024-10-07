import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, NotFoundException, Options, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './create-transactions.dto';
import { UpdateTransactionDto } from './update-transactions.dto';
import { ResponseDTO } from '../common/dto/response.dto';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) {}

    @Options(':id')
    async options() {
        return; // Respond to preflight requests
    }
    @Post()
    @HttpCode(201)
    async create(@Body() createTransactionDto: CreateTransactionDto) {
        const transaction = await this.transactionService.create(createTransactionDto);
        return new ResponseDTO(201, 'Transaction created successfully.', transaction);
    }

    @Get()
    async findAll(@Query('keyword') keyword: string, @Query('limit') limit = 10, @Query('page') page = 1) {
        const { transactions, total } = await this.transactionService.findAll(keyword, limit, page);
        const pagination = new PaginationDTO(total, limit, page);
        return new ResponseDTO(200, 'Transactions retrieved successfully.', transactions, pagination);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const transaction = await this.transactionService.findOne(id);
        return new ResponseDTO(200, 'Transaction retrieved successfully.', transaction);
    }

    @Put(':id') 
    async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
      const updatedTransaction = await this.transactionService.update(+id, updateTransactionDto);
      if (!updatedTransaction) {
        throw new NotFoundException('Transaction not found'); 
      }
      return new ResponseDTO(200, 'Transaction updated successfully.', null); 
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.transactionService.remove(id);
        return new ResponseDTO(200, 'Transaction deleted successfully.', null);
    }

    @Delete()
    async removeAll() {
        const count = await this.transactionService.removeAll();
        return new ResponseDTO(200, `${count} Transactions were deleted successfully!`, null);
    }
}
