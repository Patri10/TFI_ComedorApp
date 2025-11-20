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
      }
    }
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule { }
