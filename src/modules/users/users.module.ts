import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './service/users.controller';
import { SupabaseUserRepository } from './infrastructure/supabase.user.repository';
import { SupabaseModule } from '../database/database.module';

@Module({
  imports: [SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService, { provide: 'UserRepository', useClass: SupabaseUserRepository }],
})
export class UsersModule { }
