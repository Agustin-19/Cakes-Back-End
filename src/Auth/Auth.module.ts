import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.Sevice';
import { User } from 'src/users/entities/user.entity';
import { AuthRepository } from './Auth.Repository';
import { PasswordService } from './Auth.randonPass';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
