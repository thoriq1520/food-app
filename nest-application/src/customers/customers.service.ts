import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { Customers } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private customerRepository: Repository<Customers>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customers> {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAll(keyword: string, limit: number, page: number) {
    const query = this.customerRepository.createQueryBuilder('customer');
  
    if (keyword) {
      query.where('LOWER(customer.name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
    }
  
    const [customers, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  
    return { customers, total };
  }

  async findOne(id: number): Promise<Customers> {
    const customer = await this.customerRepository.findOne({ where: { customer_id: id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const result = await this.customerRepository.update(id, updateCustomerDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return result;
  }

  async remove(id: number): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }

  async removeAll(): Promise<number> {
    const result = await this.customerRepository.delete({});
    return result.affected;
  }
}
