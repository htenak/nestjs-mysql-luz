import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PersonasModule } from './personas/personas.module';
import { MesesModule } from './meses/meses.module';
import { KilowattsModule } from './kilowatts/kilowatts.module';
import { PagosModule } from './pagos/pagos.module';
import { UserModule } from './user/user.module';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(DB_HOST),
        port: parseInt(config.get<string>(DB_PORT)),
        username: config.get<string>(DB_USER),
        password: config.get<string>(DB_PASS),
        database: config.get<string>(DB_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, //desactivar en producción
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PersonasModule,
    MesesModule,
    KilowattsModule,
    PagosModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
