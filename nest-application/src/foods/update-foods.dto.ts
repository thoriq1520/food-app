import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-foods.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}
