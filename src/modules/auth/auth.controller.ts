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

        const session = data.session;

        if (!session?.access_token) {
            throw new UnauthorizedException('No se recibió token de autenticación.');
        }

        return {
            token: session.access_token, // alias esperado por el frontend
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at,
            token_type: session.token_type,
            user: data.user,
        };
    }
}
