import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('company/:companyId')
  findByCompany(@Param('companyId') companyId: string) {
    return this.userService.findByCompany(+companyId);
  }

  @Get('without-lockers/:companyId')
  findUsersWithoutLockers(@Param('companyId') companyId: string) {
    return this.userService.findUsersWithoutLockers(+companyId);
  }

  @Put(':id/assign-locker')
  assignLockerToUser(@Param('id') id: string, @Body() body: { lockerId: number }) {
    return this.userService.assignLockerToUser(+id, body.lockerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
