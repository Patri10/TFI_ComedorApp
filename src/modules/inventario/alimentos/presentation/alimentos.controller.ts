import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodService } from '../service/food.service';
import { CreateFoodRequestDto } from './dto/CreateFoodRequest.dto';
import { UpdateFoodRequestDto } from './dto/UpdateFoodRequest.dto';
import { DeleteFoodRequestDto } from './dto/DeleteFoodRequest.dto';
import { CreateFoodCommandDto } from '../service/dto/CreateFoodCommand.dto';
import { UpdateFoodCommandDto } from '../service/dto/UpdateFoodCommand.dto';
import DeleteFoodCommandDto from '../service/dto/DeleteFoodCommand.dto';
import { FoodCategory } from '../domain/model/food-category.enum';
import { FoodUnit } from '../domain/model/food-unit.enum';

@Controller('alimentos')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }

  @Post()
  create(@Body() createFoodRequestDto: CreateFoodRequestDto) {
    const command = new CreateFoodCommandDto(
      createFoodRequestDto.name,
      createFoodRequestDto.category,
      createFoodRequestDto.unit,
      createFoodRequestDto.stock,
      new Date(createFoodRequestDto.expiration_date)
    );
    return this.foodService.createFood(command);
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.foodService.getInventoryStats();
  }

  @Get('alerts/low-stock')
  getLowStock() {
    return this.foodService.getLowStockFoods();
  }

  @Get('alerts/expiring')
  getExpiring() {
    return this.foodService.getExpiringFoods();
  }

  @Get('categories')
  getCategories() {
    return Object.values(FoodCategory);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.foodService.findCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodRequestDto: UpdateFoodRequestDto) {
    const command = new UpdateFoodCommandDto(
      updateFoodRequestDto.name,
      updateFoodRequestDto.category,
      updateFoodRequestDto.unit,
      updateFoodRequestDto.stock,
      new Date(updateFoodRequestDto.expiration_date)
    );
    return this.foodService.updateFood(id, command);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const command = new DeleteFoodCommandDto(id);
    return this.foodService.deleteFood(command);
  }
}
