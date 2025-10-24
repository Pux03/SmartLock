import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/user/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(firstName: string, lastName: string, password: string, email: string, role: UserRole, companyId: number, lockerId?: number): Promise<import("src/user/entities/user.entity").User>;
}
