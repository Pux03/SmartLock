import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LockerGroup } from './entities/lockergroup.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class LockergroupService {
  constructor(
    @InjectRepository(LockerGroup)
    private lockerGroupRepository: Repository<LockerGroup>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
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

  remove(id: number) {
    return `This action removes a #${id} lockergroup`;
  }
}
