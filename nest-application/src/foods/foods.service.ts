import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateFoodDto } from './create-foods.dto';
import { UpdateFoodDto } from './update-foods.dto';
import { Foods } from './foods.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Foods)
    private foodRepository: Repository<Foods>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Foods> {
    const food = this.foodRepository.create(createFoodDto);
    return await this.foodRepository.save(food);
  }

  async findAll(keyword: string, limit: number, page: number) {
    const query = this.foodRepository.createQueryBuilder('food');

    if (keyword) {
      query.where('LOWER(food.food_name) LIKE LOWER(:keyword)', { keyword: `%${keyword}%` });
    }

    const [foods, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { foods, total };
  }

  async findOne(id: number): Promise<Foods> {
    const food = await this.foodRepository.findOne({ where: { food_id: id } });
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const result = await this.foodRepository.update(id, updateFoodDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return result;
  }

  async remove(id: number): Promise<void> {
    const result = await this.foodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
  }

  async removeAll(): Promise<number> {
    const result = await this.foodRepository.delete({});
    return result.affected;
  }
}
