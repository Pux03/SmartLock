import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Locker } from 'src/locker/entities/locker.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Locker) private lockerRepository: Repository<Locker>,

  ) {

  }
  async create(createUserDto: CreateUserDto): Promise<User> {
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

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async assignLockerToUser(userId: number, lockerId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const locker = await this.lockerRepository.findOne({ where: { id: lockerId } });

    if (!user || !locker) {
      throw new Error('User or Locker not found');
    }

    locker.user = user;
    await this.lockerRepository.save(locker);

    return locker;
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
