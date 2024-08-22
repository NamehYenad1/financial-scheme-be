import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scheme } from './entities/scheme.entity';
import { CreateSchemeDto } from './dto/create-scheme.dto';
import { UpdateSchemeDto } from './dto/update-scheme.dto';

@Injectable()
export class SchemesService {
  constructor(
    @InjectRepository(Scheme)
    private schemesRepository: Repository<Scheme>,
  ) {}

  findAll(): Promise<Scheme[]> {
    return this.schemesRepository.find();
  }

  findOne(id: string): Promise<Scheme> {
    return this.schemesRepository.findOneBy({ id });
  }

  create(schemeData: CreateSchemeDto): Promise<Scheme> {
    const newScheme = this.schemesRepository.create(schemeData);
    return this.schemesRepository.save(newScheme);
  }

  async update(id: string, updateSchemeDto: UpdateSchemeDto): Promise<Scheme> {
    const scheme = await this.schemesRepository.preload({
      id: id,
      ...updateSchemeDto,
    });

    if (!scheme) {
      throw new NotFoundException(`Scheme with ID ${id} not found`);
    }

    return this.schemesRepository.save(scheme);
  }

  async remove(id: string): Promise<void> {
    const scheme = await this.findOne(id);
    if (!scheme) {
      throw new NotFoundException(`Scheme with ID ${id} not found`);
    }
    await this.schemesRepository.remove(scheme);
  }
}
