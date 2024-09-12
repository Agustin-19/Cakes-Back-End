import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Definición de la entidad "Cake"
@Entity()
export class Cake {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: string; // Pequeño, mediano, grande

    @Column("simple-array")
    fillings: string[]; // Lista de rellenos (ejemplo: crema, frutas, etc.)

    @Column()
    layers: number; // Cantidad de capas

    @Column()
    flavor: string; // Sabor del bizcocho (ejemplo: vainilla, chocolate)

    @Column({ default: false })
    isCustom: boolean; // Si la torta es personalizada o no

    @Column("simple-array", { nullable: true })
    decorations: string[]; // Decoraciones adicionales (ejemplo: flores, fondant, etc.)

    @Column({ nullable: true })
    message: string; // Mensaje personalizado en la torta

    @Column({ nullable: true })
    price: number; // Precio de la torta
}
