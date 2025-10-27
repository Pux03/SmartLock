import { LockergroupService } from './lockergroup.service';
import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';
export declare class LockergroupController {
    private readonly lockergroupService;
    constructor(lockergroupService: LockergroupService);
    create(createLockergroupDto: CreateLockergroupDto): Promise<import("./entities/lockergroup.entity").LockerGroup>;
    findAll(): Promise<import("./entities/lockergroup.entity").LockerGroup[]>;
    findByCompany(companyId: string): Promise<import("./entities/lockergroup.entity").LockerGroup[]>;
    findOne(id: string): Promise<import("./entities/lockergroup.entity").LockerGroup>;
    update(id: string, updateLockergroupDto: UpdateLockergroupDto): string;
    remove(id: string): string;
}
