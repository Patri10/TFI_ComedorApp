import { Module } from '@nestjs/common';
<<<<<<< HEAD
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
=======
import { UsersService } from './users.service';
import { UsersController } from './service/users.controller';
import { SupabaseUserRepository } from './infrastructure/supabase.user.repository';
import { SupabaseModule } from '../database/database.module';

@Module({
  imports: [SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService, { provide: 'UserRepository', useClass: SupabaseUserRepository }],
>>>>>>> 035c6589be53597a6257f07c2b2fe26c0f2e21c9
})
export class UsersModule { }
