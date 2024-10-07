import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, Put } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './create-foods.dto';
import { UpdateFoodDto } from './update-foods.dto';
import { ResponseDTO } from '../common/dto/response.dto';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createFoodDto: CreateFoodDto) {
    const food = await this.foodsService.create(createFoodDto);
    return new ResponseDTO(201, 'Food created successfully.', food);
  }

  @Get()
  async findAll(@Query('keyword') keyword: string, @Query('limit') limit = 10, @Query('page') page = 1) {
    const { foods, total } = await this.foodsService.findAll(keyword, limit, page);
    const pagination = new PaginationDTO(total, limit, page);
    return new ResponseDTO(200, 'Foods retrieved successfully.', foods, pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const food = await this.foodsService.findOne(id);
    return new ResponseDTO(200, 'Food retrieved successfully.', food);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateFoodDto: UpdateFoodDto) {
    await this.foodsService.update(id, updateFoodDto);
    return new ResponseDTO(200, 'Food updated successfully.', null);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.foodsService.remove(id);
    return new ResponseDTO(200, 'Food deleted successfully.', null);
  }

  @Delete()
  async removeAll() {
    const count = await this.foodsService.removeAll();
    return new ResponseDTO(200, `${count} Foods were deleted successfully!`, null);
  }
}
