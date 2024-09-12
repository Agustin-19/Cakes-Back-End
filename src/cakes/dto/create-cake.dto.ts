import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class CreateCakeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    size: string; // small, medium, large

    @IsArray()
    @IsNotEmpty()
    fillings: string[]; // Lista de rellenos

    @IsNumber()
    @Min(1)
    @Max(10)
    layers: number; // Número de capas, entre 1 y 10

    @IsString()
    @IsNotEmpty()
    flavor: string; // Sabor de la torta

    @IsBoolean()
    @IsOptional()
    isCustom?: boolean; // Si la torta es personalizada o no, es opcional

    @IsArray()
    @IsOptional()
    decorations?: string[]; // Decoraciones adicionales (opcional)

    @IsString()
    @IsOptional()
    message?: string; // Mensaje personalizado en la torta (opcional)

    @IsNumber()
    @IsOptional()
    price?: number; // Precio de la torta (opcional)
}
