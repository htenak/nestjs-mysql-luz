import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mes } from './mes.entity';
import { Repository } from 'typeorm';
import { CreateMesDto } from './dto/create-mes.dto';
import { UpdateMesDto } from './dto/update-mes.dto';

@Injectable()
export class MesesService {
  constructor(@InjectRepository(Mes) private mesRepository: Repository<Mes>) {}

  async crearMes(mes: CreateMesDto) {
    try {
      const nuevoMes = this.mesRepository.create(mes);
      await this.mesRepository.save(nuevoMes);
      return { statusCode: HttpStatus.OK, message: 'Se guardó exitosamente' };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El mes ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async obtenerMeses() {
    try {
      const meses = await this.mesRepository.find();
      return { statusCode: HttpStatus.OK, data: meses };
    } catch (error) {
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async obtenerMes(id: number) {
    try {
      const mesFound = await this.mesRepository.findOne({
        where: { id: id },
      });
      if (!mesFound) {
        throw new HttpException('El mes no existe', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: mesFound };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async actualizarMes(id: number, mes: UpdateMesDto) {
    try {
      const mesFound = await this.mesRepository.findOne({
        where: { id: id },
      });
      if (!mesFound) {
        throw new HttpException('El mes no existe', HttpStatus.NOT_FOUND);
      }
      this.mesRepository.merge(mesFound, mes);
      await this.mesRepository.save(mesFound);
      return {
        statusCode: HttpStatus.OK,
        message: 'El registro fue actualizado',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El mes ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async eliminarMes(id: number) {
    try {
      await this.obtenerMes(id);
      await this.mesRepository.delete({ id: id });
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
