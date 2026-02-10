import { Injectable, Inject } from '@nestjs/common';
import { CreateFoodCommandDto } from './dto/CreateFoodCommand.dto';
import { UpdateFoodCommandDto } from './dto/UpdateFoodCommand.dto';
import DeleteFoodCommandDto from './dto/DeleteFoodCommand.dto';
import Food from '../domain/model/food';
import type { FoodRepository } from '../domain/contract/food.repository';

export interface FoodWithStatus {
  id?: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
  expiration_date: string;
  status: 'good' | 'low' | 'critical' | 'expiring';
  daysUntilExpiry?: number;
}

@Injectable()
export class FoodService {
  // Umbrales configurables
  private readonly CRITICAL_STOCK_PERCENTAGE = 0.3;
  private readonly LOW_STOCK_PERCENTAGE = 1.0;
  private readonly MIN_STOCK_DEFAULT = 10;
  private readonly EXPIRING_DAYS_THRESHOLD = 7;

  constructor(@Inject('FoodRepository') private readonly foodRepository: FoodRepository) { }

  /**
   * Calcula el estado de un alimento basado en stock y fecha de vencimiento
   */
  private calculateFoodStatus(food: any): 'good' | 'low' | 'critical' | 'expiring' {
    const minStock = this.MIN_STOCK_DEFAULT;
    const daysUntilExpiry = this.getDaysUntilExpiry(food.expiration_date);

    // Prioridad: expiring > critical > low > good
    if (daysUntilExpiry !== null && daysUntilExpiry <= this.EXPIRING_DAYS_THRESHOLD) {
      return 'expiring';
    }
    if (food.stock <= minStock * this.CRITICAL_STOCK_PERCENTAGE) {
      return 'critical';
    }
    if (food.stock <= minStock * this.LOW_STOCK_PERCENTAGE) {
      return 'low';
    }
    return 'good';
  }

  /**
   * Calcula los días hasta el vencimiento
   */
  private getDaysUntilExpiry(expirationDate: string | null): number | null {
    if (!expirationDate) return null;

    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  /**
   * Agrega el estado calculado a un alimento
   */
  private enrichFoodWithStatus(food: any): FoodWithStatus {
    return {
      ...food,
      status: this.calculateFoodStatus(food),
      daysUntilExpiry: this.getDaysUntilExpiry(food.expiration_date)
    };
  }

  async createFood(dto: CreateFoodCommandDto) {
    try {
      const food = new Food(dto.getName(), dto.getCategory(), dto.getUnit(), dto.getStock(), dto.getExpirationDate());
      const createdFood = await this.foodRepository.createFood(food);
      return this.enrichFoodWithStatus(createdFood);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<FoodWithStatus[]> {
    try {
      const foods = await this.foodRepository.findAll();
      if (!foods || foods.length === 0) {
        return [];
      }
      return foods.map(food => this.enrichFoodWithStatus(food));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<FoodWithStatus> {
    try {
      const food = await this.foodRepository.findById(id);
      if (!food) {
        throw new Error('No se encontró el alimento');
      }
      return this.enrichFoodWithStatus(food);
    } catch (error) {
      throw error;
    }
  }

  async updateFood(id: string, dto: UpdateFoodCommandDto) {
    try {
      const food = new Food(dto.getName(), dto.getCategory(), dto.getUnit(), dto.getStock(), dto.getExpirationDate());
      const updatedFood = await this.foodRepository.updateFood(id, food);
      return this.enrichFoodWithStatus(updatedFood);
    } catch (error) {
      throw error;
    }
  }

  async deleteFood(dto: DeleteFoodCommandDto) {
    try {
      await this.foodRepository.deleteFood(dto.getId());
      return { message: 'Alimento eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }

 
  async getLowStockFoods(): Promise<FoodWithStatus[]> {
    try {
      const allFoods = await this.findAll();
      return allFoods.filter(food =>
        food.status === 'low' || food.status === 'critical'
      );
    } catch (error) {
      throw error;
    }
  }

 
  async getExpiringFoods(): Promise<FoodWithStatus[]> {
    try {
      const allFoods = await this.findAll();
      return allFoods.filter(food => food.status === 'expiring');
    } catch (error) {
      throw error;
    }
  }

 
  async getInventoryStats() {
    try {
      const allFoods = await this.findAll();

      return {
        total: allFoods.length,
        good: allFoods.filter(f => f.status === 'good').length,
        low: allFoods.filter(f => f.status === 'low').length,
        critical: allFoods.filter(f => f.status === 'critical').length,
        expiring: allFoods.filter(f => f.status === 'expiring').length,
      };
    } catch (error) {
      throw error;
    }
  }

  async findCategory(category: string): Promise<FoodWithStatus[]> {
    try {
      const allFoods = await this.findAll();
      return allFoods.filter(food => food.category === category);
    } catch (error) { 
      throw error;
    }
  }

  async getCategory(category: string): Promise<any[]> {
    try {
      const allFoods = await this.findAll();
      return allFoods.filter(food => food.category === category);
    } catch (error) {
      throw error;
    }
  }
}
