import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foods } from './foods.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Foods])],
    controllers: [FoodsController],
    providers: [FoodsService],
    exports: [TypeOrmModule],
  })
  export class FoodsModule {}