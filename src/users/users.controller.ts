import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(+id);
  // }

  // @Post()
  // create(@Body() user: Partial<User>): Promise<User> {
  //   return this.usersService.create(user);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User> {
  //   return this.usersService.update(+id, user);
  // }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
