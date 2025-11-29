import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { HttpStatus, HttpException, Inject } from '@nestjs/common';
import User, { UserRole } from "../domain/model/user";
import { UserRepository } from "../domain/contract/user.repository";
import CreateUserRequestDto from "../presentation/dto/CreateUserRequest.dto";
import CreateUserCommandDto from "../service/dto/CreateUserCommand.dto";
import DeleteUserCommandDto from "../service/dto/DeleteUserCommand.dto";

@Injectable()
export class SupabaseUserRepository implements UserRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,
        @Inject('SUPABASE_ADMIN_CLIENT')
        private readonly supabaseAdminClient: SupabaseClient
    ) { }

    async createUser(user: User): Promise<any> {
        const { data, error } = await this.supabaseClient.auth.signUp({
            email: user.getEmail(),
            password: user.getPassword(),
        });

        if (error) {
            throw new HttpException('Usuario no creado: ' + error.message, HttpStatus.BAD_REQUEST);
        }
        const newuuid = data.user?.id;

        if (!newuuid) {
            throw new HttpException('El perfil no se pudo crear', HttpStatus.BAD_REQUEST);
        }

        console.log("Usuario creado con exito" + data)
        await this.createProfile(user, newuuid);



        return data;
    }

    private async deleteAuthUser(user: User, id: string) {
        const { data, error } = await this.supabaseAdminClient.auth.admin.deleteUser(id);

        if (error) {
            console.log("Usuario no eliminado: no se pudo hacer rollbakc del usuario");
            throw new HttpException('Usuario no eliminado: ' + error.message, HttpStatus.BAD_REQUEST);
        }
    }


    private async createProfile(user: User, id: string) {
        const { data, error } = await this.supabaseClient.from('user_profiles').insert({
            id: id,
            name: user.getNombre(),
            email: user.getEmail(),
            role: user.getRol() as UserRole,
        });

        if (error) {
            await this.deleteAuthUser(user, id);
            throw new Error('Perfil no creado: ' + error.message);
        }
        else {
            return ("Se creo el perfil con exito " + data);
        }
    }


    async getAllUsers(): Promise<User[]> {
        const { data, error } = await this.supabaseClient.from('user_profiles').select('*');
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return data.map((u: any) => new User(
            u.id,
            u.name,
            u.email,
            u.password,
            u.role as UserRole,
            u.created_at
        ));
    }

    async findById(id: string): Promise<User | null> {
        const { data, error } = await this.supabaseClient
            .from('user_profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return null;
        }

        return new User(
            data.id,
            data.name,
            data.email,
            data.password,
            data.role as UserRole,
            data.created_at
        );
    }

    async updateUser(id: string, user: User): Promise<void> {
        const { data, error } = await this.supabaseClient
            .from('user_profiles')
            .update({
                name: user.getNombre(),
                role: user.getRol() as UserRole,
            })
            .eq('id', id)
            .single();

        if (error || !data) {
            throw new Error("Perfil no actualizado: " + error.message);
        }

        const updates : any ={};
        if(user.getNombre()){
            updates.email = user.getEmail();
        }
        if(user.getRol()){
            updates.password = user.getPassword();
        }

        if (Object.keys(updates).length === 0) {
            const {error: authError} = await this.supabaseAdminClient.auth.admin.updateUserById(id, updates);
            if(authError){
                throw new Error("Usuario no actualizado: " + authError.message);
            }
        }
    }

    

    async deleteUser(id: string, user: DeleteUserCommandDto): Promise<void> {
        const { data, error } = await this.supabaseClient
            .from('user_profiles')
            .delete()
            .eq('id', id)
            .single();
        
        if (error || !data) {
            throw new Error("Perfil no eliminado: " + error.message);
        }

        const {data: authData} = await this.supabaseAdminClient.auth.admin.deleteUser(id);

        if (!authData) {
            throw new Error("Perfil no eliminado: ");
        }
    }
}
