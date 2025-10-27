import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LockergroupService } from './lockergroup.service';
import { CreateLockergroupDto } from './dto/create-lockergroup.dto';
import { UpdateLockergroupDto } from './dto/update-lockergroup.dto';

@Controller('locker-group')
export class LockergroupController {
  constructor(private readonly lockergroupService: LockergroupService) { }

  @Post()
  create(@Body() createLockergroupDto: CreateLockergroupDto) {
    return this.lockergroupService.create(createLockergroupDto);
  }

  @Get()
  findAll() {
    return this.lockergroupService.findAll();
  }

  @Get('company/:companyId')
  findByCompany(@Param('companyId') companyId: string) {
    return this.lockergroupService.findByCompany(+companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lockergroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLockergroupDto: UpdateLockergroupDto) {
    return this.lockergroupService.update(+id, updateLockergroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lockergroupService.remove(+id);
  }
}
