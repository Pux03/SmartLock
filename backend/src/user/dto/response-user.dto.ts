import { UserRole } from "../entities/user.entity";

export class UserResponseDto {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    locker?: {
        id: number;
        serial: string;
        x: number;
        y: number;
        status: string;
        locked: string;
    };
}
