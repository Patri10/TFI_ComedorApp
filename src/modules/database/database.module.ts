import { Module } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService): SupabaseClient => {
        const url = config.get<string>('SUPABASE_URL');
        const key = config.get<string>('SUPABASE_KEY');

        if (!url || !key) {
          throw new Error('Missing Supabase URL or KEY in environment variables');
        }

        return createClient(url, key);
      },
    },
    {
      provide: 'SUPABASE_ADMIN_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService): SupabaseClient => {
        const url = config.get<string>('SUPABASE_URL');
        const serviceKey = config.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!url || !serviceKey) {
          throw new Error('Missing Supabase URL or SERVICE_ROLE_KEY in environment variables');
        }

        return createClient(url, serviceKey, {
          auth: { autoRefreshToken: false, persistSession: false }
        });
      },
    },
  ],
  exports: ['SUPABASE_CLIENT', 'SUPABASE_ADMIN_CLIENT'],
})
export class DatabaseModule { }
