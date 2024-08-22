import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicantsService } from '../applicants/applicants.service';
import { SchemesService } from '../schemes/schemes.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private readonly applicantsService: ApplicantsService,
    private readonly schemesService: SchemesService,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const applicant = await this.applicantsService.findOne(
      createApplicationDto.applicantId,
    );
    const scheme = await this.schemesService.findOne(
      createApplicationDto.schemeId,
    );

    const application = this.applicationsRepository.create({
      applicant,
      scheme,
      applicationDate: new Date(createApplicationDto.applicationDate),
      status: createApplicationDto.status,
      remarks: createApplicationDto.remarks,
    });

    return this.applicationsRepository.save(application);
  }

  findAll(): Promise<Application[]> {
    return this.applicationsRepository.find({
      relations: ['applicant', 'scheme'],
    });
  }

  findOne(id: string): Promise<Application> {
    return this.applicationsRepository.findOne({
      where: { id },
      relations: ['applicant', 'scheme'],
    });
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    const application = await this.applicationsRepository.preload({
      id: id,
      ...updateApplicationDto,
    });

    if (!application) {
      throw new NotFoundException(`Application #${id} not found`);
    }

    return this.applicationsRepository.save(application);
  }

  async remove(id: string): Promise<void> {
    const application = await this.findOne(id);
    this.applicationsRepository.remove(application);
  }
}
