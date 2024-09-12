import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CakesService } from './cakes.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';

@Controller('cakes')
export class CakesController {
  constructor(private readonly cakesService: CakesService) {}

  @Post()
  create(@Body() createCakeDto: CreateCakeDto) {
    return this.cakesService.create(createCakeDto);
  }

  @Get()
  findAll() {
    return this.cakesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cakesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCakeDto: UpdateCakeDto) {
    return this.cakesService.update(+id, updateCakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cakesService.remove(+id);
  }
}
