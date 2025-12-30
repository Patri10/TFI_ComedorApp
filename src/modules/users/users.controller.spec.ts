import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users/presentation/users.controller';
import { UsersService } from '../users/service/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: 'UserRepository', 
        useValue: {
          findAll: jest.fn().mockResolvedValue([]),
          create: jest.fn().mockResolvedValue({}),
        }
      }, {
        provide: 'SUPABASE_CLIENT',
        useValue: {}
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
