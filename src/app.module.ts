import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule'
import typeorm from 'config/typeORMconfig';
import { JwtModule } from '@nestjs/jwt';
import { CakesModule } from './cakes/cakes.module';
import { AuthModule } from './Auth/Auth.module';


@Module({
  imports: [ 
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('typeorm');
        return config;
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '24h' },
      secret: process.env.JWT_SECRET,
    }),
  UsersModule,
  CakesModule, // Importamos el módulo de usuarios
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
