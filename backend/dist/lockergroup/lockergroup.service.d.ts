import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';
import { LockerGroup } from './entities/lockergroup.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
export declare class LockergroupService {
    private lockerGroupRepository;
    private companyRepository;
    constructor(lockerGroupRepository: Repository<LockerGroup>, companyRepository: Repository<Company>);
    create(createLockergroupDto: CreateLockergroupDto): Promise<LockerGroup>;
    findAll(): Promise<LockerGroup[]>;
    findByCompany(companyId: number): Promise<LockerGroup[]>;
    findOne(id: number): Promise<LockerGroup>;
    update(id: number, updateLockergroupDto: UpdateLockergroupDto): string;
    remove(id: number): string;
}
