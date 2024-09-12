import { Injectable } from '@nestjs/common';
import { AuthRepository } from './Auth.Repository';
import { loginAuthDto } from './Login.Dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async signin(email: string, password: string): Promise<object> {
    return await this.authRepository.signin(email, password);
  }

  async signup(body: CreateUserDto) {

    const { email } = body;
    const to = email;
    const subject = 'Bienvenido/a a FitHub - Tu entrenador personalizado';
    const text = 'Estoy probando con texto plano';

    const newUser = await this.authRepository.signup(body);
    if (newUser) {
    } else {
      return 'Algo ha salido mal';
    }
    return 'usuario creado';
  }
  
  async auth0(body: loginAuthDto) {
    return await this.authRepository.auth0(body);
  }
}
