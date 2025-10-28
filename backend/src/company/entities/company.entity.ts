import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.company)
    users: User[];

    @OneToMany(() => LockerGroup, (group) => group.company)
    lockerGroups: LockerGroup[];
}
