import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from './entities/applicant.entity';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private applicantsRepository: Repository<Applicant>,
  ) {}

  findAll(): Promise<Applicant[]> {
    return this.applicantsRepository.find({
      relations: ['householdMembers'], // Ensures household members are loaded with applicants
    });
  }

  findOne(id: string): Promise<Applicant> {
    return this.applicantsRepository.findOne({
      where: { id: id },
      relations: ['householdMembers'],
    });
  }

  async create(applicantData: CreateApplicantDto): Promise<Applicant> {
    const newApplicant = this.applicantsRepository.create(applicantData);
    return this.applicantsRepository.save(newApplicant);
  }

  async update(
    id: string,
    updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant> {
    const applicant = await this.applicantsRepository.preload({
      id: id,
      ...updateApplicantDto,
    });
    if (!applicant) {
      throw new NotFoundException(`Applicant #${id} not found`);
    }
    return this.applicantsRepository.save(applicant);
  }

  async remove(id: string): Promise<void> {
    const applicant = await this.findOne(id);
    this.applicantsRepository.remove(applicant);
  }
}
