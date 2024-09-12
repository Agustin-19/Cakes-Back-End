import { Module } from '@nestjs/common';
import { CakesService } from './cakes.service';
import { CakesController } from './cakes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cake } from './entities/cake.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cake])],
  controllers: [CakesController],
  providers: [CakesService],
})
export class CakesModule {}
