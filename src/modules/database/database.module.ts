import { Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('SUPABASE_URL');
        const key = config.get<string>('SUPABASE_KEY');

        if (!url || !key) {
          throw new Error('Supabase URL or KEY missing');
        }

        return createClient(url, key);
<<<<<<< Updated upstream
      }
    }
=======
      },
    },
    {
      provide: 'SUPABASE_ADMIN_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService): SupabaseClient => {
        const url = config.get<string>('SUPABASE_URL');
        const adminKey = config.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!url || !adminKey) {
          throw new Error('Missing Supabase URL or SERVICE_ROLE_KEY in environment variables');
        }

        return createClient(url, adminKey);
      },
    },
>>>>>>> Stashed changes
  ],
  exports: ['SUPABASE_CLIENT', 'SUPABASE_ADMIN_CLIENT'],
})
<<<<<<< Updated upstream
export class SupabaseModule { }
=======
export class DatabaseModule { }
>>>>>>> Stashed changes
