import { User } from 'src/user/entities/user.entity';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';
export declare class Company {
    id: number;
    name: string;
    users: User[];
    lockerGroups: LockerGroup[];
}
