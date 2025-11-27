import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersService } from '../users/service/users.service';
import { UsersController } from '../users/presentation/users.controller';
import { SupabaseUserRepository } from './infrastructure/supabase.user.repository';
import { SupabaseModule } from '../database/database.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
