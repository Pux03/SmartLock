import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';
import { LockerGroup } from './entities/lockergroup.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
import { User } from 'src/user/entities/user.entity';
export declare class LockergroupService {
    private lockerGroupRepository;
    private companyRepository;
    private lockerRepository;
    private userRepository;
    constructor(lockerGroupRepository: Repository<LockerGroup>, companyRepository: Repository<Company>, lockerRepository: Repository<Locker>, userRepository: Repository<User>);
    create(createLockergroupDto: CreateLockergroupDto): Promise<LockerGroup>;
    findAll(): Promise<LockerGroup[]>;
    findByCompany(companyId: number): Promise<LockerGroup[]>;
    findOne(id: number): Promise<LockerGroup>;
    update(id: number, updateLockergroupDto: UpdateLockergroupDto): string;
    remove(id: number): Promise<void>;
}
