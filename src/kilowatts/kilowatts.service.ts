import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kilowatt } from './kilowatt.entity';
import { Repository } from 'typeorm';
import { UpdateKilowattDto } from './dto/update-kilowatt.dto';
import { CreateKilowattDto } from './dto/create-kilowatt.dto';

@Injectable()
export class KilowattsService {
  constructor(
    @InjectRepository(Kilowatt)
    private kilowattRepository: Repository<Kilowatt>,
  ) {}

  async crearKilowatt(kilowatt: CreateKilowattDto) {
    try {
      const nuevoKilowatt = this.kilowattRepository.create(kilowatt);
      await this.kilowattRepository.save(nuevoKilowatt);
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

  async obtenerKilowatts() {
    const kilowatts = await this.kilowattRepository.find({
      relations: ['mes'],
      order: {
        creadoEn: 'DESC',
      },
    });
    return { statusCode: HttpStatus.OK, data: kilowatts };
  }

  async obtenerKilowatt(id: number) {
    try {
      const kwFound = await this.kilowattRepository.findOne({
        where: { id: id },
        relations: ['mes'],
      });
      if (!kwFound) {
        throw new HttpException('El registro no existe', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: kwFound };
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

  async actualizarKilowatt(id: number, kilowatt: UpdateKilowattDto) {
    try {
      const kwFound = await this.kilowattRepository.findOne({
        where: { id: id },
      });
      if (!kwFound) {
        throw new HttpException('El registro no existe', HttpStatus.NOT_FOUND);
      }
      this.kilowattRepository.merge(kwFound, kilowatt);
      await this.kilowattRepository.save(kwFound);
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

  async eliminarKilowatt(id: number) {
    try {
      await this.obtenerKilowatt(id);
      await this.kilowattRepository.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: 'El registro fue eliminado',
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
