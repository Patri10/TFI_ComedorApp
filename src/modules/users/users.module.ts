import { Module } from '@nestjs/common';
import { SupabaseUserRepository } from './infrastructure/supabase.user.repository';
import { UsersService } from './service/users.service';
import { UsersController } from './presentation/users.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: SupabaseUserRepository,
    },
  ],
})
export class UsersModule {}
