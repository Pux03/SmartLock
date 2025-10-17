import { Injectable } from '@nestjs/common';
import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';

@Injectable()
export class LockergroupService {
  create(createLockergroupDto: CreateLockergroupDto) {
    return 'This action adds a new lockergroup';
  }

  findAll() {
    return `This action returns all lockergroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lockergroup`;
  }

  update(id: number, updateLockergroupDto: UpdateLockergroupDto) {
    return `This action updates a #${id} lockergroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} lockergroup`;
  }
}
