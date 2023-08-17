import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { TrimPipe } from 'src/common/pipes/TrimPipe.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Personas routes')
@Controller('personas')
export class PersonasController {
  constructor(private personasService: PersonasService) {}

  @Post()
  @UsePipes(new TrimPipe())
  crearPersona(@Body() nuevaPersona: CreatePersonaDto) {
    return this.personasService.crearPersona(nuevaPersona);
  }

  @Get()
  obtenerPersonas() {
    return this.personasService.obtenerPersonas();
  }

  @Get(':id')
  obtenerPersona(@Param('id', ParseIntPipe) id: number) {
    return this.personasService.obtenerPersona(id);
  }

  @Put(':id')
  @UsePipes(new TrimPipe())
  actualizarPersona(
    @Param('id', ParseIntPipe) id: number,
    @Body() persona: UpdatePersonaDto,
  ) {
    return this.personasService.actualizarPersona(id, persona);
  }

  @Delete(':id')
  eliminarPersona(@Param('id') id: number) {
    return this.personasService.eliminarPersona(id);
  }
}
