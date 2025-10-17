import { LockerGroup } from "src/lockergroup/entities/lockergroup.entity";
import { LockedState, LockerStatus } from "../entities/locker.entity";
import { User } from "src/user/entities/user.entity";

export class CreateLockerDto {
    serial: string;
    group: LockerGroup;
    status: LockerStatus
    x: number;
    y: number;
    locked: LockedState
    lockerGroupId: number;
}
