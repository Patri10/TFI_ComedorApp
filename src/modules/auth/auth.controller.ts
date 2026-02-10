import { Controller, Post, Body, UnauthorizedException, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,
    ) { }

    @Post('login')
    async login(@Body() body: any) {
        console.log('🔐 Login attempt:', { email: body.email });

        const { email, password } = body;

        const { data, error } = await this.supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('❌ Login error:', error.message);
            throw new UnauthorizedException(error.message);
        }

        console.log('✅ Login successful:', {
            userId: data.user?.id,
            email: data.user?.email
        });

        return data;
    }
}
