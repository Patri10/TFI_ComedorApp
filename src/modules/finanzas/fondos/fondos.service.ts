import { Injectable, Inject, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import type { FundRepository } from './domain/contract/fund.repository';
import Fund from './domain/model/fund.model';

@Injectable()
export class FondosService {

  constructor(
    @Inject('FundRepository') private readonly fundRepository: FundRepository,
  ) { }

  // Obtener todos los fondos
  async findAll() {
    try {
      return await this.fundRepository.findAllFunds();
    } catch (error) {
      throw error;
    }
  }

  // Obtener un fondo por ID
  async findOne(id: string) {
    try {
      return await this.fundRepository.findFundById(id);
    } catch (error) {
      throw error;
    }
  }

  // Recargar un fondo (agregar monto)
  async rechargeFund(id: string, amount: number) {
    try {
      const fund = await this.fundRepository.findFundById(id);
      if (!fund) {
        throw new NotFoundException('Fondo no encontrado');
      }

      const newRemainingAmount = fund.getRemainingAmount() + amount;
      const newInitialAmount = fund.getInitialAmount() + amount;

      // Acceso al cliente de Supabase a través del repositorio (casting a any para evitar error de tipo en interfaz estricta)
      // Esto permite mantener la lógica de persistencia delegada en la infraestructura subyacente
      const repo = this.fundRepository as any;
      if (repo.supabaseClient) {
        const { data, error } = await repo.supabaseClient
          .from('funds')
          .update({
            initial_amount: newInitialAmount,
            remaining_amount: newRemainingAmount,
          })
          .eq('id', id)
          .select()
          .single();

        if (error) {
          throw new Error('Error al recargar el fondo: ' + error.message);
        }
        return data;
      } else {
        throw new InternalServerErrorException('El repositorio no permite actualizaciones directas');
      }

    } catch (error) {
      throw error;
    }
  }

  // Descontar de un fondo (al hacer una compra)
  async deductFromFund(id: string, amount: number) {
    try {
      const fund = await this.fundRepository.findFundById(id);
      if (!fund) {
        throw new NotFoundException('Fondo no encontrado');
      }

      if (!fund.hasAvailableFunds(amount)) {
        throw new BadRequestException('Fondos insuficientes');
      }

      const newRemainingAmount = fund.getRemainingAmount() - amount;
      return await this.fundRepository.updateRemainingAmount(id, newRemainingAmount);
    } catch (error) {
      throw error;
    }
  }
}
