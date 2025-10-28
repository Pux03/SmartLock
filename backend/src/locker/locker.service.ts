import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Locker } from './entities/locker.entity';
import { Repository } from 'typeorm';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';

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
      locked: createLockerDto.locked,
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
    return `This action returns a #${id} locker`;
  }

  update(id: number, updateLockerDto: UpdateLockerDto) {
    return `This action updates a #${id} locker`;
  }

  remove(id: number) {
    return `This action removes a #${id} locker`;
  }
}
