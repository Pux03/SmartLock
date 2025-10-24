import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
import { UserRole } from 'src/common/enums/user_role';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    company: Company;
    locker: Locker | null;
}
export { UserRole };
