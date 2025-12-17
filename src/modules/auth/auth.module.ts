import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard'; // Assuming roles.guard is in the same directory
import { createClient } from '@supabase/supabase-js'; // Assuming supabase-js is installed
import { AuthController } from './auth.controller'; // Assuming auth.controller is in the same directory

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SUPABASE_JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    RolesGuard,
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: (configService: ConfigService) => {
        return createClient(
          configService.get<string>('SUPABASE_URL') || '',
          configService.get<string>('SUPABASE_KEY') || '',
        );
      },

      inject: [ConfigService],
    },

    {
      provide: 'SUPABASE_ADMIN_CLIENT',
      useFactory: (configService: ConfigService) => {
        return createClient(
          configService.get<string>('SUPABASE_URL') || '',
          configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') || '',
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          },
        );
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    PassportModule,
    RolesGuard,
    'SUPABASE_CLIENT',
    'SUPABASE_ADMIN_CLIENT',
  ],
})
export class AuthModule {}
