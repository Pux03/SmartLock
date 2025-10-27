import { Module } from '@nestjs/common';
import { LockerService } from './locker.service';
import { LockerController } from './locker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerGroup } from 'src/lockergroup/entities/lockergroup.entity';
import { Locker } from './entities/locker.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Locker, LockerGroup])],
  controllers: [LockerController],
  providers: [LockerService],
})
export class LockerModule { }
