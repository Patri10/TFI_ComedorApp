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
        const { email, password } = body;
        const { data, error } = await this.supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw new UnauthorizedException(error.message);
        }

        return data;
    }
}
