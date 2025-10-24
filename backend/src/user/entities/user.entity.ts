import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
import { UserRole } from 'src/common/enums/user_role';


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
    locker: Locker | null;
}
export { UserRole };

