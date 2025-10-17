import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';

export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @ManyToOne(() => Company, (company) => company.users, { nullable: true, onDelete: 'CASCADE' })
    company: Company;

    @OneToOne(() => Locker, (locker) => locker.user, { nullable: true })
    @JoinColumn()
    locker: Locker;
}
