import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginAuthDto } from './Login.Dto';
import { PasswordService } from './Auth.randonPass';
import {
  AuthException,
  InvalidCredentialsException,
  PasswordMismatchException,
  UserAlreadyExistsException,
} from 'src/Exceptions/Auth.exceptions';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly passwordService: PasswordService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signin(email: string, password: string): Promise<object> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const validarPass = await bcrypt.compare(password, user.password);

    if (!validarPass) {
      throw new InvalidCredentialsException();
    }

    const payload = { email: user.email, sub: user.id, role: user.role };

    const token = this.jwtService.sign(payload, {
      expiresIn: '3h',
    });

    return { token: token };
  }

  async signup(body: CreateUserDto): Promise<string> {
    const usuario = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (usuario) {
      throw new UserAlreadyExistsException();
    }

    if (body.password !== body.passwordConfirm) {
      throw new PasswordMismatchException();
    }
    const passHash = await bcrypt.hash(body.password, 10);
    body.password = passHash;
    const user = await this.usersRepository.create(body);
    await this.usersRepository.save(user);
    return 'usuario creado';
  }

  async auth0(body: loginAuthDto) {
    const { name, email } = body;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload);
      return { token: token };
    }

    const password = this.passwordService.generateSecurePassword();
    const hassPass = await bcrypt.hash(password, 10);

    const newUser = await this.usersRepository.save({
      name,
      email,
      password: hassPass,
    });

    if (!newUser) {
      throw new AuthException('No se pudo crear el nuevo usuario');
    }

    if (newUser) {
      const to = email;
      const subject = 'Bienvenido/a a FitHub - Tu entrenador personalizado';
      const text = `Hola ${name}, te has registrado en FitHub. Tu contraseña es: ${password}. Recuerda cambiarla en tu perfil.`;
      // await this.mailerService.notificarRegistro(to, subject, text);
      const payload = {
        email: newUser.email,
        newUser: newUser.id,
        role: newUser.role,
      };
      const token = this.jwtService.sign(payload);

      return { token: token };
    }
    throw new BadRequestException('Algo ha salido mal');
  }

  async signupEntrenador(body: CreateUserDto): Promise<string> {
    const usuario = await this.usersRepository.findOne({
      where: { email: body.email },
    });
    if (usuario) {
      throw new UserAlreadyExistsException();
    }

    if (body.password !== body.passwordConfirm) {
      throw new PasswordMismatchException();
    }
    const passHash = await bcrypt.hash(body.password, 10);

    const user = await this.usersRepository.create({
      ...body,
      role: UserRole.USER,
      password: passHash,
    });
    await this.usersRepository.save(user);
    return 'Entrenador creado';
  }
}
