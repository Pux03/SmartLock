import { LockerGroup } from "src/lockergroup/entities/lockergroup.entity";
import { LockedState, LockerStatus } from "../entities/locker.entity";
export declare class CreateLockerDto {
    serial: string;
    group: LockerGroup;
    status: LockerStatus;
    x: number;
    y: number;
    locked: LockedState;
    lockerGroupId: number;
}
