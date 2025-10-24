import { LockedState } from "src/common/enums/locker_state";
import { LockerStatus } from "src/common/enums/locker_status";
import { LockerGroup } from "src/lockergroup/entities/lockergroup.entity";
export declare class CreateLockerDto {
    serial: string;
    group: LockerGroup;
    status: LockerStatus;
    x: number;
    y: number;
    locked: LockedState;
    lockerGroupId: number;
}
