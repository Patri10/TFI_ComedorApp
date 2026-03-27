import { Controller, Post, Get, Body, UnauthorizedException, Inject, Req } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Public } from './public.decorator';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,
    ) { }

    @Public()
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
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

    /**
     * Retorna los datos del usuario autenticado decodificados desde el JWT.
     * El frontend debe usar este endpoint en lugar de leer el rol desde localStorage.
     */
    @Get('me')
    getMe(@Req() req: Request) {
        return (req as any).user;
    }
}
