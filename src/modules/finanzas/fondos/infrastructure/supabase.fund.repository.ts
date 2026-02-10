import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { FundRepository } from '../domain/contract/fund.repository';
import Fund from '../domain/model/fund.model';
import { FundType } from '../domain/model/fund-type.enum';

@Injectable()
export class SupabaseFundRepository implements FundRepository {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabaseClient: SupabaseClient,
    ) { }

    async createFund(fund: Fund): Promise<Fund> {
        const { data, error } = await this.supabaseClient
            .from('funds')
            .insert({
                month: fund.getMonth(),
                year: fund.getYear(),
                initial_amount: fund.getInitialAmount(),
                remaining_amount: fund.getRemainingAmount(),
                fund_type: fund.getFundType(),
            })
            .select()
            .single();

        if (error) {
            throw new HttpException(
                'Error al crear el fondo: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.mapToDomain(data);
    }

    async findAllFunds(): Promise<Fund[]> {
        const { data, error } = await this.supabaseClient
            .from('funds')
            .select('*')
            .order('year', { ascending: false })
            .order('month', { ascending: false });

        if (error) {
            throw new HttpException(
                'Error al obtener los fondos: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return data.map((f: any) => this.mapToDomain(f));
    }

    async findFundById(id: string): Promise<Fund | null> {
        const { data, error } = await this.supabaseClient
            .from('funds')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw new HttpException(
                'Error al obtener el fondo: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!data) {
            return null;
        }

        return this.mapToDomain(data);
    }

    async findFundsByType(fundType: FundType): Promise<Fund[]> {
        const { data, error } = await this.supabaseClient
            .from('funds')
            .select('*')
            .eq('fund_type', fundType)
            .order('year', { ascending: false })
            .order('month', { ascending: false });

        if (error) {
            throw new HttpException(
                'Error al obtener los fondos: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return data.map((f: any) => this.mapToDomain(f));
    }

    async findFundsByMonthAndYear(month: number, year: number): Promise<Fund[]> {
        const { data, error } = await this.supabaseClient
            .from('funds')
            .select('*')
            .eq('month', month)
            .eq('year', year);

        if (error) {
            throw new HttpException(
                'Error al obtener los fondos: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return data.map((f: any) => this.mapToDomain(f));
    }

    async updateFund(id: string, fund: Fund): Promise<Fund> {
        const { data, error } = await this.supabaseClient
            .from('funds')
            .update({
                month: fund.getMonth(),
                year: fund.getYear(),
                initial_amount: fund.getInitialAmount(),
                remaining_amount: fund.getRemainingAmount(),
                fund_type: fund.getFundType(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new HttpException(
                'Error al actualizar el fondo: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.mapToDomain(data);
    }

    async deleteFund(id: string): Promise<void> {
        const { error } = await this.supabaseClient
            .from('funds')
            .delete()
            .eq('id', id);

        if (error) {
            throw new HttpException(
                'Error al eliminar el fondo: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateRemainingAmount(id: string, newAmount: number): Promise<Fund> {
        const { data, error } = await this.supabaseClient
            .from('funds')
            .update({
                remaining_amount: newAmount,
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new HttpException(
                'Error al actualizar el monto restante: ' + error.message,
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.mapToDomain(data);
    }

    private mapToDomain(data: any): Fund {
        return new Fund(
            data.month,
            data.year,
            data.initial_amount,
            data.remaining_amount,
            data.fund_type as FundType,
            data.id,
            data.created_at ? new Date(data.created_at) : new Date(),
            // Manejo seguro de updated_at si no existe
            data.updated_at ? new Date(data.updated_at) : new Date()
        );
    }
}
