import { Module } from '@nestjs/common';
import { MesesService } from './meses.service';
import { MesesController } from './meses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mes } from './mes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mes])],
  providers: [MesesService],
  controllers: [MesesController],
})
export class MesesModule {}
