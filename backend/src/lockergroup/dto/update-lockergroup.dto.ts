import { PartialType } from '@nestjs/mapped-types';
import { CreateLockergroupDto } from './create-lockergroup.dto';

export class UpdateLockergroupDto extends PartialType(CreateLockergroupDto) {}
