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
import { KilowattsService } from './kilowatts.service';
import { TrimPipe } from 'src/common/pipes/TrimPipe.pipe';
import { CreateKilowattDto } from './dto/create-kilowatt.dto';
import { UpdateKilowattDto } from './dto/update-kilowatt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Kilowatts routes')
@Controller('kilowatts')
export class KilowattsController {
  constructor(private kilowattsService: KilowattsService) {}

  @Post()
  @UsePipes(new TrimPipe())
  crearKilowatt(@Body() kilowatt: CreateKilowattDto) {
    return this.kilowattsService.crearKilowatt(kilowatt);
  }

  @Get()
  obtenerKilowatts() {
    return this.kilowattsService.obtenerKilowatts();
  }

  @Get(':id')
  obtenerKilowatt(@Param('id', ParseIntPipe) id: number) {
    return this.kilowattsService.obtenerKilowatt(id);
  }

  @Put(':id')
  @UsePipes(new TrimPipe())
  actualizarKilowatt(
    @Param('id', ParseIntPipe) id: number,
    @Body() kilowatt: UpdateKilowattDto,
  ) {
    return this.kilowattsService.actualizarKilowatt(id, kilowatt);
  }

  @Delete(':id')
  eliminarKilowatt(@Param('id', ParseIntPipe) id: number) {
    return this.kilowattsService.eliminarKilowatt(id);
  }
}
