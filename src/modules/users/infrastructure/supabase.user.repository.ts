import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import User from "../domain/model/user";
import { UserRepository } from "../domain/contract/user.repository";

@Injectable()
export class SupabaseUserRepository implements UserRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabase: SupabaseClient
    ) { }

    async getAllUsers(): Promise<User[]> {
        const { data, error } = await this.supabase.from('user_profiles').select('*');
        if (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
}

