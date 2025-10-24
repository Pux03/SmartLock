import { AuthService } from './auth.service';
import { UserRole } from 'src/user/entities/user.entity';
import { UserResponseDto } from 'src/user/dto/response-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        firstName: string;
        lastName: string;
        password: string;
        email: string;
        phone: string;
        role: UserRole;
        companyId: number;
    }): Promise<import("src/user/entities/user.entity").User>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    verify(req: any): Promise<UserResponseDto>;
}
