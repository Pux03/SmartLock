import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';
import { User } from 'src/user/entities/user.entity';
import { LockerStatus } from 'src/common/enums/locker_status';
import { LockedState } from 'src/common/enums/locker_state';
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
