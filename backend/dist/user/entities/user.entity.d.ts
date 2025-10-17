import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
export declare enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    company: Company;
    locker: Locker;
}
