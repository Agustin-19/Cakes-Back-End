import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cake } from './entities/cake.entity';
import { CreateCakeDto } from './dto/create-cake.dto';

@Injectable()
export class CakesService {
  constructor(
    @InjectRepository(Cake)
    private cakesRepository: Repository<Cake>,
  ) {}

  findAll(): Promise<Cake[]> {
    return this.cakesRepository.find();
  }

  findOne(id: number): Promise<Cake> {
    return this.cakesRepository.findOneBy({ id });
  }

  create(createCakeDto: CreateCakeDto): Promise<Cake> {
    const newCake = this.cakesRepository.create(createCakeDto);
    return this.cakesRepository.save(newCake);
  }

  async update(id: number, cake: Partial<Cake>): Promise<Cake> {
    await this.cakesRepository.update(id, cake);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cakesRepository.delete(id);
  }
}
