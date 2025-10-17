import { Module } from '@nestjs/common';
import { LockergroupService } from './lockergroup.service';
import { LockergroupController } from './lockergroup.controller';

@Module({
  controllers: [LockergroupController],
  providers: [LockergroupService],
})
export class LockergroupModule {}
