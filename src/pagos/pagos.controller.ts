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
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { TrimPipe } from 'src/common/pipes/TrimPipe.pipe';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pagos routes')
@Controller('pagos')
export class PagosController {
  constructor(private pagosService: PagosService) {}

  @Post()
  @UsePipes(new TrimPipe())
  crearPago(@Body() pago: CreatePagoDto) {
    return this.pagosService.crearPago(pago);
  }

  @Get()
  obtenerPagos() {
    return this.pagosService.obtenerPagos();
  }

  @Get(':id')
  obtenerPago(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.obtenerPago(id);
  }

  @Put(':id')
  @UsePipes(new TrimPipe())
  actualizarPago(
    @Param('id', ParseIntPipe) id: number,
    @Body() pago: UpdatePagoDto,
  ) {
    return this.pagosService.actualizarPago(id, pago);
  }

  @Delete(':id')
  eliminarPago(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.eliminarPago(id);
  }
}
