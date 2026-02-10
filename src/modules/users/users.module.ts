import { Module } from '@nestjs/common';
import { SupabaseUserRepository } from './infrastructure/supabase.user.repository';
import { UsersService } from './service/users.service';
import { UsersController } from './presentation/users.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: SupabaseUserRepository,
    },
  ],
})
export class UsersModule { }
