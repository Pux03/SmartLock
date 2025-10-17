import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';
import { User } from 'src/user/entities/user.entity';

export enum LockerStatus {
    FREE = 'FREE',
    OCCUPIED = 'OCCUPIED',
}

export enum LockedState {
    LOCKED = 'LOCKED',
    UNLOCKED = 'UNLOCKED',
}

@Entity()
export class Locker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serial: string;

    @ManyToOne(() => LockerGroup, (group) => group.lockers, { onDelete: 'CASCADE' })
    group: LockerGroup;

    @Column()
    x: number;

    @Column()
    y: number;

    @Column({ type: 'enum', enum: LockerStatus, default: LockerStatus.FREE })
    status: LockerStatus;

    @Column({ type: 'enum', enum: LockedState, default: LockedState.LOCKED })
    locked: LockedState;

    @OneToOne(() => User, (user) => user.locker, { nullable: true })
    user: User;
}
