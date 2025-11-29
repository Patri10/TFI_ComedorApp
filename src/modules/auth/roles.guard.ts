import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log('User in RolesGuard:', user);

        
        let userRole = user.role;

        
        if (!userRole || userRole === 'authenticated' || userRole === 'anon') {
            console.log('Buscando rol real en DB para usuario:', user.userId);
            const { data, error } = await this.supabaseClient
                .from('user_profiles')
                .select('role')
                .eq('id', user.userId)
                .single();

            if (data && data.role) {
                userRole = data.role;
                console.log('Rol encontrado en DB:', userRole);
            } else {
                console.warn('No se pudo obtener rol de DB:', error?.message);
            }
        }

        if (!requiredRoles.includes(userRole)) {
            throw new ForbiddenException('No tienes permisos para realizar esta acción');
        }

        return true;
    }
}
