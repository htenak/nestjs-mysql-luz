import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './pago.entity';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
  ) {}

  async crearPago(pago: CreatePagoDto) {
    try {
      const nuevoPago = this.pagoRepository.create(pago);
      await this.pagoRepository.save(nuevoPago);
      return { statusCode: HttpStatus.OK, message: 'Se guardó exitosamente' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async obtenerPagos() {
    const pagos = await this.pagoRepository.find({
      relations: ['persona', 'kilowatt'],
      order: {
        creadoEn: 'DESC',
      },
    });
    return { statusCode: HttpStatus.OK, data: pagos };
  }

  async obtenerPago(id: number) {
    try {
      const pagoFound = await this.pagoRepository.findOne({
        where: { id: id },
        relations: ['persona', 'kilowatt'],
      });
      if (!pagoFound) {
        throw new HttpException('El pago no existe', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: pagoFound };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async actualizarPago(id: number, pago: UpdatePagoDto) {
    try {
      const pagoFound = await this.pagoRepository.findOne({
        where: { id: id },
      });
      if (!pagoFound) {
        throw new HttpException('El pago no existe', HttpStatus.NOT_FOUND);
      }
      this.pagoRepository.merge(pagoFound, pago);
      await this.pagoRepository.save(pagoFound);
      return {
        statusCode: HttpStatus.OK,
        message: 'El registro fue actualizado',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async eliminarPago(id: number) {
    try {
      await this.obtenerPago(id);
      await this.pagoRepository.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: 'El pago fue eliminado',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new HttpException(
          'Este registro está usandose en otras partes',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
