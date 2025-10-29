import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Locker } from './entities/locker.entity';
import { Repository } from 'typeorm';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';
import { LockedState } from 'src/common/enums/locker_state';

@Injectable()
export class LockerService {
  constructor(
    @InjectRepository(Locker)
    private lockerRepository: Repository<Locker>,
    @InjectRepository(LockerGroup)
    private lockerGroupRepository: Repository<LockerGroup>
  ) { }
  async create(createLockerDto: CreateLockerDto): Promise<Locker> {
    const lockerGroup = await this.lockerGroupRepository.findOne({ where: { id: createLockerDto.group.id } });
    if (!lockerGroup) throw new NotFoundException("Locker group not found!");

    const locker = this.lockerRepository.create({
      serial: createLockerDto.serial,
      group: lockerGroup,
      x: createLockerDto.x,
      y: createLockerDto.y,
      status: createLockerDto.status,
      locked: createLockerDto.locked || LockedState.LOCKED, // Default to LOCKED if not provided
    })

    return this.lockerRepository.save(locker);
  }

  async findAll(): Promise<Locker[]> {
    return this.lockerRepository.find({ relations: ['user'] });
  }


  findByLockerGroup(lockerGroupId: number) {
    return `This action returns lockers for locker group #${lockerGroupId}`;
  }

  findOne(id: number) {
    return this.lockerRepository.findOne({ where: { id } });
  }

  update(id: number, updateLockerDto: UpdateLockerDto) {
    return `This action updates a #${id} locker`;
  }

  remove(id: number) {
    return `This action removes a #${id} locker`;
  }

  async toggleLockerLock(lockerId: number): Promise<Locker> {
    const locker = await this.lockerRepository.findOne({ where: { id: lockerId } });
    if (!locker) {
      throw new NotFoundException(`Locker with ID ${lockerId} not found`);
    }

    locker.locked = locker.locked === LockedState.LOCKED ? LockedState.UNLOCKED : LockedState.LOCKED;
    return this.lockerRepository.save(locker);
  }
}
