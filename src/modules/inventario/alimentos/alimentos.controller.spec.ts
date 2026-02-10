import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from './presentation/alimentos.controller';
import { FoodService } from './service/food.service';
import FoodRepository from './domain/contract/food.repository';

describe('FoodController', () => {
  let controller: FoodController;

  // Mock del FoodRepository
  const mockFoodRepository: Partial<FoodRepository> = {
    createFood: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateFood: jest.fn(),
    deleteFood: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        FoodService,
        {
          provide: 'FoodRepository',
          useValue: mockFoodRepository,
        },
      ],
    }).compile();

    controller = module.get<FoodController>(FoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
