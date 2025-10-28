import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LockerService } from './locker.service';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto } from './dto/update-locker.dto';

@Controller('locker')
export class LockerController {
  constructor(private readonly lockerService: LockerService) { }

  @Post()
  create(@Body() createLockerDto: CreateLockerDto) {
    return this.lockerService.create(createLockerDto);
  }

  @Post('add-lockers')
  async addMultiple(@Body() lockers: CreateLockerDto[]) {
    const createdLockers = await Promise.all(
      lockers.map(locker => this.lockerService.create(locker))
    );

    return createdLockers;
  }

  @Get()
  findAll() {
    return this.lockerService.findAll();
  }

  @Get('group/:lockerGroupId')
  findByLockerGroup(@Param('lockerGroupId') lockerGroupId: string) {
    return this.lockerService.findByLockerGroup(+lockerGroupId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lockerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLockerDto: UpdateLockerDto) {
    return this.lockerService.update(+id, updateLockerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lockerService.remove(+id);
  }
}
