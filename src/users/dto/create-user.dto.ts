import { IsString, IsEmail, IsOptional, IsBoolean, IsPhoneNumber, IsUUID, Length, IsNotEmpty, Matches, IsNumber, IsInt, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsUUID()
  @IsOptional() // Opcional para la creación, el ID se genera automáticamente
  id?: string;

  @IsString()
  @Length(1, 100) // Longitud entre 1 y 100 caracteres
  name: string;

  @IsEmail()
  @Length(1, 100)
  email: string;

  /**
 * La contraseña del usuario debe tener al menos: una mayuscula, una minuscula, un numero, un carácter especial. Y debe tener de 8 a 15 dígitos
 * @example 12345678aA!
*/
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  password: string;

  /**
    * La contraseña debe coincidir con la anterior
    * @example 12345678aA!
    */
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  passwordConfirm: string;

  /**
    * Número de teléfono celular del usuario, con 10 cifras
    * @example 2664404040
    */
  @IsNumber()
  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  @IsNotEmpty()
  phone?: number;

  @IsBoolean()
  @IsOptional() // Opcional, en caso de que no se proporcione
  delete?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
