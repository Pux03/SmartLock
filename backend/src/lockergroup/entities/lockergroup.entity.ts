import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';

@Entity()
export class LockerGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Company, (company) => company.lockerGroups, { onDelete: 'CASCADE' })
    company: Company;

    @OneToMany(() => Locker, (locker) => locker.group)
    lockers: Locker[];
}
