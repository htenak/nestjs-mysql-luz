import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  providers: [PagosService],
  controllers: [PagosController],
})
export class PagosModule {}
