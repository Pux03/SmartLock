import { LockergroupService } from './lockergroup.service';
import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';
export declare class LockergroupController {
    private readonly lockergroupService;
    constructor(lockergroupService: LockergroupService);
    create(createLockergroupDto: CreateLockergroupDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLockergroupDto: UpdateLockergroupDto): string;
    remove(id: string): string;
}
