import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
export declare class UserService {
    private userRepository;
    private companyRepository;
    private lockerRepository;
    constructor(userRepository: Repository<User>, companyRepository: Repository<Company>, lockerRepository: Repository<Locker>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByCompany(companyId: number): Promise<User[]>;
    findUsersWithoutLockers(companyId: number): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    assignLockerToUser(userId: number, lockerId: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
