import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
import { Locker } from './entities/locker.entity';
import { Repository } from 'typeorm';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';
export declare class LockerService {
    private lockerRepository;
    private lockerGroupRepository;
    constructor(lockerRepository: Repository<Locker>, lockerGroupRepository: Repository<LockerGroup>);
    create(createLockerDto: CreateLockerDto): Promise<Locker>;
    findAll(): Promise<Locker[]>;
    findByLockerGroup(lockerGroupId: number): string;
    findOne(id: number): string;
    update(id: number, updateLockerDto: UpdateLockerDto): string;
    remove(id: number): string;
}
