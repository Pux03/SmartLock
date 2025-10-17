import { Test, TestingModule } from '@nestjs/testing';
import { LockergroupController } from './lockergroup.controller';
import { LockergroupService } from './lockergroup.service';

describe('LockergroupController', () => {
  let controller: LockergroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LockergroupController],
      providers: [LockergroupService],
    }).compile();

    controller = module.get<LockergroupController>(LockergroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
