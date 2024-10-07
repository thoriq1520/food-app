import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { ResponseDTO } from '../common/dto/response.dto';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto);
    return new ResponseDTO(201, 'Customer created successfully.', customer);
  }

  @Get()
  async findAll(@Query('keyword') keyword: string, @Query('limit') limit = 10, @Query('page') page = 1) {
    const { customers, total } = await this.customerService.findAll(keyword, limit, page);
    const pagination = new PaginationDTO(total, limit, page);
    return new ResponseDTO(200, 'Customers retrieved successfully.', customers, pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const customer = await this.customerService.findOne(id);
    return new ResponseDTO(200, 'Customer retrieved successfully.', customer);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    await this.customerService.update(id, updateCustomerDto);
    return new ResponseDTO(200, 'Customer updated successfully.', null);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.customerService.remove(id);
    return new ResponseDTO(200, 'Customer deleted successfully.', null);
  }

  @Delete()
  async removeAll() {
    const count = await this.customerService.removeAll();
    return new ResponseDTO(200, `${count} Customers were deleted successfully!`, null);
  }
}
