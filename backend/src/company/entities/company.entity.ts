import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // Veza ka korisnicima kompanije
    @OneToMany(() => User, (user) => user.company)
    users: User[];

    // Veza ka locker grupama kompanije
    @OneToMany(() => LockerGroup, (group) => group.company)
    lockerGroups: LockerGroup[];
}
