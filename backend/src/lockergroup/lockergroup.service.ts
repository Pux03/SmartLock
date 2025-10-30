import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LockerGroup } from './entities/lockergroup.entity';
import { In, Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LockergroupService {
  constructor(
    @InjectRepository(LockerGroup)
    private lockerGroupRepository: Repository<LockerGroup>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Locker)
    private lockerRepository: Repository<Locker>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async create(createLockergroupDto: CreateLockergroupDto): Promise<LockerGroup> {
    const company = await this.companyRepository.findOne({ where: { id: createLockergroupDto.company.id } });
    if (!company) throw new NotFoundException("Company not found!");

    const lockerGroup = this.lockerGroupRepository.create({
      name: createLockergroupDto.name,
      company: createLockergroupDto.company
    });

    return this.lockerGroupRepository.save(lockerGroup);
  }

  async findAll(): Promise<LockerGroup[]> {
    return this.lockerGroupRepository.find({ relations: ['company', 'lockers'] });
  }

  async findByCompany(companyId: number): Promise<LockerGroup[]> {
    return this.lockerGroupRepository.find({
      where: {
        company: { id: companyId }
      },
      relations: ['company', 'lockers']
    });
  }

  async findOne(id: number): Promise<LockerGroup> {
    const lg = await this.lockerGroupRepository.findOne({
      where: { id },
      relations: ['company', 'lockers']
    });
    if (!lg) throw new NotFoundException('Locker group not found');
    return lg;
  }

  update(id: number, updateLockergroupDto: UpdateLockergroupDto) {
    return `This action updates a #${id} lockergroup`;
  }

  async remove(id: number): Promise<void> {
    const lockerGroup = await this.lockerGroupRepository.findOne({
      where: { id },
      relations: ['lockers']
    });

    if (!lockerGroup) {
      throw new NotFoundException('Locker group not found');
    }

    if (lockerGroup.lockers && lockerGroup.lockers.length > 0) {
      const lockerIds = lockerGroup.lockers.map(locker => locker.id);

      const usersWithLockers = await this.userRepository.find({
        where: {
          locker: { id: In(lockerIds) }
        },
        relations: ['locker']
      });

      for (const user of usersWithLockers) {
        user.locker = null;
        await this.userRepository.save(user);
      }

      await this.lockerRepository.remove(lockerGroup.lockers);
    }

    await this.lockerGroupRepository.remove(lockerGroup);
  }
}
