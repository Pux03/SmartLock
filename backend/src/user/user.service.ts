import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, IsNull } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';
import { LockerStatus } from 'src/common/enums/locker_status';
import * as bcrypt from 'bcrypt';
import { combineAll } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Locker) private lockerRepository: Repository<Locker>,

  ) {

  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    const user = this.userRepository.create(createUserDto);
    if (createUserDto.companyId) {
      const company = await this.companyRepository.findOne({ where: { id: createUserDto.companyId } });
      if (!company) throw new NotFoundException(`Company ${createUserDto.companyId} not found`);
      user.company = company;
    }
    if (createUserDto.lockerId) {
      const locker = await this.lockerRepository.findOne({ where: { id: createUserDto.lockerId } });
      user.locker = locker;
    }
    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['company', 'locker']
    })
  }
  findAll() {
    return this.userRepository.find();
  }

  findByCompany(companyId: number) {
    return this.userRepository.find({
      where: {
        company: { id: companyId }
      },
      relations: ['company', 'locker', 'locker.group']
    });
  }

  findUsersWithoutLockers(companyId: number) {
    return this.userRepository.find({
      where: {
        company: { id: companyId },
        locker: IsNull()
      },
      relations: ['company']
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async assignLockerToUser(userId: number, lockerId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const locker = await this.lockerRepository.findOne({ where: { id: lockerId } });

    if (!user || !locker) {
      throw new Error('User or Locker not found');
    }

    user.locker = locker;
    await this.userRepository.save(user);

    locker.status = LockerStatus.OCCUPIED;
    await this.lockerRepository.save(locker);

    return user;
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
