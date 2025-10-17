import { Test, TestingModule } from '@nestjs/testing';
import { LockergroupService } from './lockergroup.service';

describe('LockergroupService', () => {
  let service: LockergroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LockergroupService],
    }).compile();

    service = module.get<LockergroupService>(LockergroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
