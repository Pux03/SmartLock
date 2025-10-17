import { Company } from "src/company/entities/company.entity";
import { UserRole } from "../entities/user.entity";
import { Locker } from "src/locker/entities/locker.entity";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    company: Company;
    locker: Locker;
}
