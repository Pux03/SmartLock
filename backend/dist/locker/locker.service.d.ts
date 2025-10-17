import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
export declare class LockerService {
    create(createLockerDto: CreateLockerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLockerDto: UpdateLockerDto): string;
    remove(id: number): string;
}
