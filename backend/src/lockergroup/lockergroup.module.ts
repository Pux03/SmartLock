import { Module } from '@nestjs/common';
import { LockergroupService } from './lockergroup.service';
import { LockergroupController } from './lockergroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { LockerGroup } from './entities/lockergroup.entity';
import { Locker } from 'src/locker/entities/locker.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, LockerGroup, Locker, User])],
  controllers: [LockergroupController],
  providers: [LockergroupService],
})
export class LockergroupModule { }
