import { UserRole } from "src/common/enums/user_role";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    companyId: number;
    lockerId?: number;
}
