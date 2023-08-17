import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Persona } from './persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) {}

  async crearPersona(persona: CreatePersonaDto) {
    try {
      const nuevaPersona = this.personaRepository.create(persona);
      await this.personaRepository.save(nuevaPersona);
      return { statusCode: HttpStatus.OK, message: 'Se guardó exitosamente' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El nombre ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async obtenerPersonas() {
    try {
      const personas = await this.personaRepository.find();
      return { statusCode: HttpStatus.OK, data: personas };
    } catch (error) {
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async obtenerPersona(id: number) {
    try {
      const personaFound = await this.personaRepository.findOne({
        where: { id: id },
        relations: ['pagos'],
      });
      if (!personaFound) {
        throw new HttpException('La persona no existe', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: personaFound };
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

  async actualizarPersona(id: number, persona: UpdatePersonaDto) {
    try {
      const personaFound = await this.personaRepository.findOne({
        where: { id: id },
      });
      if (!personaFound) {
        throw new HttpException('La persona no existe', HttpStatus.NOT_FOUND);
      }
      this.personaRepository.merge(personaFound, persona);
      await this.personaRepository.save(personaFound);
      return {
        statusCode: HttpStatus.OK,
        message: 'El registro fue actualizado',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('El nombre ya existe', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        '¡Ups! Ocurrió un error desconocido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async eliminarPersona(id: number) {
    try {
      await this.obtenerPersona(id);
      await this.personaRepository.delete({ id: id });
      return {
        statusCode: HttpStatus.OK,
        message: 'El registro fue eliminado',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
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
