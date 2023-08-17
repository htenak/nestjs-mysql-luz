import { Module } from '@nestjs/common';
import { KilowattsService } from './kilowatts.service';
import { KilowattsController } from './kilowatts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kilowatt } from './kilowatt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kilowatt])],
  providers: [KilowattsService],
  controllers: [KilowattsController],
})
export class KilowattsModule {}
