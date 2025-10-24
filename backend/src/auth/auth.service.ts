import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role, companyId: user.company?.id || null, firstName: user.firstName, lastName: user.lastName };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(firstName: string, lastName: string, password: string, email: string, role: UserRole, companyId: number, lockerId?: number) {
        const userExists = await this.usersService.findByEmail(email);
        if (userExists) throw new BadRequestException("User with this email already exists!");

        const hashed = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({
            firstName,
            lastName,
            password: hashed,
            email,
            role,
            companyId,
            lockerId
        });

        if (lockerId) {
            await this.usersService.assignLockerToUser(user.id, lockerId);
        }

        return user;
    }
}
