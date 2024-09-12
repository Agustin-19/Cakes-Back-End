import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity({
    name: 'user',
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    password: string;

    @Column({ type: 'bigint', nullable: true })
    phone: number;

    // @OneToMany(() => Comentarios, (comentario) => comentario.user)
    // @JoinColumn({ name: 'comentarios' })
    // comments: Comentarios[];

    @Column({ default: false })
    delete: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: UserRole.USER })
  role: UserRole;
}
