import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';
import { User } from 'src/user/entities/user.entity';
export declare enum LockerStatus {
    FREE = "FREE",
    OCCUPIED = "OCCUPIED"
}
export declare enum LockedState {
    LOCKED = "LOCKED",
    UNLOCKED = "UNLOCKED"
}
export declare class Locker {
    id: number;
    serial: string;
    group: LockerGroup;
    x: number;
    y: number;
    status: LockerStatus;
    locked: LockedState;
    user: User;
}
