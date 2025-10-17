import { LockerService } from './locker.service';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
export declare class LockerController {
    private readonly lockerService;
    constructor(lockerService: LockerService);
    create(createLockerDto: CreateLockerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLockerDto: UpdateLockerDto): string;
    remove(id: string): string;
}
