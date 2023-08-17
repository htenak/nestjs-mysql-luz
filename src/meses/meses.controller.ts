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
import { MesesService } from './meses.service';
import { CreateMesDto } from './dto/create-mes.dto';
import { TrimPipe } from 'src/common/pipes/TrimPipe.pipe';
import { UpdateMesDto } from './dto/update-mes.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meses routes')
@Controller('meses')
export class MesesController {
  constructor(private mesesService: MesesService) {}

  @Post()
  @UsePipes(new TrimPipe())
  crearMes(@Body() nuevoMes: CreateMesDto) {
    return this.mesesService.crearMes(nuevoMes);
  }

  @Get()
  obtenerMeses() {
    return this.mesesService.obtenerMeses();
  }

  @Get(':id')
  obtenerMes(@Param('id', ParseIntPipe) id: number) {
    return this.mesesService.obtenerMes(id);
  }

  @Put(':id')
  @UsePipes(new TrimPipe())
  actualizarMes(
    @Param('id', ParseIntPipe) id: number,
    @Body() mes: UpdateMesDto,
  ) {
    return this.mesesService.actualizarMes(id, mes);
  }

  @Delete(':id')
  eliminarMes(@Param('id', ParseIntPipe) id: number) {
    return this.mesesService.eliminarMes(id);
  }
}
