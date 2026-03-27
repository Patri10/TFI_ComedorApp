import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        const secret = configService.get<string>('SUPABASE_JWT_SECRET');

        if (!secret) {
            throw new Error(
                '❌ SUPABASE_JWT_SECRET no está configurado. ' +
                'Agregá esta variable de entorno antes de iniciar el servidor.'
            );
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        // En Supabase, el rol real del usuario está en app_metadata.role
        // payload.role siempre es 'authenticated', no el rol de la app
        const appRole = payload.app_metadata?.role
            ?? payload.user_metadata?.role
            ?? payload.role;
        return {
            userId: payload.sub,
            email: payload.email,
            role: appRole,
            app_metadata: payload.app_metadata,
            user_metadata: payload.user_metadata
        };
    }
}
