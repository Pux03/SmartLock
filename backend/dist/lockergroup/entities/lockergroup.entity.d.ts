import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
export declare class LockerGroup {
    id: number;
    name: string;
    company: Company;
    lockers: Locker[];
}
