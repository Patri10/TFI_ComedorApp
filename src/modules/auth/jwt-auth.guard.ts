import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
            console.log('JwtAuthGuard Error:', err);
            console.log('JwtAuthGuard Info (reason):', info);
            throw err || new UnauthorizedException(info?.message || 'No auth token found');
        }
        return user;
    }
}
