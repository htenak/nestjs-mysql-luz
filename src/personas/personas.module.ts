import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  providers: [PersonasService],
  controllers: [PersonasController]
})
export class PersonasModule {}
