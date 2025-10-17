import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';
export declare class LockergroupService {
    create(createLockergroupDto: CreateLockergroupDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLockergroupDto: UpdateLockergroupDto): string;
    remove(id: number): string;
}
