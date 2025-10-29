import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { first } from 'rxjs';
import { UserResponseDto } from 'src/user/dto/response-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(
        @Body() body: { firstName: string; lastName: string; password: string; email: string; phone: string; role: UserRole; companyId: number },
    ) {
        return this.authService.register(body.firstName, body.lastName, body.password, body.email, body.role, body.companyId);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('verify')
    async verify(@Request() req): Promise<UserResponseDto> {
        const user = req.user;
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            locker: user.locker
        }
    }
}
