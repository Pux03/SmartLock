import { UserRole } from "../entities/user.entity";

export class UserResponseDto {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
}
