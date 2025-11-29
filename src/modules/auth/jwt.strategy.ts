import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        const secret = configService.get<string>('SUPABASE_JWT_SECRET');
        console.log('JwtStrategy initialized. Secret length:', secret ? secret.length : 0);
        if (!secret) console.warn('WARNING: SUPABASE_JWT_SECRET is missing!');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret || 'fallback_secret_to_avoid_crash_but_will_fail_auth',
        });
    }

    async validate(payload: any) {
        console.log('JWT Payload:', payload);
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role, // Ojo: este suele ser 'authenticated' en Supabase
            app_metadata: payload.app_metadata,
            user_metadata: payload.user_metadata
        };
    }
}
